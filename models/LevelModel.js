import { Model, DataTypes } from "sequelize";
import sequelize from "../services/sequelize.js";
import RightModel from "./RightsModel";

class Level extends Model {}

Level.init({
    level_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        allowNull: true,
        primaryKey: true,
        validate: {
            notEmpty: true
        }
    },
    level_name: {
        type: DataTypes.STRING,
    }
}, {
    modelName: "level",
    tableName: "level",
    sequelize
});

Level.belongsToMany(RightModel, {
    through: "LevelRights",
    as: "rightsList",
    foreignKey: "level_id",
    otherKey: "right_id"
});

export default Level;
