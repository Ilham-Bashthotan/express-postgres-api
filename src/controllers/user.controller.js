const userService = require("../services/user.service");
const AppError = require("../utils/AppError");

exports.create = async (req, res, next) => {
	try {
		const userData = req.body;
		const newUser = await userService.createUser(userData);
		res.status(201).json(newUser);
	} catch (error) {
		next(new AppError(error.message, 400));
	}
};

exports.findAll = async (req, res, next) => {
	try {
		const users = await userService.findAllUsers();
		res.status(200).json(users);
	} catch (error) {
		next(new AppError(error.message, 500));
	}
};

exports.findOne = async (req, res, next) => {
	try {
		const user = await userService.findUserById(req.params.id);
		if (!user) {
			return next(new AppError("User not found with that ID", 404));
		}
		res.status(200).json(user);
	} catch (error) {
		next(new AppError(error.message, 500));
	}
};

exports.update = async (req, res, next) => {
	try {
		const userId = req.params.id;
		const updateData = req.body;
		const updatedUser = await userService.updateUser(userId, updateData);
		res.status(200).json(updatedUser);
	} catch (error) {
		next(new AppError(error.message, 404));
	}
};

exports.delete = async (req, res, next) => {
	try {
		const userId = req.params.id;
		await userService.deleteUser(userId);
		res.status(204).send();
	} catch (error) {
		next(new AppError(error.message, 404));
	}
};
