import { Routes, Route } from "react-router-dom";
import Home from "./pages/Homelout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import PostJob from "./pages/PostJob";
import ProtectedRoute from "./components/ProtectedRoute";
import { GuestRoute } from "./components/GuestRoute";
import { RoleRoute } from "./components/RoleRoute";

function App() {
  return (
    <Routes>
      {/* Public page */}
      <Route path="/" element={<Homelout />} />
      <Route path="/Profile" element={<Profile />} />
      <Route path="/PostJob" element={<PostJob />} />
      <Route path="/Dashboard" element={<Dashboard />} />

      
    <Route
        path="/login"
        element={
          <GuestRoute>
            <Login />
          </GuestRoute>
        }
      />
      <Route
        path="/register"
        element={
          <GuestRoute>
            <Register />
          </GuestRoute>
        }
      />

      {/* Protected Routes (all authenticated users) */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* Post Job route (employer only) */}
      <Route
        path="/post-job"
        element={
          <ProtectedRoute>
            <RoleRoute allowedRoles={["employer"]}>
              <PostJob />
            </RoleRoute>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
