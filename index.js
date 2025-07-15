// 1. Mengimpor modul express
const express = require("express");
const db = require("./src/models");
const morgan = require("morgan");
require("dotenv").config();
// 2. Membuat instance dari aplikasi express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

const userRoutes = require("./src/routes/user.routes");
const authRoutes = require("./src/routes/auth.routes");

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
// 3. Mendefinisikan port untuk server
// Menggunakan port dari environment variable jika ada, jika tidak, gunakan port 3000
const port = process.env.PORT || 3000;
// async function testDbConnection() {
//   try {
//     await db.sequelize.authenticate();
//     console.log("Koneksi ke database berhasil terkoneksi.");
//   } catch (error) {
//     console.error("Tidak dapat terhubung ke database:", error);
//   }
// }

// testDbConnection();

// 4. Mendefinisikan route sederhana untuk root URL ('/')
app.get("/", (req, res) => {
	res.send("Hello World!");
});

// 5. Menjalankan server dan mendengarkan koneksi pada port yang ditentukan
app.listen(port, () => {
	console.log(`Server berjalan di http://localhost:${port}`);
});
