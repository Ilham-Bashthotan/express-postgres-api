const express = require("express");
const userController = require("../controllers/user.controller");
const { authenticate } = require("../middlewares/auth.middleware");
const { authorize } = require("../middlewares/rbac.middleware");
const validateRequest = require("../middlewares/validate-request.middleware");
const { createUserSchema } = require("../validators/user.schema");
const regriterController = require("../controllers/regriter.controller");
const router = express.Router();

router.post("/", validateRequest(createUserSchema), userController.create);
// Register endpoint
router.post("/register", regriterController.register);
router.get("/", authenticate, userController.findAll);
router.get("/:id", userController.findOne);
router.put("/:id", userController.update);
router.delete(
	"/:id",
	authenticate,
	authorize(["admin", "user"]),
	userController.delete
);

module.exports = router;
