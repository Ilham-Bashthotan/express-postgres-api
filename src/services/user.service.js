const db = require('../models');
const User = db.User;

exports.createUser = async (userData) => {
    const { name, email, password } = userData;

    // Logika bisnis/validasi sederhana
    if (!name ||!email ||!password) {
        throw new Error('Nama, email, dan password harus diisi.');
    }

    // Interaksi dengan database menggunakan model Sequelize
    // Di sini bisa ditambahkan logika hashing password sebelum create
    const newUser = await User.create({ name, email, password });
    return newUser;
};

exports.findAllUsers = async () => {
    const users = await User.findAll();
    return users;
};

exports.findUserById = async (id) => {
    const user = await User.findByPk(id); // findByPk adalah singkatan dari findByPrimaryKey
    return user;
};

exports.updateUser = async (id, updateData) => {
    const [num] = await User.update(updateData, {
        where: { id: id }
    });
    if (num == 1) {
        // Jika update berhasil, ambil dan kembalikan data terbaru
        const updatedUser = await User.findByPk(id);

        return updatedUser;
    } else {
        throw new Error(`Tidak dapat memperbarui pengguna dengan id=${id}. Mungkin pengguna tidak di temukan atau data tidak berubah.`);
    }
};

exports.deleteUser = async (id) => {
    const num = await User.destroy({
        where: { id: id }
    });
    if (num!= 1) {
        throw new Error(`Tidak dapat menghapus pengguna dengan id=${id}. Mungkin pengguna tidak ditemukan.`);
    }
    // Tidak perlu mengembalikan apa pun karena penghapusan berhasil
};
