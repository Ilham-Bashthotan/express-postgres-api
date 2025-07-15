const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../models");

exports.loginUser = async (email, password) => {
	const user = await User.findOne({ where: { email } });
	if (!user) {
		throw new Error("Authentication failed. User not found.");
	}

	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) {
		throw new Error("Authentication failed. Invalid credentials.");
	}

	const payload = { userId: user.id, role: user.role }; // Tambahkan data non-sensitif lain jika perlu
	const token = jwt.sign(payload, process.env.JWT_SECRET, {
		expiresIn: "1h",
	});

	return { token, userId: user.id, name: user.name };
};
