import express from "express";
import Role from "../models/Role.js";
import { createRole, deleteRole, getAllRoles, updateRole } from "../controllers/role.controller.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//POST request to create a new role in DB
router.post('/create', verifyAdmin, createRole);

//Update the existing role in DB
router.put('/update/:id', verifyAdmin, updateRole);

//Get all roles from DB
router.get('/getAll', getAllRoles);

//Delete role from DB
router.delete('/deleteRole/:id', deleteRole);

export default router;