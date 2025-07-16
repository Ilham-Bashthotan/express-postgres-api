const AppError = require("../utils/AppError");

const authorize = (requiredRoles) => {
	return (req, res, next) => {
		// Middleware ini berasumsi middleware otentikasi sudah berjalan sebelumnya
		const { role } = req.user;

		if (!requiredRoles.includes(role)) {
			// Teruskan error ke error handler terpusat
			return next(
				new AppError(
					"Akses ditolak. Anda tidak memiliki izin untuk mengakses resource ini.",
					403
				)
			);
		}

		next();
	};
};

module.exports = { authorize };
