import { JSONSchemaType } from "ajv";

interface MessageSendBody {
  roomUUID: string;
  content: string;
}

const MessageSendBodySchema: JSONSchemaType<MessageSendBody> = {
  type: "object",
  required: ["roomUUID", "content"],
  properties: {
    roomUUID: { type: "string" },
    content: { type: "string" },
  },
};

export { MessageSendBodySchema };
