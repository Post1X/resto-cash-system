import auth from "../middlewares/auth";
import users from "./users";
import terminal from "./terminal";

const express = require('express');
const router = express.Router();


router.use('/users', auth, users); // Пользователи (работники, менеджеры, суперюзеры и т.д..)
router.use('/terminal', auth, terminal); // Раут управления кассовыми аппаратами

export default router;
