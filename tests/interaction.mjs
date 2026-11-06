import assert from "node:assert/strict";
import { chromium } from "@playwright/test";

const baseURL = process.env.VISUAL_BASE_URL ?? "http://127.0.0.1:4100";
const browser = await chromium.launch({
	executablePath: process.env.CHROMIUM_PATH || undefined,
	args: ["--no-sandbox"],
});
const checks = [];
try {
	const reduced = await browser.newContext({
		viewport: { width: 1440, height: 900 },
		reducedMotion: "reduce",
		colorScheme: "dark",
	});
	const page = await reduced.newPage();
	const errors = [];
	page.on("pageerror", (error) => errors.push(String(error)));
	await page.goto(baseURL, { waitUntil: "networkidle" });
	await page.evaluate(() => document.fonts.ready);
	assert.equal(await page.locator("html").getAttribute("data-theme"), "dark");
	const toggle = page.getByRole("switch", { name: "Dark mode" });
	assert.equal(await toggle.getAttribute("aria-checked"), "true");
	await toggle.click();
	assert.equal(await page.locator("html").getAttribute("data-theme"), "light");
	await page.reload({ waitUntil: "networkidle" });
	assert.equal(await page.locator("html").getAttribute("data-theme"), "light");
	assert.equal(await page.evaluate(() => localStorage.getItem("jernic-theme")), "light");
	checks.push("system theme, toggle and persisted preference");

	await page.keyboard.press("Tab");
	assert.equal(
		await page.evaluate(() => document.activeElement.textContent.trim()),
		"Skip to content",
	);
	assert.ok((await page.locator(".skip-link").boundingBox()).y >= 0);
	await toggle.focus();
	await page.keyboard.press("Space");
	assert.equal(await toggle.getAttribute("aria-checked"), "true");
	const outline = await toggle.evaluate((element) => getComputedStyle(element).outlineStyle);
	assert.equal(outline, "solid");
	checks.push("keyboard focus and theme control");

	const ticker = page.locator(".landing__ticker-track");
	const initial = await ticker.getAttribute("style");
	await page.waitForTimeout(2700);
	assert.equal(await ticker.getAttribute("style"), initial);
	assert.equal(
		await ticker.evaluate((element) => getComputedStyle(element).transitionDuration),
		"0s",
	);
	assert.equal(await page.locator("html").getAttribute("data-scroll-orientation"), null);
	checks.push("reduced-motion ticker and native scroll fallback");

	await page.goto(baseURL + "/all-works", { waitUntil: "networkidle" });
	assert.equal(await page.locator(".work-row").count(), 4);
	await page.locator(".work-row").first().click();
	await page.waitForURL("**/work/project-c-accenture");
	const ids = await page.locator("[id]").evaluateAll((elements) => elements.map((e) => e.id));
	assert.equal(new Set(ids).size, ids.length);
	await page.getByRole("button", { name: "Go back to the previous page" }).click();
	await page.waitForURL("**/all-works");
	checks.push("work navigation, back control and unique IDs");
	assert.deepEqual(errors, []);
	await reduced.close();

	const animated = await browser.newContext({
		viewport: { width: 1440, height: 900 },
		reducedMotion: "no-preference",
	});
	const moving = await animated.newPage();
	await moving.goto(baseURL, { waitUntil: "networkidle" });
	const track = moving.locator(".landing__ticker-track");
	const transform = await track.evaluate((element) => getComputedStyle(element).transform);
	await moving.waitForFunction((previous) => {
		const track = document.querySelector(".landing__ticker-track");
		return getComputedStyle(track).transform !== previous;
	}, transform);
	const link = moving.locator(".arrow-link--down");
	await link.hover();
	await moving.waitForFunction(() => {
		const arrow = document.querySelector(".arrow-link--down .arrow-link__arrow");
		return getComputedStyle(arrow).transform !== "none";
	});
	await moving.waitForFunction(() => {
		const image = document.querySelector(".hero__media img");
		return image.complete && image.naturalWidth > 0 && getComputedStyle(image).opacity === "1";
	});
	checks.push("normal-motion ticker, arrow feedback and image reveal");
	await animated.close();
} finally {
	await browser.close();
}
console.log(JSON.stringify({ passed: checks.length, checks }, null, 2));
