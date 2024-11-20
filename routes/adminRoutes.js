const express = require("express");
const { assignRole, deleteUser } = require("../controllers/adminController");
const { authenticateToken } = require("../middlewares/authMiddleware");
const { authorizeRole } = require("../middlewares/roleMiddleware");

const router = express.Router();

router.post(
  "/assign-role",
  authenticateToken,
  authorizeRole("Admin"),
  assignRole
);
router.delete(
  "/user/:id",
  authenticateToken,
  authorizeRole("Admin"),
  deleteUser
);

module.exports = router;
