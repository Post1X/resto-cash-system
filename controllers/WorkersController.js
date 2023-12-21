import Workers from "../models/WorkersModel";
import generateRandomString from "../utilities/generator";
import {Op} from "sequelize";
import JWT from "jsonwebtoken";

class WorkersController {
    static addWorker = async (req, res, next) => {
        try {
            const {
                first_name,
                last_name,
                middle_name,
                gender,
                birthdate,
                address,
                phone_number,
                social_networks,
            } = req.body;
            const parts = birthdate.split('.');
            const formattedDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
            const code = await generateRandomString();
            const worker = await Workers.create({
                first_name,
                last_name,
                middle_name,
                gender,
                birthdate: formattedDate,
                address,
                phone_number,
                social_networks,
                worker_level: 1,
                pin_code: code.toString()
            });
            res.status(200).json(worker);
        } catch (e) {
            e.status = 401;
            next(e);
        }
    }
    //
    static editWorker = async (req, res, next) => {
        try {
            const {id} = req.query;
            const {
                first_name,
                last_name,
                middle_name,
                gender,
                birthdate,
                address,
                phone_number,
                social_networks,
                worker_level
            } = req.body;
            const updatedWorker = await Workers.update({
                worker_id: id
            }, {
                first_name,
                last_name,
                middle_name,
                gender,
                birthdate,
                address,
                phone_number,
                social_networks,
                worker_level
            });
            res.status(200).json(updatedWorker);
        } catch (e) {
            e.status = 401;
            next(e);
        }
    }
    //
    static deleteWorker = async (req, res, next) => {
        try {
            const {id} = req.query;
            const {reason} = req.body;
            if (!!reason)
                return res.status(401).json({
                    message: 'Введите причину увольнения.'
                })
            const deletedWorker = await Workers.update({
                worker_id: id
            }, {
                is_fired: true,
                fire_reason: reason
            });
            res.status(200).json(deletedWorker);
        } catch (e) {
            e.status = 401;
            next(e);
        }
    }
    //
    static loginWorker = async (req, res, next) => {
        try {
            const JWT_SECRET = process.env.JWT_SECRET;
            const {pin} = req.body;
            const worker = await Workers.findOne({
                where: {
                    pin_code: pin
                }
            });
            if (worker) {
                const token = JWT.sign({
                    user_id: worker.worker_id,
                    level: worker.worker_level,
                    isWorker: true
                }, JWT_SECRET);
                return res.status(200).json({
                    token,
                    worker_data: worker
                })
            } else {
                return res.status(400).json({
                    message: 'Нет работника с таким пином.'
                })
            }
        } catch (e) {
            e.status = 401;
            next(e);
        }
    }
    //
    static addManager = async (req, res, next) => {
        try {
            const {
                first_name,
                last_name,
                middle_name,
                gender,
                birthdate,
                address,
                phone_number,
                social_networks,
                worker_level
            } = req.body;
            const parts = birthdate.split('.');
            const formattedDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
            const code = await generateRandomString();
            const manager = await Workers.create({
                first_name,
                last_name,
                middle_name,
                gender,
                birthdate: formattedDate,
                address,
                phone_number,
                social_networks,
                worker_level,
                pin_code: code
            });
            res.status(200).json(manager);
        } catch (e) {
            e.status = 401;
            next(e);
        }
    }
    //
    static loginManager = async (req, res, next) => {
        try {
            const JWT_SECRET = process.env.JWT_SECRET;
            const {pin} = req.body;
            const manager = await Workers.findOne({
                where: {
                    pin_code: pin,
                    worker_level: {
                        [Op.gt]: 1
                    }
                }
            });
            if (manager) {
                const token = JWT.sign({
                    user_id: manager.worker_id,
                    level: manager.worker_level,
                    isManager: true
                }, JWT_SECRET);
                return res.status(200).json({
                    token,
                    manager_data: manager
                });
            } else {
                return res.status(404).json({message: "Нет менеджера с таким пином."});
            }
        } catch (e) {
            e.status = 401;
            next(e);
        }
    }
}

export default WorkersController
