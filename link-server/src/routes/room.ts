import { Router, Request, Response } from "express";
import { isAuthenticated } from "../middlewares/auth";
import { RoomJoinBodySchema, RoomLeaveBodySchema } from "../schemas/room";
import { User, UserNotFoundError } from "../models/user";
import { Room, RoomNotFoundError } from "../models/room";
import { isValid } from "../middlewares/validation";
import { v4 as uuidv4 } from "uuid";

const router = Router();

router.post("/create", isAuthenticated, async (res: Response) => {
  Room.create({ roomUUID: uuidv4() }).then(
    (room) => res.status(201).json(room),
    (err) => res.status(500).send({ error: err })
  );
});

router.post("/join", isValid(RoomJoinBodySchema), isAuthenticated, async (req: Request, res: Response) => {
  if (!req.user) return res.redirect("../auth/login");
  else {
    const room = await Room.findOne({ where: { roomUUID: req.body.roomUUID } });
    const user = await User.findOne({ where: { username: (req.user as any).username } });
    if (!room) return res.status(404).send({ error: new RoomNotFoundError(req.body.roomUUID) });
    if (!user) return res.status(404).send({ error: new UserNotFoundError((req.user as any).username) });
    await room.addUser(user);
    res.status(200).send();
  }
});

router.post("/leave", isValid(RoomLeaveBodySchema), isAuthenticated, async (req: Request, res: Response) => {
  if (!req.user) return res.redirect("../auth/login");
  else {
    const room = await Room.findOne({ where: { roomUUID: req.body.roomUUID } });
    const user = await User.findOne({ where: { username: (req.user as any).username } });
    if (!room) return res.status(404).send({ error: new RoomNotFoundError(req.body.roomUUID) });
    if (!user) return res.status(404).send({ error: new UserNotFoundError((req.user as any).username) });
    await room.removeUser(user);
    res.status(200).send();
  }
});

export { router };
