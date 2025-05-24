import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { CheckCircleIcon, XCircleIcon, Loader2Icon } from "lucide-react";
import "../../app/globals.css";

export default function Verify() {
  const router = useRouter();
  const { token } = router.query; // Get token from URL

  const [status, setStatus] = useState("loading"); // "loading", "success", "error"
  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    if (token) {
      verifyEmail();
    } else {
      setStatus("error");
      setMessage("Invalid verification link.");
    }
  }, [token]);

  const verifyEmail = async () => {
    try {
      const res = await fetch(
        `${API_BACKEND_URL}/auth/activate/${token}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setStatus("success");
      setMessage("Your email has been successfully verified!");
    } catch (error) {
      setStatus("error");
      setMessage(error.message || "Something went wrong.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <motion.div
        className="bg-white p-10 shadow-xl rounded-lg max-w-md text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {status === "loading" ? (
          <motion.div
            className="flex flex-col items-center"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          >
            <Loader2Icon size={50} className="text-blue-500 animate-spin" />
            <p className="mt-4 text-gray-600">{message}</p>
          </motion.div>
        ) : status === "success" ? (
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <CheckCircleIcon size={60} className="text-green-500" />
            <h2 className="text-2xl font-semibold text-green-600 mt-4">
              Email Verified!
            </h2>
            <p className="mt-2 text-gray-600">{message}</p>
            <button
              onClick={() => router.push("/auth")}
              className="mt-6 px-6 py-2 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition"
            >
              Go to Login
            </button>
          </motion.div>
        ) : (
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <XCircleIcon size={60} className="text-red-500" />
            <h2 className="text-2xl font-semibold text-red-600 mt-4">
              Verification Failed
            </h2>
            <p className="mt-2 text-gray-600">{message}</p>
            <button
              onClick={() => router.push("/auth")}
              className="mt-6 px-6 py-2 bg-red-600 text-white font-medium rounded-lg shadow hover:bg-red-700 transition"
            >
              Try Again
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
