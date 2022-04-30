import { Router, Request, Response } from "express";
import passport from "passport";
import crypto from "crypto";
import { User, UserAlreadyExistsError } from "../models/user";
import { LoginBodySchema, RegisterBodySchema } from "../schemas/auth";
import { isValid } from "../middlewares/validation";

const router = Router();

router.post("/login", isValid(LoginBodySchema), passport.authenticate("local"), async (req: Request, res: Response) => {
  return res.status(200).json(req.user);
});

router.post("/register", isValid(RegisterBodySchema), async (req: Request, res: Response) => {
  const username = req.body.username;
  const passwordSalt = crypto.randomBytes(16).toString("hex");
  const passwordHash = crypto.pbkdf2Sync(req.body.password, passwordSalt, 310000, 32, "sha256").toString("hex");
  User.create({ username, passwordSalt, passwordHash }).then(
    (user) => res.status(201).json(user),
    (err) => {
      if (err.name === "SequelizeUniqueConstraintError")
        return res.status(409).send({ error: new UserAlreadyExistsError(username) });
      else return res.status(500).send({ error: err });
    }
  );
});

router.post("/logout", async (req: Request, res: Response) => {
  req.logout();
  return res.status(200).send();
});

export { router };
