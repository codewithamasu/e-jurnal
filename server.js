import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./src/config/db.js";
import router from "./src/app.js";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
dotenv.config();

// Express Middlewares
const app = express();
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ jaga-jaga tambahan manual untuk header yang kadang di-skip
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});
app.use(express.urlencoded({ extended: true }))
app.use(helmet())
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30 // limit each IP to 100 requests per windowMs
}))
app.use(express.json());

connectDB(); // koneksi ke MySQL

app.use("/api", router);
app.get('/', (req, res) => {
  res.send('🎉 Halo! Server E-Jurnal sudah berjalan!');
});

const PORT = 5500;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
