import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import router from "./app.js";
dotenv.config();

// Express Middlewares
const app = express();
app.use(cors());
app.use(express.json());

connectDB(); // koneksi ke MySQL

app.use("/api", router);
app.get('/', (req, res) => {
  res.send('🎉 Halo! Server E-Jurnal sudah berjalan!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
