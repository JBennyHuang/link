import { JSONSchemaType } from "ajv";

interface RoomJoinBody {
  uuid: string;
}

interface RoomLeaveBody {
  uuid: string;
}

interface RoomCreateBody {
  name: string;
}

const RoomCreateBodySchema: JSONSchemaType<RoomCreateBody> = {
  type: "object",
  required: ["name"],
  properties: {
    name: { type: "string" },
  },
};

const RoomJoinBodySchema: JSONSchemaType<RoomJoinBody> = {
  type: "object",
  required: ["uuid"],
  properties: {
    uuid: { type: "string" },
  },
};

const RoomLeaveBodySchema: JSONSchemaType<RoomLeaveBody> = {
  type: "object",
  required: ["uuid"],
  properties: {
    uuid: { type: "string" },
  },
};

export { RoomJoinBodySchema, RoomLeaveBodySchema, RoomCreateBodySchema };
