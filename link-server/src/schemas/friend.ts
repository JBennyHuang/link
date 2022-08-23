import { JSONSchemaType } from "ajv";

interface FriendAddBody {
  user1: string;
  user2: string;
}

const FriendAddBodySchema: JSONSchemaType<FriendAddBody> = {
  type: "object",
  required: ["user1", "user2"],
  properties: {
    user1: { type: "string" },
    user2: { type: "string" },
  },
};

export { FriendAddBodySchema };
