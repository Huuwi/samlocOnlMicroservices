
const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require("../ORM/orm")


class Users extends Model {

}

Users.init({
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        unique: true
    },
    password: DataTypes.STRING,
    nickName: DataTypes.STRING,
    balance: {
        type: DataTypes.INTEGER,
        defaultValue: 200
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    customItemsId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'CUSTOMITEMS',
            key: 'customItemsId'
        }
    }


}, {
    sequelize: sequelize,
    modelName: 'Users',
    tableName: 'Users',
    timestamps: false
})

module.exports = Users