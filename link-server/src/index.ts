import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import passport from "passport";
import { router as authRouter } from "./routes/auth";
import { router as roomRouter } from "./routes/room";
import { router as messagerRouter } from "./routes/message";
import session from "express-session";
import { initializeSequelize } from "./services/db";
import { Dialect } from "sequelize";
import crypto from "crypto";
import { Strategy as LocalStrategy } from "passport-local";
import { User, UserNotFoundError, UserIncorrectPasswordError } from "./models/user";
import cors from "cors";

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server);

// cors
app.use(cors());

// express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// express-session
app.use(session({ secret: "secret", resave: false, saveUninitialized: false }));

// passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy((usermame, password, done) => {
    User.findOne({ where: { username: usermame } }).then(
      (user) => {
        if (!user) return done(new UserNotFoundError(usermame), false);
        const passwordHash = crypto.pbkdf2Sync(password, user.passwordSalt, 310000, 32, "sha256").toString("hex");
        if (passwordHash === user.passwordHash) return done(null, user);
        else return done(new UserIncorrectPasswordError(usermame), false);
      },
      (err) => {
        done(err);
      }
    );
  })
);

passport.serializeUser((user: any, done) => {
  done(null, user);
});

passport.deserializeUser((user: any, done) => {
  done(null, user);
});

// routes
app.use("/auth", authRouter);
app.use("/room", roomRouter);
app.use("/message", messagerRouter);

initializeSequelize((process.env.DIALECT as Dialect) || "sqlite", process.env.STORAGE || ":memory:").then(() => {
  const host = process.env.HOST;
  const port = process.env.PORT || "3000";

  server.listen(parseInt(port), host, () => {
    console.log(`Server listening on ${host}:${port}`);
  });
});
