import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import ts from "typescript";

const root = fileURLToPath(new URL("../", import.meta.url));
const cache = new Map();

async function moduleURL(filename) {
	if (cache.has(filename)) return cache.get(filename);
	const pending = (async () => {
		const source = await readFile(filename, "utf8");
		const { outputText } = ts.transpileModule(source, {
			fileName: filename,
			compilerOptions: {
				jsx: ts.JsxEmit.ReactJSX,
				module: ts.ModuleKind.ESNext,
				target: ts.ScriptTarget.ES2022,
			},
		});
		const imports = [...outputText.matchAll(/from (["'])([^"']+)\1/g)];
		const resolved = new Map();
		for (const [, , specifier] of imports) {
			if (specifier.startsWith(".")) {
				const base = path.resolve(path.dirname(filename), specifier);
				let dependency;
				for (const extension of [".ts", ".tsx", ".mjs"]) {
					try {
						await readFile(base + extension);
						dependency = base + extension;
						break;
					} catch {}
				}
				if (!dependency) throw new Error("Cannot resolve " + specifier + " in " + filename);
				resolved.set(specifier, await moduleURL(dependency));
			} else resolved.set(specifier, import.meta.resolve(specifier));
		}
		const code = outputText.replace(
			/from (["'])([^"']+)\1/g,
			(_, quote, specifier) => "from " + JSON.stringify(resolved.get(specifier)),
		);
		return "data:text/javascript;base64," + Buffer.from(code).toString("base64");
	})();
	cache.set(filename, pending);
	return pending;
}

/** Render real TSX in Node without adding a separate React test framework. */
export async function loadComponent(relativePath) {
	return import(await moduleURL(path.join(root, relativePath)));
}
