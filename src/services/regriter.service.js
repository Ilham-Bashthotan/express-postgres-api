// regriter.service.js
// Service logic for user registration

const { User } = require("../models");
const bcrypt = require("bcrypt");

async function registerUser({ username, email, password, role }) {
	const hashedPassword = await bcrypt.hash(password, 10);
	const user = await User.create({
		username,
		email,
		password: hashedPassword,
		role: role || "user",
	});
	return user;
}

module.exports = { registerUser };
