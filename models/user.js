module.exports = function(sequelize, DataTypes) {
    const User =  sequelize.define('user', {
        full_name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        username: {
            type: DataTypes.STRING,
            allowNull: false
        },

        passwordHash: {
            type: DataTypes.STRING,
            allowNull: false
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        }
    })

    User.prototype.toResponse = function() {
        const user = Object.assign({}, this.dataValues);
        delete user.passwordHash;
        return user
    }

    return User
}