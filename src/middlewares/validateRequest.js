const Joi = require("joi");
const validateRequest = (schema, property = "body") => {
	return (req, res, next) => {
		const { error } = schema.validate(req[property], {
			abortEarly: false, // Laporkan semua kesalahan, bukan hanya yang pertama
			stripUnknown: true, // Hapus properti yang tidak ada dalam skema
		});
        
		if (error) {
			const errorDetails = error.details.map((detail) => detail.message);
			// Nanti kita akan refactor ini untuk menggunakan error handler terpusat
			return res.status(400).json({ errors: errorDetails });
		}

		// Ganti data asli dengan data yang telah divalidasi (termasuk koersi tipe & nilai default)
		req[property] = value;
		return next();
	};
};
module.exports = validateRequest;
