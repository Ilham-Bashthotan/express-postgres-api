const userService = require('../services/user.service');
exports.create = async (req, res) => {
    try {
        // 1. Ekstrak data dari request body
        const userData = req.body;

        // 2. Panggil service untuk membuat pengguna baru
        const newUser = await userService.createUser(userData);

        // 3. Kirim respons sukses dengan status 201 (Created)
        res.status(201).json(newUser);

    } catch (error) {
        // Jika terjadi error di service, kirim respons error
        next(error);
    }
};

exports.findAll = async (req, res) => {
    try {
        const users = await userService.findAllUsers();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

exports.findOne = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await userService.findUserById(userId);

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: `Pengguna dengan id=${userId} tidak ditemukan.` });
        }
    } catch (error) {
        next(error);
    }
};

exports.update = async (req, res) => {
    try {
        const userId = req.params.id;
        const updateData = req.body;
        const updatedUser = await userService.updateUser(userId, updateData);

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const userId = req.params.id;

        await userService.deleteUser(userId);
        res.status(204).send(); // 204 No Content adalah respons standar untuk delete yang sukses
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};