const userService = require('../services/user.service');
const AppError = require("../utils/AppError");

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

exports.findOne = async (req, res, next) => {
	try {
		const user = await userService.findUserById(req.params.id);
		if (!user) {
			// Delegasikan error operasional ke handler global
			return next(new AppError("User not found with that ID", 404));
		}
		res.status(200).json(user);
	} catch (error) {
		// Delegasikan error tak terduga ke handler global
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