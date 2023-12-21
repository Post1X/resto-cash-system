import { Model, DataTypes } from "sequelize";
import sequelize from "../services/sequelize.js";
import Level from "./LevelModel";

class RightModel extends Model {}

RightModel.init({
    right_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        allowNull: true,
        primaryKey: true,
        validate: {
            notEmpty: true
        }
    },
    title: {
        type: DataTypes.STRING,
    }
}, {
    modelName: "rights",
    tableName: "rights",
    sequelize
});


export default RightModel;
