const AppError = require("../utils/AppError"); // Akan dibuat di Bab 10
const authorize = (requiredRoles) => {
	return (req, res, next) => {
		// Middleware ini berasumsi middleware otentikasi sudah berjalan sebelumnya
		const { role } = req.user;

		if (!requiredRoles.includes(role)) {
			// Teruskan error ke error handler terpusat
			return next(
				new AppError(
					"Forbidden: You do not have permission to perform this action.",
					403
				)
			);
		}

		next();
	};
};
module.exports = { authorize };
