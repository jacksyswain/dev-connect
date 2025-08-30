import API from "../api/axios";
import { useSelector } from "react-redux";
import { useState,useEffect } from "react";

export default function Dashboard() {
  const { user } = useSelector((state) => state.auth);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await API.get("/jobs");
        setJobs(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleApply = async (jobId) => {
    try {
      await API.post(`/jobs/${jobId}/apply`, { userId: user.id });
      alert("Applied successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to apply.");
    }
  };

  if (loading) return <p>Loading jobs...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Jobs Feed</h1>
      {jobs.length === 0 ? (
        <p>No jobs available.</p>
      ) : (
        <div className="grid gap-4">
          {jobs.map((job) => (
            <div key={job._id} className="p-4 border rounded shadow flex flex-col gap-2">
              <h2 className="text-xl font-semibold">{job.title}</h2>
              <p>{job.description}</p>
              <p className="text-gray-500">Company: {job.companyName}</p>
              <p className="text-gray-500">Posted by: {job.postedBy}</p>
              {user.role === "jobseeker" && (
                <button
                  onClick={() => handleApply(job._id)}
                  className="bg-green-600 text-white p-2 rounded mt-2"
                >
                  Apply
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
