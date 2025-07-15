const authService = require("../services/auth.service");

exports.login = async (req, res) => {
	try {
		const { email, password } = req.body;

		// Validasi input
		if (!email || !password) {
			return res.status(400).json({
				message: "Email dan password harus diisi",
			});
		}

		// Panggil service untuk login
		const result = await authService.loginUser(email, password);

		res.status(200).json({
			status: "ok",
			statusCode: 200,
			message: "Login berhasil",
			data: result,
		});
	} catch (error) {
		if (error.message.includes("Authentication failed")) {
			res.status(401).json({
				message: "Email atau password salah",
			});
		} else {
			res.status(500).json({
				message: "Terjadi kesalahan saat login",
			});
		}
	}
};
