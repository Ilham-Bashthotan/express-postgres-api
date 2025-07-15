const Joi = require("joi");

// Schema untuk create user
const createUserSchema = Joi.object({
	name: Joi.string().min(2).max(50).required().messages({
		"string.empty": "Nama tidak boleh kosong",
		"string.min": "Nama minimal 2 karakter",
		"string.max": "Nama maksimal 50 karakter",
		"any.required": "Nama wajib diisi",
	}),

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
