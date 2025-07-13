const express = require("express");
const db = require("./src/models");
const userRoutes = require("./src/routes/user.routes");
const AppError = require("./src/utils/AppError");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.json({ message: "Selamat datang di API aplikasi." });
});

// Mendaftarkan user routes dengan prefiks /api/users
app.use("/api/users", userRoutes);

// Error handler terpusat
app.use((err, req, res, next) => {
	console.error(err.stack);
	const statusCode = err.statusCode || 500;
	const message = err.message || "Terjadi kesalahan pada server!";
	res.status(statusCode).json({ status: err.status || "error", message });
});

// Sinkronisasi database (opsional, lebih baik menggunakan migrasi di produksi)
// db.sequelize.sync();

app.listen(port, () => {
	console.log(`Server berjalan di http://localhost:${port}`);
});

// Uji koneksi database
async function testDbConnection() {
	try {
		await db.sequelize.authenticate();
		console.log("Koneksi ke database berhasil terkoneksi.");
	} catch (error) {
		console.error("Tidak dapat terhubung ke database:", error);
	}
}

testDbConnection();
