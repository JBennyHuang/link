import { Router, Request, Response } from "express";
import { isAuthenticated } from "../middlewares/auth";
import { FriendAddBodySchema } from "../schemas/friend";
import { User } from "../models/user";
import { isValidBody } from "../middlewares/validation";
import { v4 as uuidv4 } from "uuid";
import { Friend } from "../models/friend";

const router = Router();

router.post("/add", isValidBody(FriendAddBodySchema), isAuthenticated, async (req: Request, res: Response) => {
  if (!req.user) return res.redirect("../auth/login");
  const user = await User.findOne({ where: { username: (req.user as User).username } });
  const friend = await User.findOne({ where: { username: req.body.name } });
  if (!user) return res.status(404).send({ error: "UserNotFound" });
  if (!friend) return res.status(404).send({ error: "UserNotFound" });
  const friendRoom = await Friend.create({ uuid: uuidv4(), name: req.body.name });
  if (user.Friends.includes(friendRoom)) return res.status(404).send({ error: "UserAlreadyFriend" });
  await friendRoom.addUser(user);
  await friendRoom.addUser(friend);
  await user.addFriend(friendRoom);
  return res.status(200).json();
});

export { router };
