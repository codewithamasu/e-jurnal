import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import prisma from '../prismaClient.js';

export const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // 1. Validasi input
    if (!username || !password) {
      return res.status(400).json({ msg: 'Username dan Password tidak boleh kosong' });
    }

    // 2. Cek kredensial admin (hardcoded)
    const ADMIN_USERNAME = '1992502';
    const ADMIN_PASSWORD = 'iyan-225';

    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      return res.status(401).json({ msg: 'Username atau password salah' });
    }

    // 3. Buat payload untuk JWT
    const payload = {
      username: ADMIN_USERNAME,
      role: 'admin',
    };

    // 4. Buat token JWT
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1h', // Token berlaku 1 hari
    });

    // 5. Kirim token ke client
    res.status(200).json({
      msg: 'Login Admin Berhasil',
      token: token,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const loginGuruDanKepsek = async (req, res) => {
  try {
    const { nip, password } = req.body;

    // 1. Validasi input
    if (!nip || !password) {
      return res.status(400).json({ msg: 'NIP dan Password tidak boleh kosong' });
    }

    // 2. Cari user (guru/kepsek) berdasarkan NIP
    const user = await prisma.guru.findUnique({
      where: { nip: nip },
    });

    // 3. Cek apakah user ada
    if (!user) {
      return res.status(404).json({ msg: 'NIP tidak ditemukan' });
    }

    // 4. JANGAN izinkan Admin login di sini
    if (user.role === 'admin') {
      return res
        .status(403)
        .json({ msg: 'Login Admin ada di halaman terpisah.' });
    }

    // 5. Cek password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: 'Password salah' });
    }

    // 6. Buat Token JWT (Payload berisi ID dan Role)
    const payload = {
      userId: user.id_guru,
      role: user.role, // Ini akan berisi 'guru' atau 'kepsek'
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    // 7. Kirim token dan data user ke client
    res.status(200).json({
      msg: `Login sebagai ${user.role} berhasil`,
      token: token,
      user: {
        id_guru: user.id_guru,
        nama: user.nama_lengkap,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
