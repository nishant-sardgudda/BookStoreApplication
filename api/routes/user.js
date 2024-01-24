import express from "express";
import { getAllUsers, getUserById } from "../controllers/user.controller.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//Route to get all users
router.get('/', verifyAdmin, getAllUsers);

//Route to get one user
router.get('/:id', verifyUser, getUserById);

export default router;