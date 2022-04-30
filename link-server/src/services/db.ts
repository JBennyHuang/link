import { Sequelize, Dialect } from "sequelize";
import { initializeUserModel } from "../models/user";
import { initializeRoomModel } from "../models/room";
import { initializeUserRoomModel } from "../models/user_room";
import { initializeMessageModel } from "../models/message";

let sequelize: Sequelize;

const initializeSequelize = async (dialect: Dialect, storage: string): Promise<Sequelize> => {
  sequelize = new Sequelize("database", "", "", {
    dialect: dialect,
    storage: storage,
  });

  const user = initializeUserModel(sequelize);
  const room = initializeRoomModel(sequelize);
  const userRoom = initializeUserRoomModel(sequelize);
  const message = initializeMessageModel(sequelize);

  user.belongsToMany(room, { through: userRoom, foreignKey: "userId" });
  room.belongsToMany(user, { through: userRoom, foreignKey: "roomId" });
  userRoom.hasMany(message, { foreignKey: "userRoomId" });
  message.belongsTo(userRoom, { foreignKey: "userRoomId" });

  return await sequelize.sync();
};

const getSequelize = (): Sequelize => {
  return sequelize;
};

export { initializeSequelize, getSequelize };
