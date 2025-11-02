import express from 'express';
import { loginAdmin, loginGuruDanKepsek } from '../controllers/auth.controllers.js';

const router = express.Router();

// POST /api/auth/login-admin
router.post('/login-admin', loginAdmin);
// POST /api/auth/login
router.post('/login', loginGuruDanKepsek);


export default router;