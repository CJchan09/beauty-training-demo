import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { dirname, extname, join, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(root, "..");
const port = Number(process.env.PORT || 4190);
const apkFileName = "Beauty_Training_Demo_2.6.0_Test.apk";
const apkPath = join(projectRoot, apkFileName);

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

function serveFile(request, response, filePath, contentType, downloadName) {
  if (!existsSync(filePath)) {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }

  const size = statSync(filePath).size;
  const range = request.headers.range;
  const headers = {
    "Accept-Ranges": "bytes",
    "Cache-Control": downloadName ? "no-store" : "no-cache",
    "Content-Type": contentType,
  };

  if (downloadName) {
    headers["Content-Disposition"] = `attachment; filename="${downloadName}"`;
  }

  if (range) {
    const match = /^bytes=(\d+)-(\d*)$/.exec(range);
    if (!match) {
      response.writeHead(416, { "Content-Range": `bytes */${size}` });
      response.end();
      return;
    }

    const start = Number(match[1]);
    const end = match[2] ? Math.min(Number(match[2]), size - 1) : size - 1;
    if (start > end || start >= size) {
      response.writeHead(416, { "Content-Range": `bytes */${size}` });
      response.end();
      return;
    }

    response.writeHead(206, {
      ...headers,
      "Content-Length": end - start + 1,
      "Content-Range": `bytes ${start}-${end}/${size}`,
    });
    if (request.method === "HEAD") response.end();
    else createReadStream(filePath, { start, end }).pipe(response);
    return;
  }

  response.writeHead(200, { ...headers, "Content-Length": size });
  if (request.method === "HEAD") response.end();
  else createReadStream(filePath).pipe(response);
}

const server = createServer((request, response) => {
  if (!request.url || !["GET", "HEAD"].includes(request.method || "")) {
    response.writeHead(405, { Allow: "GET, HEAD" });
    response.end();
    return;
  }

  const url = new URL(request.url, `http://${request.headers.host || "127.0.0.1"}`);
  if (url.pathname === `/downloads/${apkFileName}`) {
    serveFile(request, response, apkPath, "application/vnd.android.package-archive", apkFileName);
    return;
  }

  const routePath = url.pathname === "/" ? "/index.html" : url.pathname === "/social-card" ? "/social-card.html" : url.pathname;
  const decodedPath = decodeURIComponent(routePath);
  let filePath = normalize(join(root, decodedPath));
  if (!filePath.startsWith(root)) {
    response.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Forbidden");
    return;
  }

  if (existsSync(filePath) && statSync(filePath).isDirectory()) {
    filePath = join(filePath, "index.html");
  }

  serveFile(request, response, filePath, mimeTypes[extname(filePath).toLowerCase()] || "application/octet-stream");
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Beauty Training Demo landing page: http://127.0.0.1:${port}/`);
});
