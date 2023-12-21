const express = require('express');
const router = express.Router();
import TerminalsController from "../controllers/TerminalsController";

router.post('/add', TerminalsController.addTerminal);
//
router.get('/single', TerminalsController.getTerminal);
//
router.put('/open', TerminalsController.openTerminal);
//
router.put('/close', TerminalsController.closeTerminal);
export default router;
