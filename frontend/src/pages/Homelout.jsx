import Navbar from "../components/NavBar";
import { Link } from "react-router-dom";
import JobList from "../components/JobList";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <main className="flex-1 flex flex-col justify-center items-center text-center px-6 py-12">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Connect Employers and Job Seekers
        </h2>
        <p className="text-gray-600 mb-8 max-w-xl text-sm md:text-base">
          DevConnect is a platform to help employers find talented candidates and job seekers find
          their dream jobs seamlessly.
        </p>

        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-10">
          <Link
            to="/register"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
          >
            Join as Job Seeker
          </Link>
          <Link
            to="/register"
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition"
          >
            Join as Employer
          </Link>
          <Link
            to="/register"
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition"
          >
            Sign Up
          </Link>
        </div>

        {/* Job Listings Section */}
        <section className="w-full max-w-6xl">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-left">Latest Jobs</h3>
          <JobList />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white shadow-inner py-4 text-center text-gray-500">
        &copy; {new Date().getFullYear()} DevConnect. All rights reserved.
      </footer>
    </div>
  );
}
