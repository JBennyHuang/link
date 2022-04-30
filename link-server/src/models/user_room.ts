import { Sequelize, Model, DataTypes, HasManyAddAssociationMixin, CreationOptional } from "sequelize";
import { Message } from "./message";

class UserRoomNotFoundError extends Error {
  constructor(userId: number, roomId: number) {
    super();
    this.name = "UserRoomNotFoundError";
    this.message = `UserRoom with userId ${userId} and roomId ${roomId} not found`;
  }
}

class UserRoom extends Model {
  declare id: CreationOptional<number>;
  declare userId: number;
  declare roomId: number;
  declare addMessage: HasManyAddAssociationMixin<Message, number>;
}

const initializeUserRoomModel = (sequelize: Sequelize) => {
  return UserRoom.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      roomId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { sequelize }
  );
};

export { initializeUserRoomModel, UserRoom, UserRoomNotFoundError };
