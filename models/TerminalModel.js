import {Model} from "sequelize";
import sequelize from "../services/sequelize.js";
import {DataTypes} from "sequelize";
import CassTypes from "./CassTypesModel";
import Workers from "./WorkersModel";


class Terminal extends Model {

}

Terminal.init({
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        allowNull: true,
        primaryKey: true,
        validate: {
            notEmpty: true
        }
    },
    cass_day: {
        type: DataTypes.DATE,
    },
    cass_type: {
        type: DataTypes.BIGINT
    },
    term_num: {
        type: DataTypes.INTEGER
    },
    term_open: {
        type: DataTypes.BOOLEAN,
        default: false
    },
    term_closed: {
        type: DataTypes.BOOLEAN,
        default: true
    },
    holder_id: {
        type: DataTypes.BIGINT
    },
    manager_id: {
        type: DataTypes.BIGINT
    },
    init_cash: {
        type: DataTypes.INTEGER
    },
    actual_cash: {
        type: DataTypes.INTEGER
    },
    expences: {
        type: DataTypes.INTEGER
    },
    cash_in: {
        type: DataTypes.INTEGER
    },
    cash_out: {
        type: DataTypes.INTEGER
    },
    revenue: {
        type: DataTypes.INTEGER
    },
    closing_balance: {
        type: DataTypes.INTEGER
    },
    status: {
        type: DataTypes.ENUM('opened', 'closed')
    }
}, {
    modelName: "terminal",
    tableName: "terminal",
    sequelize
})

Terminal.belongsTo(CassTypes, {
    foreignKey: "cass_type",
    targetKey: "cass_type_id",
    as: 'CassType'
})

Terminal.belongsTo(Workers, {
    foreignKey: 'holder_id',
    targetKey: 'worker_id',
    as: 'Holder'
});

Terminal.belongsTo(Workers, {
    foreignKey: 'manager_id',
    targetKey: 'worker_id',
    as: 'Manager'
})
export default Terminal;
