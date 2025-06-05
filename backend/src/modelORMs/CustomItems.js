
const { Sequelize, DataTypes, Model } = require('sequelize');


class CustomItems extends Model {

}

CustomItems.init({
    customItemsId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Bottom: DataTypes.STRING,
    Bow: DataTypes.STRING,
    Earring: DataTypes.STRING,
    EyeBrow: DataTypes.STRING,
    Eyes: DataTypes.STRING,
    Face: DataTypes.STRING,
    FaceMask: DataTypes.STRING,
    FacialHair: DataTypes.STRING,
    Glasses: DataTypes.STRING,
    Hair: DataTypes.STRING,
    Hat: DataTypes.STRING,
    Head: DataTypes.STRING,
    Nose: DataTypes.STRING,
    Outfit: DataTypes.STRING,
    Shoes: DataTypes.STRING,
    TOPITEM: DataTypes.STRING,

}, {
    sequelize: globalThis.sequelize,
    modelName: 'CUSTOMITEMS',
    tableName: 'CUSTOMITEMS',
})


module.exports = CustomItems