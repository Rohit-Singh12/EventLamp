"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";

export default function Authentcation() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(""); // New state for phone number
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showVerificationMessage, setShowVerificationMessage] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [resetToken, setResetToken] = useState("");
  const router = useRouter();

  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    //biswa edit .env url
    const API_BACKEND_URL = process.env.NEXT_PUBLIC_API_BACKEND_URL;

    // Validation for required fields
    if (!email || !password || (!isLogin && (!fullName || !phoneNumber))) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        // Login API Call
        const { data } = await axios.post(
          `${API_BACKEND_URL}/auth/login`,
          { email, password }
        );

        // Save user data to localStorage
        localStorage.setItem("user", JSON.stringify(data.user));

        // Redirect based on role
        const userRole = data.user.role; // Get role from the response
        if (userRole === "studioOwner") {
          router.push("/studio-owner/dashboard"); // Redirect to studio owner dashboard
        } else if (userRole === "user") {
          router.push("/"); // Redirect to user dashboard
        } else {
          router.push("/"); // Default fallback
        }
      } else {
        // Signup API Call (updated to include phoneNumber)
        const { data } = await axios.post(
          `${API_BACKEND_URL}/auth/register`,
          { name: fullName, email, password, phoneNumber } // Include phoneNumber
        );

        setShowVerificationMessage(true);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    if (!email) {
      setError("Email is required.");
      setLoading(false);
      return;
    }

    try {
      // Forgot Password API Call
      const { data } = await axios.post(
        `${API_BACKEND_URL}/auth/forgot-password`,
        { email }
      );

      setMessage("Password reset email sent. Check your inbox.");
      setShowForgotPassword(false);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    if (!newPassword) {
      setError("New password is required.");
      setLoading(false);
      return;
    }

    try {
      // Reset Password API Call
      const { data } = await axios.post(
        `${API_BACKEND_URL}/auth/reset-password/${resetToken}`,
        { newPassword }
      );

      setMessage("Password reset successful. You can now login.");
      setShowResetPassword(false);
      setIsLogin(true); // Redirect to login
    } catch (err) {
      setError(err.response?.data?.message || "Invalid or expired token.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Side (Form / Message) */}
      <div className="flex flex-col justify-center w-full  p-4">
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

          {showResetPassword ? (
            // Reset Password Form
            <>
              <h2 className="text-3xl font-semibold text-center">
                Reset Password
              </h2>
              <p className="text-center text-gray-500">
                Enter your new password below.
              </p>

              {error && (
                <p className="text-red-500 text-center mt-3">{error}</p>
              )}
              {message && (
                <p className="text-green-500 text-center mt-3">{message}</p>
              )}

              <form onSubmit={handleResetPassword} className="mt-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium">
                    New Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter your new password"
                    className="w-full px-4 py-3 mt-1 rounded-lg border focus:ring-2 focus:ring-blue-500"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
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
                  onClick={() => {
                    setShowResetPassword(false);
                    setIsLogin(true);
                  }}
                  className="text-blue-600 hover:underline font-semibold"
                  disabled={loading}
                >
                  Login
                </button>
              </p>
            </>
          ) : showForgotPassword ? (
            // Forgot Password Form
            <>
              <h2 className="text-3xl font-semibold text-center">
                Forgot Password
              </h2>
              <p className="text-center text-gray-500">
                Enter your email to reset your password.
              </p>

              {error && (
                <p className="text-red-500 text-center mt-3">{error}</p>
              )}
              {message && (
                <p className="text-green-500 text-center mt-3">{message}</p>
              )}

              <form onSubmit={handleForgotPassword} className="mt-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium">
                    Email address
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 mt-1 rounded-lg border focus:ring-2 focus:ring-blue-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                  {loading ? "Processing..." : "Send Reset Link"}
                </motion.button>
              </form>

              <p className="text-center text-gray-500 mt-4">
                Remember your password?{" "}
                <button
                  onClick={() => {
                    setShowForgotPassword(false);
                    setIsLogin(true);
                  }}
                  className="text-blue-600 hover:underline font-semibold"
                  disabled={loading}
                >
                  Login
                </button>
              </p>
            </>
          ) : !showVerificationMessage ? (
            // Login / Signup Form
            <>
              <h2 className="text-3xl font-semibold text-center">
                {isLogin ? "Sign in to" : "Sign up for"}{" "}
                <span className="text-blue-600 font-bold">EventLamp</span>
              </h2>
              <p className="text-center text-gray-500">
                {isLogin ? "Welcome back! Please log in." : "Join us today!"}
              </p>

              {error && (
                <p className="text-red-500 text-center mt-3">{error}</p>
              )}
              {message && (
                <p className="text-green-500 text-center mt-3">{message}</p>
              )}

              <form onSubmit={handleAuth} className="mt-6 space-y-4">
                {!isLogin && (
                  <>
                    <div>
                      <label className="block text-sm font-medium">
                        Full Name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your name"
                        className="w-full px-4 py-3 mt-1 rounded-lg border focus:ring-2 focus:ring-blue-500"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        disabled={loading}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="Enter your phone number"
                        className="w-full px-4 py-3 mt-1 rounded-lg border focus:ring-2 focus:ring-blue-500"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        disabled={loading}
                      />
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-sm font-medium">
                    Email address
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 mt-1 rounded-lg border focus:ring-2 focus:ring-blue-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Password</label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 mt-1 rounded-lg border focus:ring-2 focus:ring-blue-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                  {loading ? "Processing..." : isLogin ? "Sign in" : "Sign up"}
                </motion.button>
              </form>

              <p className="text-center text-gray-500 mt-4">
                {isLogin ? (
                  <>
                    Don't have an account?{" "}
                    <button
                      onClick={() => {
                        setIsLogin(false);
                        setShowVerificationMessage(false);
                        setMessage("");
                      }}
                      className="text-blue-600 hover:underline font-semibold"
                      disabled={loading}
                    >
                      Sign Up
                    </button>
                    <br />
                    Forgot your password?{" "}
                    <button
                      onClick={() => {
                        setShowForgotPassword(true);
                        setMessage("");
                      }}
                      className="text-blue-600 hover:underline font-semibold"
                      disabled={loading}
                    >
                      Reset Password
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <button
                      onClick={() => {
                        setIsLogin(true);
                        setShowVerificationMessage(false);
                        setMessage("");
                      }}
                      className="text-blue-600 hover:underline font-semibold"
                      disabled={loading}
                    >
                      Login
                    </button>
                  </>
                )}
              </p>
            </>
          ) : (
            // Verification Message
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-blue-600">
                Verification Link Sent!
              </h2>
              <p className="text-gray-600 mt-2">
                A verification link has been sent to{" "}
                <span className="font-semibold">{email}</span>. Please check
                your inbox to verify your account.
              </p>
              <button
                onClick={() => {
                  setIsLogin(true);
                  setShowVerificationMessage(false);
                  setMessage("");
                }}
                className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg"
                disabled={loading}
              >
                Go to Login
              </button>
            </div>
          )}
        </motion.div>
      </div>

      {/* Right Side (Logo & Info) */}
      <div className="hidden md:flex md:w-2/5 items-center justify-center bg-white">
        <div className="text-center">
          <Image
            src="/assets/images/auth/login.svg"
            alt="EventLamp Logo"
            width={250}
            height={250}
            className="mx-auto"
          />
          <h2 className="text-3xl font-extrabold mt-4 text-gray-800">
            Welcome to EventLamp
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Your ultimate solution for event management.
          </p>
        </div>
      </div>
    </div>
  );
}
