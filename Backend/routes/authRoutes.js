import express from "express";
import {
  register,
  activateAccount,
  login,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js"; // Ensure the file extension (.js) is included

const router = express.Router();

router.post("/register", register);
router.get("/activate/:token", activateAccount);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
