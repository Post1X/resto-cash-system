import {Model} from "sequelize";
import sequelize from "../services/sequelize.js";
import {DataTypes} from "sequelize";


class CassTypes extends Model {

}

CassTypes.init({
    cass_type_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        allowNull: true,
        primaryKey: true,
        validate: {
            notEmpty: true
        }
    },
    title: {
        type: DataTypes.STRING
    }
}, {
    modelName: "cass-type",
    tableName: "cass-type",
    sequelize
})


export default CassTypes;
