import {
  Sequelize,
  Model,
  DataTypes,
  BelongsToManyAddAssociationMixin,
  BelongsToManyRemoveAssociationMixin,
  CreationOptional,
} from "sequelize";
import { User } from "./user";
import { Message } from "./message";

class Friend extends Model {
  declare id: CreationOptional<number>;
  declare uuid: string;
  declare name: string;

  declare Users: User[];
  declare addUser: BelongsToManyAddAssociationMixin<User, number>;
  declare removeUser: BelongsToManyRemoveAssociationMixin<User, number>;

  declare Messages: Message[];
  declare addMessage: BelongsToManyAddAssociationMixin<Message, number>;
}

const initializeFriendModel = (sequelize: Sequelize) => {
  return Friend.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      uuid: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    { sequelize }
  );
};

export { initializeFriendModel, Friend };
