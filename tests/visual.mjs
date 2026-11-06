import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "@playwright/test";

const mode = process.argv[2] ?? "compare";
assert.ok(["capture", "compare"].includes(mode), "Use capture or compare");
const baseURL = process.env.VISUAL_BASE_URL ?? "http://127.0.0.1:4100";
const directory = process.env.VISUAL_DIRECTORY ?? "work/design-system";
const pages = ["/", "/about", "/all-works", "/work/checkmate",
  "/work/project-c-accenture", "/work/project-m-accenture",
  "/work/barbequeue-google-ux-certificate"];
const baselineDirectory = path.join(directory, "baseline");
const actualDirectory = path.join(directory, "actual");
await mkdir(mode === "capture" ? baselineDirectory : actualDirectory, { recursive: true });
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || undefined,
  args: ["--no-sandbox"],
});
const failures = [];
let views = 0;
try {
  for (const width of [320, 390, 810, 1440]) {
    for (const theme of ["light", "dark"]) {
      const context = await browser.newContext({
        viewport: { width, height: 900 }, colorScheme: theme, reducedMotion: "reduce",
      });
      await context.addInitScript(theme => {
        localStorage.setItem("jernic-theme", theme);
      }, theme);
      const page = await context.newPage();
      const errors = [];
      page.on("pageerror", error => errors.push(String(error)));
      for (const route of pages) {
        const name = `${route === "/" ? "home" : route.slice(1).replaceAll("/", "-")}-${width}-${theme}`;
        const response = await page.goto(baseURL + route, { waitUntil: "networkidle" });
        assert.equal(response.status(), 200, route);
        // Stabilise moving content without altering layout. Images are decoded
        // before capture so lazy loading and image entrances cannot affect a diff.
        await page.addStyleTag({ content: `
          *, *::before, *::after { animation: none !important; transition: none !important; }
          .landing__ticker-track { transform: translateY(0) !important; }
          video { visibility: hidden !important; }
        ` });
        await page.evaluate(async () => {
          await document.fonts.ready;
          const images = [...document.images];
          images.forEach(image => { image.loading = "eager"; });
          await Promise.all(images.map(image => image.decode().catch(() => {})));
          document.querySelectorAll("video").forEach(video => video.pause());
          window.scrollTo(0, 0);
        });
        const data = await page.evaluate(() => ({
          height: document.documentElement.scrollHeight,
          overflow: document.documentElement.scrollWidth > innerWidth,
          elements: [...document.querySelectorAll("h1,h2,h3,h4,p,blockquote,img,video,dt,dd")].map(element => {
            const rect = element.getBoundingClientRect(), style = getComputedStyle(element);
            return {
              tag: element.tagName,
              text: element instanceof HTMLImageElement
                ? new URL(element.getAttribute("src"), location.href).pathname + new URL(element.getAttribute("src"), location.href).search
                : element.textContent.replace(/\s+/g, " ").trim(),
              rect: [rect.x, rect.y + scrollY, rect.width, rect.height].map(n => +n.toFixed(2)),
              font: [style.fontFamily, style.fontSize, style.fontWeight, style.lineHeight,
                style.letterSpacing, style.color, style.fontStyle],
            };
          }),
        }));
        assert.equal(data.overflow, false, `${name}: horizontal overflow`);
        const png = await page.screenshot({ fullPage: true });
        const digest = createHash("sha256").update(png).digest("hex");
        const record = { ...data, digest };
        if (mode === "capture") {
          await writeFile(path.join(baselineDirectory, name + ".json"), JSON.stringify(record));
          await writeFile(path.join(baselineDirectory, name + ".png"), png);
        } else {
          const expected = JSON.parse(await readFile(path.join(baselineDirectory, name + ".json")));
          const changes = [];
          if (record.height !== expected.height) changes.push({ height: [expected.height, record.height] });
          if (record.elements.length !== expected.elements.length) {
            changes.push({ elementCount: [expected.elements.length, record.elements.length] });
          } else {
            record.elements.forEach((element, i) => {
              if (JSON.stringify(element) !== JSON.stringify(expected.elements[i])) {
                changes.push({ index: i, expected: expected.elements[i], actual: element });
              }
            });
          }
          if (record.digest !== expected.digest) changes.push({ screenshot: "pixels changed" });
          if (changes.length) {
            failures.push({ view: name, changes });
            await writeFile(path.join(actualDirectory, name + ".png"), png);
          }
        }
        views++;
      }
      assert.deepEqual(errors, [], "Browser runtime errors");
      await context.close();
    }
  }
} finally {
  await browser.close();
}
await writeFile(path.join(directory, "visual-report.json"), JSON.stringify({ mode, views, failures }, null, 2));
console.log(JSON.stringify({ mode, views, failedViews: failures.length,
  firstDifferences: failures.slice(0, 3) }, null, 2));
if (failures.length) process.exitCode = 1;
