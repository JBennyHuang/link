import {
  Sequelize,
  Model,
  DataTypes,
  BelongsToManyAddAssociationMixin,
  BelongsToManyRemoveAssociationMixin,
  CreationOptional,
} from "sequelize";
import { User } from "./user";

class RoomAlreadyExistsError extends Error {
  constructor(roomname: string) {
    super();
    this.name = "RoomAlreadyExistsError";
    this.message = `Room with name ${roomname} already exists`;
  }
}

class RoomNotFoundError extends Error {
  constructor(roomname: string) {
    super();
    this.name = "RoomNotFoundError";
    this.message = `Room ${roomname} not found`;
  }
}

class Room extends Model {
  declare id: CreationOptional<number>;
  declare roomUUID: string;
  declare addUser: BelongsToManyAddAssociationMixin<User, number>;
  declare removeUser: BelongsToManyRemoveAssociationMixin<User, number>;
}

const initializeRoomModel = (sequelize: Sequelize) => {
  return Room.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      roomUUID: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    { sequelize }
  );
};

export { initializeRoomModel, Room, RoomAlreadyExistsError, RoomNotFoundError };
