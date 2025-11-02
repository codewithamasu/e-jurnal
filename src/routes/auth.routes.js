import express from 'express';
import { loginAdmin, loginGuruDanKepsek } from '../controllers/auth.controllers.js';

const router = express.Router();

// POST /api/auth/login-admin
router.post('/login-admin', loginAdmin);

// POST /api/auth/login
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login untuk Guru dan Kepala Sekolah
 *     tags: [Auth]
 *     description: Endpoint untuk Guru/Kepsek login menggunakan NIP dan Password. Mengembalikan token JWT jika berhasil.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nip
 *               - password
 *             properties:
 *               nip:
 *                 type: string
 *                 description: NIP pengguna
 *                 example: "19800202"
 *               password:
 *                 type: string
 *                 description: Password pengguna
 *                 example: "guru123"
 *     responses:
 *       '200':
 *         description: Login berhasil.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Login sebagai guru berhasil"
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 user:
 *                   type: object
 *                   properties:
 *                     id_guru:
 *                       type: integer
 *                       example: 2
 *                     nama:
 *                       type: string
 *                       example: "Budi Santoso"
 *                     role:
 *                       type: string
 *                       example: "guru"
 *       '400':
 *         description: NIP atau Password tidak boleh kosong.
 *       '401':
 *         description: Password salah.
 *       '404':
 *         description: NIP tidak ditemukan.
 *     security: []
 */
router.post('/login', loginGuruDanKepsek);

export default router;