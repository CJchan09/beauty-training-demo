import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const landingDir = dirname(fileURLToPath(import.meta.url));
const sourceDir = resolve(landingDir, "../web-prototype/dist/client");
const targetDir = resolve(landingDir, "demo");

if (!existsSync(sourceDir)) {
  throw new Error("Missing web-prototype/dist/client. Run npm run build first.");
}

if (existsSync(targetDir)) {
  throw new Error("landing-page/demo already exists. Review it before replacing the published copy.");
}

function copyTree(source, target) {
  mkdirSync(target, { recursive: true });

  for (const entry of readdirSync(source, { withFileTypes: true })) {
    const sourcePath = resolve(source, entry.name);
    const targetPath = resolve(target, entry.name);

    if (entry.isDirectory()) {
      copyTree(sourcePath, targetPath);
      continue;
    }

    copyFileSync(sourcePath, targetPath);
  }
}

copyTree(sourceDir, targetDir);

const indexPath = resolve(targetDir, "index.html");
const indexHtml = readFileSync(indexPath, "utf8")
  .replaceAll('href="/beauty-training-mark.svg"', 'href="./beauty-training-mark.svg"')
  .replaceAll('src="/assets/', 'src="./assets/')
  .replaceAll('href="/assets/', 'href="./assets/');
writeFileSync(indexPath, indexHtml, "utf8");

const assetsDir = resolve(targetDir, "assets");
for (const fileName of readdirSync(assetsDir)) {
  const filePath = resolve(assetsDir, fileName);

  if (fileName.endsWith(".js")) {
    const source = readFileSync(filePath, "utf8").replace(
      /(["'`])\/(assets|app-assets)\//g,
      "$1./$2/",
    );
    writeFileSync(filePath, source, "utf8");
  }

  if (fileName.endsWith(".css")) {
    const source = readFileSync(filePath, "utf8").replace(
      /url\((["']?)\/assets\//g,
      "url($1./",
    );
    writeFileSync(filePath, source, "utf8");
  }
}

console.log("Prepared landing-page/demo for GitHub Pages.");
