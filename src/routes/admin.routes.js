import express from 'express';
import { checkAuth, checkRole } from '../middlewares/auth.middlewares.js';
import {
  registerGuru,
  createMapel,
  getAllMapel,
  updateMapel,
  deleteMapel,
  createJadwal,
  getAllJadwal,
  getJadwalByGuru,
  deleteJadwal,
  createKelas,
  getAllKelas,
  updateKelas,
  deleteKelas,
  createJurusan,
  getAllJurusan,
  updateJurusan,
  deleteJurusan,
  createSiswa,
  getAllSiswa,
  updateSiswa,
  deleteSiswa,
  getAllUsers
} from '../controllers/admin.controllers.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Admin - Mapel
 *     description: API untuk mengelola data Mata Pelajaran
 *   - name: Admin - Kelas
 *     description: API untuk mengelola data Kelas
 *   - name: Admin - Jurusan
 *     description: API untuk mengelola data Jurusan
 *   - name: Admin - Siswa
 *     description: API untuk mengelola data Siswa
 *   - name: Admin - Jadwal
 *     description: API untuk mengelola data Jadwal
 */

/**
 * @swagger
 * /admin/mapel:
 *   post:
 *     summary: (Admin) Membuat Mapel baru
 *     tags: [Admin - Mapel]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nama_mapel
 *             properties:
 *               nama_mapel:
 *                 type: string
 *                 example: "Bahasa Jepang"
 *     responses:
 *       '201':
 *         description: Mapel berhasil dibuat
 *       '400':
 *         description: Nama mapel tidak boleh kosong
 *       '401':
 *         description: Tidak terautentikasi
 *       '403':
 *         description: Akses ditolak
 *       '409':
 *         description: Nama mapel sudah ada
 */
router.post('/mapel', checkAuth, checkRole(['admin']), createMapel);

/**
 * @swagger
 * /admin/mapel:
 *   get:
 *     summary: (Admin) Mengambil semua data Mapel
 *     tags: [Admin - Mapel]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Sukses mengambil data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_mapel:
 *                     type: integer
 *                     example: 1
 *                   nama_mapel:
 *                     type: string
 *                     example: "Matematika"
 *       '401':
 *         description: Tidak terautentikasi
 *       '403':
 *         description: Akses ditolak
 */
router.get('/mapel', checkAuth, checkRole(['admin']), getAllMapel);

/**
 * @swagger
 * /admin/kelas:
 *   post:
 *     summary: (Admin) Membuat data Kelas baru
 *     tags: [Admin - Kelas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nama_kelas
 *             properties:
 *               nama_kelas:
 *                 type: string
 *                 example: "XII RPL 1"
 *     responses:
 *       '201':
 *         description: Kelas berhasil dibuat
 *       '400':
 *         description: Nama kelas tidak boleh kosong
 *       '409':
 *         description: Nama kelas sudah ada
 */
router.post('/kelas', checkAuth, checkRole(['admin']), createKelas);

/**
 * @swagger
 * /admin/kelas:
 *   get:
 *     summary: (Admin) Mengambil semua data Kelas
 *     tags: [Admin - Kelas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Sukses mengambil data kelas
 */
router.get('/kelas', checkAuth, checkRole(['admin']), getAllKelas);

/**
 * @swagger
 * /admin/jurusan:
 *   post:
 *     summary: (Admin) Membuat Jurusan baru
 *     tags: [Admin - Jurusan]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nama_jurusan
 *             properties:
 *               nama_jurusan:
 *                 type: string
 *                 example: "Teknik Komputer dan Jaringan"
 *     responses:
 *       '201':
 *         description: Jurusan berhasil dibuat
 */
router.post('/jurusan', checkAuth, checkRole(['admin']), createJurusan);

/**
 * @swagger
 * /admin/jurusan:
 *   get:
 *     summary: (Admin) Mengambil semua data Jurusan
 *     tags: [Admin - Jurusan]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Sukses mengambil data jurusan
 */
router.get('/jurusan', checkAuth, checkRole(['admin']), getAllJurusan);

/**
 * @swagger
 * /admin/siswa:
 *   post:
 *     summary: (Admin) Membuat data Siswa baru
 *     tags: [Admin - Siswa]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nama
 *               - nis
 *               - id_kelas
 *             properties:
 *               nama:
 *                 type: string
 *                 example: "Budi Setiawan"
 *               nis:
 *                 type: string
 *                 example: "20241023"
 *               id_kelas:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       '201':
 *         description: Siswa berhasil dibuat
 */
router.post('/siswa', checkAuth, checkRole(['admin']), createSiswa);

/**
 * @swagger
 * /admin/siswa:
 *   get:
 *     summary: (Admin) Mengambil semua data Siswa
 *     tags: [Admin - Siswa]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Sukses mengambil data siswa
 */
router.get('/siswa', checkAuth, checkRole(['admin']), getAllSiswa);

/**
 * @swagger
 * /admin/jadwal:
 *   post:
 *     summary: (Admin) Membuat jadwal baru
 *     tags: [Admin - Jadwal]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_mapel
 *               - id_guru
 *               - id_kelas
 *               - hari
 *               - jam_mulai
 *               - jam_selesai
 *             properties:
 *               id_mapel:
 *                 type: integer
 *                 example: 1
 *               id_guru:
 *                 type: integer
 *                 example: 3
 *               id_kelas:
 *                 type: integer
 *                 example: 2
 *               hari:
 *                 type: string
 *                 example: "Senin"
 *               jam_mulai:
 *                 type: string
 *                 example: "07:00"
 *               jam_selesai:
 *                 type: string
 *                 example: "08:30"
 *     responses:
 *       '201':
 *         description: Jadwal berhasil dibuat
 */
router.post('/jadwal', checkAuth, checkRole(['admin']), createJadwal);

/**
 * @swagger
 * /admin/jadwal:
 *   get:
 *     summary: (Admin) Mengambil semua jadwal
 *     tags: [Admin - Jadwal]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Sukses mengambil data jadwal
 */
router.get('/jadwal', checkAuth, checkRole(['admin']), getAllJadwal);

router.get('/users', checkAuth, checkRole(['admin'], getAllUsers));

export default router;
