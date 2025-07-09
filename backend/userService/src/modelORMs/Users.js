const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require("../ORM/orm");

class Users extends Model { }

Users.init({
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    nickName: {
        type: DataTypes.STRING(30)
    },
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
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    rankPoint: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    winGames: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    lostGames: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }

}, {
    sequelize,
    modelName: 'Users',
    tableName: 'Users',
    timestamps: false
});

module.exports = Users;
