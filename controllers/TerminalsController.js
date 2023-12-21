import Terminal from "../models/TerminalModel";
import Workers from "../models/WorkersModel";
import CassTypes from "../models/CassTypesModel";

class TerminalsController {
    static addTerminal = async (req, res, next) => {
        try {
            const {cass_type, term_num, manager_id} = req.body;
            const {user_id} = req;
            const terminal = await Terminal.create({
                cass_type,
                term_num,
                manager_id,
                holder_id: user_id,
                cass_day: new Date(),
                init_cash: 0.00,
                actual_cash: 0.00,
                expences: 0.00,
                cash_in: 0.00,
                cash_out: 0.00,
                revenue: 0.00,
                closing_balance: 0.00,
                status: 'closed'
            });
            if (terminal) res.status(200).json(terminal); else res.status(400).json({
                message: 'Непредвиденная ошибка. Попробуйте позже.'
            })
        } catch (e) {
            e.status = 401;
            next(e);
        }
    }
    //
    static getTerminal = async (req, res, next) => {
        try {
            const {id} = req.query;
            const terminal = await Terminal.findOne({
                where: {
                    id: id
                },
                include: [
                    {
                        model: Workers,
                        as: 'Holder',
                        attributes: ['worker_id', 'first_name', 'last_name']
                    },
                    {
                        model: Workers,
                        as: 'Manager',
                        attributes: ['worker_id', 'first_name', 'last_name']
                    },
                    {
                        model: CassTypes,
                        as: 'CassType',
                        attributes: ['title', 'cass_type_id']
                    }
                ]
            });
            res.status(200).json(terminal ? terminal : 'Такого терминала нет.');
        } catch (e) {
            e.status = 401;
            next(e);
        }
    }
    //
    static openTerminal = async (req, res, next) => {
        try {
            const {id} = req.query;
            const {user_id} = req;
            await Terminal.update({
                term_open: true, term_closed: false, status: 'opened', holder_id: user_id
            }, {
                where: {
                    id: id
                }
            });
            res.status(200).json({
                message: 'success'
            });
        } catch (e) {
            e.status = 401;
            next(e);
        }
    }
    //
    static closeTerminal = async (req, res, next) => {
        try {
            const {id} = req.query;
            const {user_id} = req;
            await Terminal.update({
                term_open: false, term_closed: true, status: 'closed', holder_id: user_id
            }, {
                where: {
                    id: id
                }
            });
            res.status(200).json({
                message: 'success'
            });
        } catch (e) {
            e.status = 401;
            next(e);
        }
    }
}

export default TerminalsController;
