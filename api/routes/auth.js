import express from "express";
import { login, registerAdmin, registerUser, resetPassword, sendEmail, successEmail } from "../controllers/auth.controller.js";

const router = express.Router();

//Register new User
router.post('/register', registerUser);

//Register Admin User
router.post("/register-admin", registerAdmin);

//Login user
router.post('/login', login);

//Request for Reset Email
router.post('/send-email', sendEmail);

//Request for Reset Password
router.post('/reset-password', resetPassword);

//E-mail for success
router.post('/success-email', successEmail);

export default router;