const { readFileSync } = require("fs");
const { createServer } = require("http");
const { renderToString } = require("react-dom/server");
const { default: Home } = require("./HomeServer");
const React = require("react");

const server = createServer((req, res) => {
  if (req.url === "/") {
    return homeRoute(req, res);
  }
  if (req.url === "/client.js") {
    return clientRoute(req, res);
  }
  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("Not Found");
});

function homeRoute(req, res) {
  const htmlFile = readFileSync(__dirname + "/index.html", "utf-8");

  res.writeHead(200, { "Content-Type": "text/html" });
  const renderdReact = renderToString(<Home />);
  const finalHtml = htmlFile.replace("<!-- APP -->", renderdReact);
  res.end(finalHtml);
}
function clientRoute(req, res) {
  const clientJs = readFileSync(__dirname + "/client.js", "utf-8");
  res.writeHead(200, { "Content-Type": "text/javascript" });
  res.end(clientJs);
}

server.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
// This is a simple server that listens on port 3000 and responds with "hello world" to every request.
