import express from "express";
import {
  getUsers,
  getUserByEmail,
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/users", getUsers);
router.get("/users/:email", getUserByEmail);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/users/:email", updateUser);
router.delete("/", deleteUser);

export default router;
