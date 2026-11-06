import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { createProcessor } from "@mdx-js/mdx";

async function files(directory) {
	const entries = await readdir(directory, { withFileTypes: true });
	return (
		await Promise.all(
			entries.map((entry) =>
				entry.isDirectory()
					? files(path.join(directory, entry.name))
					: [path.join(directory, entry.name)],
			),
		)
	).flat();
}

test("styles use declared tokens and no story-specific layout selectors", async () => {
	const styles = await Promise.all(
		(await files("src/styles")).filter((p) => p.endsWith(".css")).map((p) => readFile(p, "utf8")),
	);
	const css = styles.join("\n");
	const declared = new Set([...css.matchAll(/(--[\w-]+)\s*:/g)].map((m) => m[1]));
	const references = new Set([...css.matchAll(/var\((--[\w-]+)/g)].map((m) => m[1]));
	assert.deepEqual(
		[...references].filter((name) => !declared.has(name)),
		[],
	);
	assert.doesNotMatch(
		css,
		/\.(?:editorial-section|editorial-quote|research-evidence|research-visuals|case-serif|solution__)/,
	);
});

test("published MDX uses explicit image descriptions and shared section boundaries", async () => {
	for (const file of (await files("src/content/work")).filter((p) => p.endsWith(".mdx"))) {
		const source = await readFile(file, "utf8");
		const tree = createProcessor().parse(source);
		function visit(node) {
			if (node.name === "Figure") {
				const attrs = Object.fromEntries(node.attributes.map((a) => [a.name, a.value]));
				assert.ok(
					attrs.alt || "decorative" in attrs || "placeholder" in attrs,
					file + ": image meaning must be explicit",
				);
			}
			if (node.name === "section")
				assert.fail(file + ": use Section to retain the section contract");
			node.children?.forEach(visit);
		}
		visit(tree);
		assert.doesNotMatch(
			source,
			/className="[^"]*(?:editorial-section|research-evidence|research-visuals|solution__)/,
		);
	}
});
