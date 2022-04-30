import { Sequelize, Model, DataTypes, CreationOptional } from "sequelize";

class UserAlreadyExistsError extends Error {
  constructor(username: string) {
    super();
    this.name = "UserAlreadyExistsError";
    this.message = `User with name ${username} already exists`;
  }
}

class UserNotFoundError extends Error {
  constructor(username: string) {
    super();
    this.name = "UserNotFoundError";
    this.message = `User ${username} not found`;
  }
}

class UserIncorrectPasswordError extends Error {
  constructor(username: string) {
    super();
    this.name = "UserIncorrectPasswordError";
    this.message = `User ${username} incorrect password`;
  }
}

class User extends Model {
  declare id: CreationOptional<number>;
  declare username: string;
  declare passwordSalt: string;
  declare passwordHash: string;
}

const initializeUserModel = (sequelize: Sequelize) => {
  return User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      passwordSalt: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      passwordHash: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { sequelize }
  );
};

export { initializeUserModel, User, UserAlreadyExistsError, UserNotFoundError, UserIncorrectPasswordError };
