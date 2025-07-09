const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require("../ORM/orm");

class CustomItems extends Model { }

CustomItems.init({
    customItemsId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Bottom: {
        type: DataTypes.STRING(50)
    },
    Bow: {
        type: DataTypes.STRING(50)
    },
    Earring: {
        type: DataTypes.STRING(50)
    },
    EyeBrow: {
        type: DataTypes.STRING(50)
    },
    Eyes: {
        type: DataTypes.STRING(50),
        defaultValue: "Eyes.005.glb"
    },
    Face: {
        type: DataTypes.STRING(50),
        defaultValue: "Face.002.glb"
    },
    FaceMask: {
        type: DataTypes.STRING(50)
    },
    FacialHair: {
        type: DataTypes.STRING(50)
    },
    Glasses: {
        type: DataTypes.STRING(50),
        defaultValue: "Glasses.001.glb"
    },
    Hair: {
        type: DataTypes.STRING(50),
        defaultValue: "Hair.004.glb"
    },
    Hat: {
        type: DataTypes.STRING(50),
        defaultValue: "Hat.003.glb"
    },
    Head: {
        type: DataTypes.STRING(50),
        defaultValue: "Head.001.glb"
    },
    Nose: {
        type: DataTypes.STRING(50),
        defaultValue: "Nose.002.glb"
    },
    Outfit: {
        type: DataTypes.STRING(50),
        defaultValue: "Outfit.002.glb"
    },
    Shoes: {
        type: DataTypes.STRING(50),
        defaultValue: "Shoes.002.glb"
    },
    TOPITEM: {
        type: DataTypes.STRING(50)
    }
}, {
    sequelize,
    modelName: 'CustomItems',
    tableName: 'CUSTOMITEMS',
    timestamps: false
});

module.exports = CustomItems;
