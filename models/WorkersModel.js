import {Model} from "sequelize";
import sequelize from "../services/sequelize.js";
import {DataTypes} from "sequelize";
import Level from "./LevelModel";


class Workers extends Model {

}

Workers.init({
    worker_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        allowNull: true,
        primaryKey: true,
        validate: {
            notEmpty: true
        }
    },
    first_name: {
        type: DataTypes.STRING
    },
    last_name: {
        type: DataTypes.STRING
    },
    middle_name: {
        type: DataTypes.STRING
    },
    gender: {
        type: DataTypes.ENUM("Мужчина", "Женщина")
    },
    birthdate: {
        type: DataTypes.DATE
    },
    address: {
        type: DataTypes.STRING
    },
    phone_number: {
        type: DataTypes.STRING
    },
    social_networks: {
        type: DataTypes.STRING
    },
    worker_level: {
        type: DataTypes.BIGINT,
    },
    is_fired: {
        type: DataTypes.BOOLEAN
    },
    fire_reason: {
        type: DataTypes.STRING
    },
    pin_code: {
        type: DataTypes.STRING
    }
}, {
    modelName: "workers",
    tableName: "workers",
    sequelize
})



export default Workers;
