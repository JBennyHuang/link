import { Request, Response, NextFunction } from "express";

import Ajv, { JSONSchemaType } from "ajv";

const ajv = new Ajv();

export const isValid = <T>(schema: JSONSchemaType<T>) => {
  const validator = ajv.compile(schema);
  return (req: Request, res: Response, next: NextFunction) => {
    if (!validator(req.body)) return res.status(400).json({ error: validator.errors });
    return next();
  };
};
