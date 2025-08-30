// routes/userRoutes.js
import express from "express";
import { getUserProfile, updateUserProfile, getAllUsers } from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Get a user profile
router.get("/:id", protect, getUserProfile);

// Update user profile (job seeker or employer can edit their info)
router.put("/:id", protect, updateUserProfile);

// Get all users (admin/debug)
router.get("/", protect, getAllUsers);

export default router;
