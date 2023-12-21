import { Model, DataTypes } from "sequelize";
import sequelize from "../services/sequelize.js";
import Workers from "./WorkersModel";
import Level from "./LevelModel";

class LevelRights extends Model {}

LevelRights.init(
    {
        levelRight_id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            allowNull: true,
            primaryKey: true,
            validate: {
                notEmpty: true,
            },
        },
        level_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: "level",
                key: "level_id",
            },
        },
        right_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: "rights",
                key: "right_id",
            },
        },
    },
    {
        modelName: "levelRights",
        tableName: "level_rights",
        sequelize,
    }
);

// Workers.belongsTo(Level, {
//     foreignKey: 'level',
//     targetKey: 'level_id',
//     as: 'workerLevel'
// })

export default LevelRights;
