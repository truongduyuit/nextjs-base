// server.ts

import express, { Request, Response } from "express";
import next from "next";
import helmet from "helmet";
import morgan from "morgan";
const { parse } = require("url");

import { injectRequestId, useMorgan } from "./middlewares";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 4444;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // apply middlewares
  server.use(
    helmet({
      contentSecurityPolicy: false,
    })
  );
  server.use(useMorgan(morgan));
  server.use(injectRequestId);

  server.use(express.json());
  server.use(express.urlencoded({ extended: false }));

  // custom endpoint
  server.get("/api/hello", (_: Request, res: Response) => {
    return res.status(200).json({ message: "Hello from server!" });
  });

  // default next.js handler
  server.all("*", (req: Request, res: Response) => {
    const parsedUrl = parse(req.url, true);
    return handle(req, res, parsedUrl);
  });

  server.listen(port, (err?: Error) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
