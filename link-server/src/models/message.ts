import { Sequelize, Model, DataTypes, CreationOptional } from "sequelize";

class Message extends Model {
  declare id: CreationOptional<number>;
  declare roomId: string;
  declare userId: string;
  declare content: string;
  declare timestamp: number;
}

const initializeMessageModel = (sequelize: Sequelize) => {
  return Message.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userRoomId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      timestamp: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { sequelize }
  );
};

export { initializeMessageModel, Message };
