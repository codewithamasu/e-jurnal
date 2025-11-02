import express from "express";
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import guruRoutes from "./routes/guru.routes.js";
import kepsekRoutes from "./routes/kepsek.routes.js";
// import kelasRoutes from "./routes/kelas.routes.js";
// import siswaRoutes from "./routes/siswa.routes.js";
// import absensiRoutes from "./routes/absensi.routes.js";
// import jurnalRoutes from "./routes/jurnal.routes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/admin", adminRoutes)
router.use("/guru", guruRoutes);
router.use("/kepsek", kepsekRoutes);
// router.use("/kelas", kelasRoutes);
// router.use("/siswa", siswaRoutes);
// router.use("/absensi", absensiRoutes);
// router.use("/jurnal", jurnalRoutes);



export default router;
