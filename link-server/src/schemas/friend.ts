import { JSONSchemaType } from "ajv";

interface FriendAddBody {
  name: string;
}

const FriendAddBodySchema: JSONSchemaType<FriendAddBody> = {
  type: "object",
  required: ["name"],
  properties: {
    name: { type: "string" },
  },
};

export { FriendAddBodySchema };
