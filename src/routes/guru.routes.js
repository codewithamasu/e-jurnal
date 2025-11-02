import express from 'express';

import {
  getJadwalSaya,
  getSiswaByKelas,
  submitJurnalDanAbsensi,
} from '../controllers/guru.controllers.js';

import { checkAuth, checkRole } from '../middlewares/auth.middlewares.js';

const router = express.Router();

/**
 * @route   GET /api/guru/jadwal-saya
 * @desc    Mengambil semua jadwal milik guru yang sedang login
 * @access  Private (Guru, Kepsek)
 */
router.get(
  '/jadwal-saya',
  checkAuth,
  checkRole(['guru', 'kepsek']),
  getJadwalSaya
);

/**
 * @route   GET /api/guru/kelas/:id_kelas/siswa
 * @desc    Mengambil daftar siswa berdasarkan ID Kelas
 * @access  Private (Guru, Kepsek)
 */
router.get(
  '/kelas/:id_kelas/siswa',
  checkAuth,
  checkRole(['guru', 'kepsek']),
  getSiswaByKelas
);

/**
 * @route   POST /api/guru/jurnal
 * @desc    Guru submit jurnal harian DAN absensi siswa
 * @access  Private (Guru)
 */
router.post(
  '/jurnal',
  checkAuth,
  checkRole(['guru']), // Hanya guru yang bisa submit
  submitJurnalDanAbsensi
);

export default router;