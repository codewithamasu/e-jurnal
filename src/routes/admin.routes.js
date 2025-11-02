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
  deleteSiswa
} from '../controllers/admin.controllers.js';

const router = express.Router();

// POST /api/admin/register
// 1. checkAuth -> Cek ada token & valid?
// 2. checkRole(['admin']) -> Cek tokennya punya role 'admin'?
// 3. registerGuru -> Jika lolos, jalankan controller
router.post('/register', checkAuth, checkRole(['admin']), registerGuru);

// Rute untuk CRUD Mapel
// Semua rute ini hanya bisa diakses oleh 'admin' yang sudah login

// POST /api/admin/mapel
router.post('/mapel', checkAuth, checkRole(['admin']), createMapel);

// GET /api/admin/mapel
router.get('/mapel', checkAuth, checkRole(['admin']), getAllMapel);

// PUT /api/admin/mapel/:id
router.put('/mapel/:id', checkAuth, checkRole(['admin']), updateMapel);

// DELETE /api/admin/mapel/:id
router.delete('/mapel/:id', checkAuth, checkRole(['admin']), deleteMapel);

// Rute untuk CRUD Jadwal (Hanya Admin)
// POST /api/admin/jadwal (Membuat jadwal baru)
router.post('/jadwal', checkAuth, checkRole(['admin']), createJadwal);

// GET /api/admin/jadwal (Melihat semua jadwal)
router.get('/jadwal', checkAuth, checkRole(['admin']), getAllJadwal);

// GET /api/admin/jadwal/guru/:id_guru (Melihat jadwal per guru)
router.get(
  '/jadwal/guru/:id_guru',
  checkAuth,
  checkRole(['admin']),
  getJadwalByGuru
);

// DELETE /api/admin/jadwal/:id_jadwal (Menghapus jadwal)
router.delete(
  '/jadwal/:id_jadwal',
  checkAuth,
  checkRole(['admin']),
  deleteJadwal
);

// Rute untuk CRUD Kelas (Hanya Admin)
// POST /api/admin/kelas
router.post('/kelas', checkAuth, checkRole(['admin']), createKelas);

// GET /api/admin/kelas
router.get('/kelas', checkAuth, checkRole(['admin']), getAllKelas);

// PUT /api/admin/kelas/:id
router.put('/kelas/:id', checkAuth, checkRole(['admin']), updateKelas);

// DELETE /api/admin/kelas/:id
router.delete('/kelas/:id', checkAuth, checkRole(['admin']), deleteKelas);

// Rute untuk CRUD Jurusan (Hanya Admin)
// POST /api/admin/jurusan
router.post('/jurusan', checkAuth, checkRole(['admin']), createJurusan);

// GET /api/admin/jurusan
router.get('/jurusan', checkAuth, checkRole(['admin']), getAllJurusan);

// PUT /api/admin/jurusan/:id
router.put('/jurusan/:id', checkAuth, checkRole(['admin']), updateJurusan);

// DELETE /api/admin/jurusan/:id
router.delete('/jurusan/:id', checkAuth, checkRole(['admin']), deleteJurusan);

// Rute untuk CRUD Siswa
// POST /api/admin/siswa
router.post('/siswa', checkAuth, checkRole(['admin']), createSiswa);

// GET /api/admin/siswa
router.get('/siswa', checkAuth, checkRole(['admin']), getAllSiswa);

// PUT /api/admin/siswa/:id
router.put('/siswa/:id', checkAuth, checkRole(['admin']), updateSiswa);

// DELETE /api/admin/siswa/:id
router.delete('/siswa/:id', checkAuth, checkRole(['admin']), deleteSiswa);


export default router;