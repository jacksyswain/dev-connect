import { useState } from "react";
import API from "../api/axios";
import { useSelector } from "react-redux";

export default function PostJob() {
  const { user } = useSelector((state) => state.auth);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/jobs", {
        title,
        description,
        companyName,
        postedBy: user.name,
      });
      setSuccess("Job posted successfully!");
      setTitle("");
      setDescription("");
      setCompanyName("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Post a Job</h2>
      {success && <p className="text-green-500 mb-2">{success}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Job Title"
          className="border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Company Name"
          className="border p-2 rounded"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          required
        />
        <textarea
          placeholder="Job Description"
          className="border p-2 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded"
        >
          Post Job
        </button>
      </form>
    </div>
  );
}
