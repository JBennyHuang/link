import { JSONSchemaType } from "ajv";

interface RoomJoinBody {
  roomUUID: string;
}

interface RoomLeaveBody {
  roomUUID: string;
}

const RoomJoinBodySchema: JSONSchemaType<RoomJoinBody> = {
  type: "object",
  required: ["roomUUID"],
  properties: {
    roomUUID: { type: "string" },
  },
};

const RoomLeaveBodySchema: JSONSchemaType<RoomLeaveBody> = {
  type: "object",
  required: ["roomUUID"],
  properties: {
    roomUUID: { type: "string" },
  },
};

export { RoomJoinBodySchema, RoomLeaveBodySchema };
