import { Router, Request, Response } from "express";
import { isValid } from "../middlewares/validation";
import { MessageSendBodySchema } from "../schemas/message";
import { UserRoom, UserRoomNotFoundError } from "../models/user_room";
import { User, UserNotFoundError } from "../models/user";
import { Room, RoomNotFoundError } from "../models/room";
import { Message } from "../models/message";
import { isAuthenticated } from "../middlewares/auth";

const router = Router();

router.post("/send", isValid(MessageSendBodySchema), isAuthenticated, async (req: Request, res: Response) => {
  if (!req.user) return res.redirect("../auth/login");
  else {
    const room = await Room.findOne({ where: { roomUUID: req.body.roomUUID } });
    const user = await User.findOne({ where: { username: (req.user as any).username } });
    if (!room) return res.status(404).send({ error: new RoomNotFoundError(req.body.roomUUID) });
    if (!user) return res.status(404).send({ error: new UserNotFoundError((req.user as any).username) });
    const userRoom = await UserRoom.findOne({ where: { userId: user.id, roomId: room.id } });
    if (!userRoom) return res.status(404).send({ error: new UserRoomNotFoundError(user.id, room.id) });
    else {
      const message = await Message.create({
        userRoomId: userRoom.id,
        content: req.body.content,
        timestamp: Date.now(),
      });
      userRoom.addMessage(message);
      res.status(201).json(message);
    }
  }
});

export { router };
