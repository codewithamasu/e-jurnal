import prisma from '../prismaClient.js';

/**
 * @route   GET /api/kepsek/jurnals
 * @desc    (Dashboard) Mengambil daftar semua jurnal harian dari semua guru
 * @access  Private (Kepsek)
 */
export const getAllJurnalHarian = async (req, res) => {
  try {
    const allJurnals = await prisma.jurnal_harian.findMany({
      // Kita ambil data terkait yang diperlukan untuk card
      include: {
        jadwal: {
          include: {
            guru: {
              select: { nama_lengkap: true }, // Nama Guru
            },
            kelas: {
              select: { nama_kelas: true }, // Nama Kelas
            },
          },
        },
      },
      // Urutkan berdasarkan yang terbaru
      orderBy: {
        tanggal: 'desc',
      },
    });

    res.status(200).json(allJurnals);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

/**
 * @route   GET /api/kepsek/jurnal/:id_jurnal
 * @desc    (Detail) Mengambil detail 1 jurnal harian + daftar absensinya
 * @access  Private (Kepsek)
 */
export const getDetailJurnalById = async (req, res) => {
  const { id_jurnal } = req.params;

  try {
    // Langkah 1: Ambil data jurnal dan detail terkaitnya (guru, kelas, mapel)
    const detailJurnal = await prisma.jurnal_harian.findUnique({
      where: { id_jurnal: parseInt(id_jurnal) },
      include: {
        jadwal: {
          include: {
            guru: { select: { nama_lengkap: true } },
            kelas: { select: { nama_kelas: true } },
            mapel: { select: { nama_mapel: true } },
          },
        },
      },
    });

    if (!detailJurnal) {
      return res.status(404).json({ msg: 'Jurnal tidak ditemukan' });
    }

    // Langkah 2: Ambil daftar absensi yang terkait
    // (Berdasarkan id_jadwal DAN tanggal yang sama dengan jurnal)
    const daftarAbsensi = await prisma.absensi.findMany({
      where: {
        id_jadwal: detailJurnal.id_jadwal,
        tanggal: detailJurnal.tanggal,
      },
      include: {
        siswa: {
          select: { nis: true, nama_lengkap: true }, // Tampilkan nama siswa
        },
      },
      orderBy: {
        siswa: { nama_lengkap: 'asc' }, // Urutkan berdasarkan nama siswa
      },
    });

    // Langkah 3: Gabungkan keduanya dan kirim sebagai respons
    res.status(200).json({
      detailJurnal,
      daftarAbsensi,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};