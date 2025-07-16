const Joi = require("joi");

// Schema untuk create user
const createUserSchema = Joi.object({
	email: Joi.string().email().required().messages({
		"string.email": "Format email tidak valid",
		"string.empty": "Email tidak boleh kosong",
		"any.required": "Email wajib diisi",
	}),

	password: Joi.string().min(6).max(100).required().messages({
		"string.empty": "Password tidak boleh kosong",
		"string.min": "Password minimal 6 karakter",
		"string.max": "Password maksimal 100 karakter",
		"any.required": "Password wajib diisi",
	}),

	role: Joi.string().valid("admin", "user").default("user").messages({
		"any.only": "Role harus admin atau user",
	}),
});

module.exports = {
	createUserSchema,
};
