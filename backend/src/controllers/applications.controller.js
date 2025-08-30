// controllers/application.controller.js
import Application from "../models/Application.js";
import Job from "../models/Job.js";

// Apply for a job
export const applyJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { coverLetter } = req.body;

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    const application = new Application({
      job: jobId,
      applicant: req.user.id, // from auth middleware
      coverLetter,
    });

    await application.save();
    res.status(201).json({ message: "Application submitted", application });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all applications for logged-in user
export const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ applicant: req.user.id })
      .populate("job")
      .populate("applicant", "name email");

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Employer: Get applications for a specific job
export const getJobApplications = async (req, res) => {
  try {
    const { jobId } = req.params;
    const applications = await Application.find({ job: jobId })
      .populate("applicant", "name email skills")
      .populate("job", "title company");

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
