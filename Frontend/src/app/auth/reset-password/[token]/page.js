"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { motion } from "framer-motion";

export default function ResetPassword({ params }) {
  const router = useRouter();
  let token = params.token;

  // Get the reset token from the URL

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    // Validate inputs
    if (!newPassword || !confirmPassword) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      // Reset Password API Call
      //const { data } = await axios.post(
        //`http://localhost:5000/api/v1/auth/reset-password/${token}`,
       // { newPassword }
     // );

      // Reset Password API Call
      const { data } = await axios.post(
        `${API_BACKEND_URL}/auth/reset-password/${token}`,
        { newPassword }
      );

      setMessage("Password reset successful. You can now login.");
      setTimeout(() => {
        router.push("/auth"); // Redirect to login page after successful reset
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid or expired token.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Reset Password Form */}
      <div className="flex flex-col justify-center w-full md:w-3/5 p-12">
        <motion.div
          className="w-full max-w-md mx-auto bg-white shadow-lg rounded-2xl p-8 relative"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* Loading Progress Bar */}
          {loading && (
            <motion.div
              className="absolute top-0 left-0 w-full h-1 bg-blue-600"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          )}

          <h2 className="text-3xl font-semibold text-center">Reset Password</h2>
          <p className="text-center text-gray-500">
            Enter your new password below.
          </p>

          {error && <p className="text-red-500 text-center mt-3">{error}</p>}
          {message && (
            <p className="text-green-500 text-center mt-3">{message}</p>
          )}

          <form onSubmit={handleResetPassword} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium">New Password</label>
              <input
                type="password"
                placeholder="Enter your new password"
                className="w-full px-4 py-3 mt-1 rounded-lg border focus:ring-2 focus:ring-blue-500"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm your new password"
                className="w-full px-4 py-3 mt-1 rounded-lg border focus:ring-2 focus:ring-blue-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
              />
            </div>

            <motion.button
              whileHover={{ scale: !loading ? 1.05 : 1 }}
              whileTap={{ scale: !loading ? 0.95 : 1 }}
              type="submit"
              className={`w-full py-3 rounded-lg mt-4 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
              disabled={loading}
            >
              {loading ? "Processing..." : "Reset Password"}
            </motion.button>
          </form>

          <p className="text-center text-gray-500 mt-4">
            Remember your password?{" "}
            <button
              onClick={() => router.push("/login")}
              className="text-blue-600 hover:underline font-semibold"
              disabled={loading}
            >
              Login
            </button>
          </p>
        </motion.div>
      </div>

      {/* Right Side (Logo & Info) */}
      <div className="hidden md:flex md:w-2/5 items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold mt-4 text-gray-800">
            Welcome to Amilo AI
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            AI-powered solutions for smarter real estate decisions.
          </p>
        </div>
      </div>
    </div>
  );
}
