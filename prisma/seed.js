import { PrismaClient } from "../generated/prisma/client.ts";
import "dotenv/config"
const prisma = new PrismaClient();


function getThisWeekDates() {
  const today = new Date();
  const monday = new Date(today);
  monday.setDate(today.getDate() - ((today.getDay() + 6) % 7)); // Monday
  return Array.from({ length: 5 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
}

async function main() {
  console.log("🌱 Seeding full school dataset...");

  // =====================
  // 📘 Jurusan
  // =====================
  const [rpl, tkj, akl] = await prisma.$transaction([
    prisma.jurusan.create({ data: { nama_jurusan: "Rekayasa Perangkat Lunak" } }),
    prisma.jurusan.create({ data: { nama_jurusan: "Teknik Komputer dan Jaringan" } }),
    prisma.jurusan.create({ data: { nama_jurusan: "Akuntansi dan Keuangan Lembaga" } }),
  ]);

  // =====================
  // 👩‍🏫 Guru
  // =====================
  const [
    guruBudi, guruSiti, guruAhmad,
    guruDewi, guruTono, guruWulan,
    guruRahma, kepsek, admin
  ] = await prisma.$transaction([
    prisma.guru.create({ data: { nip: "19851212RPL001", nama_lengkap: "Budi Santoso", password: "hashedpassword", role: "guru", is_wali_kelas: true, id_jurusan: rpl.id_jurusan } }),
    prisma.guru.create({ data: { nip: "19870507TKJ001", nama_lengkap: "Siti Marlina", password: "hashedpassword", role: "guru", is_wali_kelas: true, id_jurusan: tkj.id_jurusan } }),
    prisma.guru.create({ data: { nip: "19791111AKL001", nama_lengkap: "Ahmad Ramdani", password: "hashedpassword", role: "guru", is_wali_kelas: true, id_jurusan: akl.id_jurusan } }),
    prisma.guru.create({ data: { nip: "19900101RPL002", nama_lengkap: "Dewi Kartika", password: "hashedpassword", id_jurusan: rpl.id_jurusan } }),
    prisma.guru.create({ data: { nip: "19880404RPL003", nama_lengkap: "Tono Suprapto", password: "hashedpassword", id_jurusan: rpl.id_jurusan } }),
    prisma.guru.create({ data: { nip: "19890509TKJ002", nama_lengkap: "Wulan Ayu", password: "hashedpassword", id_jurusan: tkj.id_jurusan } }),
    prisma.guru.create({ data: { nip: "19780508AKL002", nama_lengkap: "Rahmawati", password: "hashedpassword", id_jurusan: akl.id_jurusan } }),
    prisma.guru.create({ data: { nip: "19670101KEP001", nama_lengkap: "H. Suparman", password: "hashedpassword", role: "kepsek" } }),
    prisma.guru.create({ data: { nip: "19800000ADM001", nama_lengkap: "Admin Sistem", password: "hashedpassword", role: "admin" } }),
  ]);

  // =====================
  // 🏫 Kelas
  // =====================
  const [kelasRPL, kelasTKJ, kelasAKL] = await prisma.$transaction([
    prisma.kelas.create({
      data: { nama_kelas: "X RPL 1", id_jurusan: rpl.id_jurusan, id_wali_kelas: guruBudi.id_guru },
    }),
    prisma.kelas.create({
      data: { nama_kelas: "XI TKJ 1", id_jurusan: tkj.id_jurusan, id_wali_kelas: guruSiti.id_guru },
    }),
    prisma.kelas.create({
      data: { nama_kelas: "XII AKL 1", id_jurusan: akl.id_jurusan, id_wali_kelas: guruAhmad.id_guru },
    }),
  ]);

  // =====================
  // 📚 Mapel
  // =====================
  const [pbo, bd, jaringan, akuntansi, pai, pk] = await prisma.$transaction([
    prisma.mapel.create({ data: { nama_mapel: "Pemrograman Berorientasi Objek" } }),
    prisma.mapel.create({ data: { nama_mapel: "Basis Data" } }),
    prisma.mapel.create({ data: { nama_mapel: "Jaringan Komputer" } }),
    prisma.mapel.create({ data: { nama_mapel: "Akuntansi Dasar" } }),
    prisma.mapel.create({ data: { nama_mapel: "Pendidikan Agama Islam" } }),
    prisma.mapel.create({ data: { nama_mapel: "Produktif Kejuruan" } }),
  ]);

  // =====================
  // 👨‍🎓 Siswa
  // =====================
  await prisma.siswa.createMany({
    data: [
      { nis: "2223456789", nama_lengkap: "Andi Saputra", jenis_kelamin: "L", id_kelas: kelasRPL.id_kelas },
      { nis: "2223456790", nama_lengkap: "Dina Pertiwi", jenis_kelamin: "P", id_kelas: kelasRPL.id_kelas },
      { nis: "2223456791", nama_lengkap: "Eka Pratama", jenis_kelamin: "L", id_kelas: kelasRPL.id_kelas },
      { nis: "2224456789", nama_lengkap: "Rizky Firmansyah", jenis_kelamin: "L", id_kelas: kelasTKJ.id_kelas },
      { nis: "2224456790", nama_lengkap: "Salsa Nabila", jenis_kelamin: "P", id_kelas: kelasTKJ.id_kelas },
      { nis: "2224456791", nama_lengkap: "Bagus Wicaksono", jenis_kelamin: "L", id_kelas: kelasTKJ.id_kelas },
      { nis: "2225456789", nama_lengkap: "Putri Lestari", jenis_kelamin: "P", id_kelas: kelasAKL.id_kelas },
      { nis: "2225456790", nama_lengkap: "Yanto Nugroho", jenis_kelamin: "L", id_kelas: kelasAKL.id_kelas },
      { nis: "2225456791", nama_lengkap: "Anisa Fadilah", jenis_kelamin: "P", id_kelas: kelasAKL.id_kelas },
    ],
  });

  // =====================
  // ⏰ Jadwal (Senin–Jumat)
  // =====================
  const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"];
  const mapelList = [pbo, bd, jaringan, akuntansi, pai];

  const jadwalRPL = [];
  for (let i = 0; i < 5; i++) {
    jadwalRPL.push(
      await prisma.jadwal.create({
        data: {
          id_guru: guruDewi.id_guru,
          id_kelas: kelasRPL.id_kelas,
          id_mapel: mapelList[i % mapelList.length].id_mapel,
          hari: days[i],
          jam_mulai: new Date(`2024-11-1${i + 1}T07:00:00`),
          jam_selesai: new Date(`2024-11-1${i + 1}T09:00:00`),
        },
      })
    );
  }

  // =====================
  // 📆 Absensi & Jurnal minggu ini
  // =====================
  const weekDates = getThisWeekDates();
  const allSiswa = await prisma.siswa.findMany();
  for (let i = 0; i < weekDates.length; i++) {
    const tanggal = weekDates[i];
    const jadwalHari = jadwalRPL[i];

    // absensi semua siswa kelas RPL
    for (const s of allSiswa.filter((x) => x.id_kelas === kelasRPL.id_kelas)) {
      await prisma.absensi.create({
        data: {
          id_siswa: s.id_siswa,
          id_jadwal: jadwalHari.id_jadwal,
          tanggal,
          status: ["H", "I", "S", "A"][Math.floor(Math.random() * 4)],
        },
      });
    }

    // jurnal harian
    await prisma.jurnal_harian.create({
      data: {
        id_jadwal: jadwalHari.id_jadwal,
        tanggal,
        materi: `Pertemuan ke-${i + 1}: ${
          mapelList[i % mapelList.length].nama_mapel
        }`,
        kegiatan: `Pembelajaran ${mapelList[i % mapelList.length].nama_mapel} hari ${
          days[i]
        }. Siswa mempelajari materi lanjutan.`,
      },
    });
  }

  console.log("✅ Seeding complete with full week data!");
}

main()
  .catch((e) => {
    console.error("❌ Error during seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
