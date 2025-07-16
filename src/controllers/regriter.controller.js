// regriter.controller.js
// Controller for user registration

const { registerUser } = require("../services/regriter.service");

async function register(req, res, next) {
	try {
		const { username, email, password, role } = req.body;
		const user = await registerUser({ username, email, password, role });
		res.status(201).json({ message: "User registered successfully", user });
	} catch (error) {
		next(error);
	}
}

module.exports = { register };
