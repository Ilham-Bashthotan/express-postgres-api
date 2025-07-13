const express = require("express");
const { authenticate } = require("../middlewares/auth.middleware");
const { authorize } = require("../middlewares/rbac.middleware");
const userController = require("../controllers/user.controller");
const router = express.Router();

router.post("/", userController.create);
router.get("/", userController.findAll);
router.get("/:id", userController.findOne);
router.put("/:id", userController.update);
// Hanya admin yang bisa menghapus pengguna
router.delete(
	"/:id",
	authenticate, // 1. Apakah pengguna sudah login?
	authorize(["admin"]), // 2. Apakah pengguna memiliki peran 'admin'?
	userController.delete
);

module.exports = router;
