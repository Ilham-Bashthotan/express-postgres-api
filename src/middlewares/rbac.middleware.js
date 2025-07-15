const AppError = require("../utils/AppError"); // Akan dibuat di Bab 10

const authorize = (requiredRoles) => {
	return (req, res, next) => {
		// Middleware ini berasumsi middleware otentikasi sudah berjalan sebelumnya
		const { role } = req.user;

		if (!requiredRoles.includes(role)) {
			// Teruskan error ke error handler terpusat
			return res.status(403).json({
				status: "fail",
				statusCode: 403,
				message:
					"Akses ditolak. Anda tidak memiliki izin untuk mengakses resource ini.",
			});
		}

		next();
	};
};

module.exports = { authorize };
