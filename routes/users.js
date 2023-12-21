const express = require('express');
const router = express.Router();
import WorkersController from "../controllers/WorkersController";

// workers

router.post('/workers/add', WorkersController.addWorker);
router.put('/workers/update', WorkersController.editWorker);
router.post('/workers/fire', WorkersController.deleteWorker);
router.post('/workers/login', WorkersController.loginWorker)

// managers

router.post('/manager/add', WorkersController.addManager);
router.post('/manager/login', WorkersController.loginManager);

export default router;
