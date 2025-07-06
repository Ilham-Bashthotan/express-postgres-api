const express = require('express');
const db = require('./src/models'); // Impor dari folder models
const userRoutes = require('./src/routes/user.routes');
const app = express();
const port = process.env.PORT || 3000;

// Middleware untuk mem-parsing request body JSON
app.use(express.json());

// Middleware untuk mem-parsing request body URL-encoded
app.use(express.urlencoded({ extended: true }));

// Route sederhana untuk pengujian awal
app.get('/', (req, res) => {
    res.json({ message: 'Selamat datang di API aplikasi.' });
});

app.use('/api/users', userRoutes);


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Terjadi kesalahan pada server!');
});

// Mendaftarkan user routes dengan prefiks /api/users

// Sinkronisasi database (opsional, lebih baik menggunakan migrasi di produksi)
// db.sequelize.sync();
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});

// Uji koneksi database
async function testDbConnection() {
    try {
        await db.sequelize.authenticate();
        console.log('Koneksi ke database berhasil terkoneksi.');
    } catch (error) {
        console.error('Tidak dapat terhubung ke database:', error);
    }
}

testDbConnection();

// Mendaftarkan user routes dengan prefiks /api/users

// Sinkronisasi database (opsional, lebih baik menggunakan migrasi di produksi)
// db.sequelize.sync();

