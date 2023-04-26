import { NextFunction, Request, Response } from "express";
import { v1 as uuidv1 } from "uuid";

export const injectRequestId = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.headers["reqId"] = uuidv1();
  next();
};

export const useMorgan = (morgan: any) => {
  morgan.token("reqId", (req: Request) => `${req.headers["reqId"]}: `);
  return morgan(
    ":reqId :method :url :status :res[content-length] - :response-time ms"
  );
};
