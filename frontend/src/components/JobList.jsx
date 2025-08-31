import React, { useEffect, useState } from "react";
import api from "../api"; // your axios instance
import JobCard from "./JobCard";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get("/jobs"); // backend endpoint /api/jobs
        setJobs(res.data);
      } catch (err) {
        setError("Failed to fetch jobs. Try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) return <p className="text-center mt-4">Loading jobs...</p>;
  if (error) return <p className="text-center text-red-500 mt-4">{error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {jobs.length > 0 ? (
        jobs.map((job) => <JobCard key={job._id} job={job} />)
      ) : (
        <p className="text-gray-600 col-span-full text-center">
          No jobs available right now.
        </p>
      )}
    </div>
  );
};

export default JobList;
