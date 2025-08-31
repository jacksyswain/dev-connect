// src/components/JobCard.jsx
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const JobCard = ({ job }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleApply = () => {
    if (!user) {
      // Redirect to login if not logged in
      navigate("/login", { state: { from: `/jobs/${job._id}` } });
    } else {
      // TODO: Add your "apply job" API logic here
      alert(`Applied to ${job.title} at ${job.company}!`);
    }
  };

  return (
    <div className="border rounded-xl p-4 shadow-md bg-white hover:shadow-lg transition">
      <h2 className="text-xl font-semibold">{job.title}</h2>
      <p className="text-gray-600 mt-1">{job.company}</p>
      <p className="text-sm text-gray-500">{job.location}</p>

      {job.salary && (
        <p className="mt-1 text-green-600 font-medium">₹ {job.salary}</p>
      )}

      <p className="mt-3 text-gray-700 line-clamp-3">{job.description}</p>

      <button
        onClick={handleApply}
        className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Apply Now
      </button>
    </div>
  );
};

export default JobCard;
