module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
  });

  User.prototype.toResponse = function () {
    const user = { ...this.dataValues };
    delete user.passwordHash;
    return user;
  };

  return User;
};
