#!/usr/bin/env node
import autoprefixer from "autoprefixer";
import { mkdirSync as makeDir } from "fs";
import { writeFile } from "fs/promises";
import { globby } from "globby";
import path from "path";
import postcss from "postcss";
import * as sass from "sass";
import { fileURLToPath, pathToFileURL } from "url";

// https://blog.logrocket.com/alternatives-dirname-node-js-es-modules/
const __dirname = fileURLToPath(new URL(".", import.meta.url));

const production = process.env?.NODE_ENV === "production";

const contentRe = /<%\s*content\s*%>/;

// Eslint will generate a warning without the whitespace
const TEMPLATE = `import { css } from 'lit';

export const styles = css\`<% content %>\`;

`;

async function convertToCss(sassFile) {
    const result = sass.compile(sassFile, {
        importers: [
            {
                findFileUrl(url) {
                    if (!url.startsWith("@")) {
                        return null;
                    }
                    if (url.startsWith("@goauthentik")) {
                        return new URL(url.substring("@goauthentik".length), pathToFileUrl("src/"));
                    }
                    return new URL(url.substring(1), pathToFileURL("node_modules/"));
                },
            },
        ],
    });

    let cssStr = result.css.toString();
    cssStr = postcss([autoprefixer]).process(cssStr).css;
    return cssStr;
}

async function processSourceFile(sourceFile) {
    const outputFile = sourceFile.replace(/\.scss$/, ".css.ts");
    const replacement = await convertToCss(sourceFile);
    writeFile(outputFile, (" " + TEMPLATE).slice(1).replace(contentRe, replacement), "utf-8");
    console.log(`Generated scss for ${sourceFile}`);
}

(async () => {
    const paths = await globby(["./src/**/*.scss"]);
    for (const sourceFile of paths) {
        await processSourceFile(sourceFile);
    }
})();
