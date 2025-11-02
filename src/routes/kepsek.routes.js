import express from 'express';

import {
  getAllJurnalHarian,
  getDetailJurnalById,
} from '../controllers/kepsek.controllers.js';
import { checkAuth, checkRole } from '../middlewares/auth.middlewares.js';

const router = express.Router();

/**
 * @route   GET /api/kepsek/jurnals
 * @desc    (Dashboard) Mengambil daftar semua jurnal harian
 * @access  Private (Kepsek)
 */
router.get(
  '/jurnals',
  checkAuth,
  checkRole(['kepsek']), // Hanya Kepsek
  getAllJurnalHarian
);

/**
 * @route   GET /api/kepsek/jurnal/:id_jurnal
 * @desc    (Detail) Mengambil detail 1 jurnal harian + absensi
 * @access  Private (Kepsek)
 */
router.get(
  '/jurnal/:id_jurnal',
  checkAuth,
  checkRole(['kepsek']), // Hanya Kepsek
  getDetailJurnalById
);

export default router;