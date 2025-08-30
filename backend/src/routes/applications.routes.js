// routes/applicationRoutes.js
import express from "express";
import { createApplication, getApplicationsByJob, getUserApplications } from "../controllers/applicationController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Apply for a job
router.post("/:jobId", protect, createApplication);

// Get all applications for a specific job (employer only)
router.get("/job/:jobId", protect, getApplicationsByJob);

// Get all applications submitted by a user (job seeker)
router.get("/user/:userId", protect, getUserApplications);

export default router;
