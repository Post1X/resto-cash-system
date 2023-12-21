import jwt from 'jsonwebtoken';
//
const EXCLUDE = ['/workers/login', '/manager/login'];

const authorization = async (req, res, next) => {
    try {
        const {authorization = ''} = req.headers;
        const {originalUrl, method} = req;
        if (method === 'OPTIONS' || EXCLUDE.includes(req.path)) {
            next();
            return;
        }
        if (!authorization) {
            next();
        }
        const {JWT_SECRET} = process.env;
        const token = authorization.replace('Bearer ', '');
        const userInfo = jwt.verify(token, JWT_SECRET);
        req.user_id = userInfo.user_id;
        if (userInfo.isManager) {
            req.isManager = userInfo.isManager
        }
        if (userInfo.isWorker) {
            req.isWorker = userInfo.isWorker
        }
        next();
    } catch (e) {
        e.status = 401;
        next(e);
    }
}

export default authorization;


