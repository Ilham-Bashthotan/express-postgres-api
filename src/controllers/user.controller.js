const userService = require("../services/user.service");

exports.create = async (req, res, next) => {
	try {
		const userData = req.body;
		const newUser = await userService.createUser(userData);

		res.status(201).json({
			status: "ok",
			statusCode: 201,
			message: "Data pengguna berhasil dibuat",
			data: newUser,
		});
	} catch (error) {
		// res.status(500).json({ message: error.message });
		next(error);
	}
};

exports.findAll = async (req, res) => {
	try {
		const users = await userService.findAllUsers();

		res.status(200).json({
			status: "ok",
			statusCode: 200,
			message: "Data pengguna berhasil diambil",
			data: users,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.findOne = async (req, res) => {
	try {
		const userId = req.params.id;
		const user = await userService.findUserById(userId);

		if (user) {
			res.status(200).json({
				status: "ok",
				statusCode: 200,
				message: "Data pengguna berhasil diambil",
				data: user,
			});
		} else {
			res.status(404).json({
				message: `Pengguna dengan id=${userId} tidak ditemukan.`,
			});
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.update = async (req, res) => {
	try {
		const userId = req.params.id;
		const updateData = req.body;
		const updatedUser = await userService.updateUser(userId, updateData);

		res.status(200).json({
			status: "ok",
			statusCode: 200,
			message: "Data pengguna berhasil diubah",
			data: updatedUser,
		});
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

exports.delete = async (req, res) => {
	try {
		const userId = req.params.id;

		await userService.deleteUser(userId);

		res.status(200).json({
			status: "ok",
			statusCode: 200,
			message: "Data pengguna berhasil dihapus",
		}); // 204 No Content adalah respons standar untuk delete yang sukses
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};
