import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import sendEmail from "../utils/sendMail.js";

// 🔹 Register User with Activation Email
export const register = async (req, res) => {
  try {
    const { name, email, password, phoneNumber, role = "user" } = req.body;

    // Validate required fields
    if (!name || !email || !password || !phoneNumber) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password.trim(), 10);

    // Create activation token
    const activationToken = jwt.sign(
      { name, email, password: hashedPassword, phoneNumber, role }, // Include phoneNumber
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Send activation email
    const activationLink = `${process.env.CLIENT_URL}/verify/${activationToken}`;
    await sendEmail(
      email,
      "Activate Your Account",
      `Click here to activate your account: ${activationLink}`
    );

    res.status(201).json({
      message: "Check your email for the activation link.",
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
};

// 🔹 Activate Account (After Email Verification)
export const activateAccount = async (req, res) => {
  try {
    const { token } = req.params;

    // Verify the activation token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if user already exists
    let user = await User.findOne({ email: decoded.email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user with phoneNumber
    user = new User({
      name: decoded.name,
      email: decoded.email,
      password: decoded.password,
      phoneNumber: decoded.phoneNumber, // Include phoneNumber
      role: decoded.role,
    });

    // Save the user to the database
    await user.save();

    res.json({ message: "Account activated successfully" });
  } catch (error) {
    console.error("Activation error:", error);
    res.status(500).json({ message: "Invalid or expired token" });
  }
};

// 🔹 Login User
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Return success response with user data
    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber, // Include phoneNumber in response
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};

// 🔹 Forgot Password - Send Reset Link
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Validate required fields
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Generate reset token
    const resetToken = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    // Save reset token and expiration time
    user.resetToken = resetToken;
    user.resetTokenExpires = Date.now() + 15 * 60 * 1000;
    await user.save();

    // Send reset password email
    const resetLink = `${process.env.CLIENT_URL}/auth/reset-password/${resetToken}`;
    await sendEmail(
      email,
      "Reset Password",
      `Click here to reset your password: ${resetLink}`
    );

    res.json({ message: "Password reset email sent" });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ message: "Server error during forgot password" });
  }
};

// 🔹 Reset Password - Update in Database
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    // Validate required fields
    if (!newPassword) {
      return res.status(400).json({ message: "New password is required" });
    }

    // Verify the reset token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by email, reset token, and check expiration
    let user = await User.findOne({
      email: decoded.email,
      resetToken: token,
      resetTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Hash the new password and clear reset token
    user.password = await bcrypt.hash(newPassword.trim(), 10);
    user.resetToken = "";
    user.resetTokenExpires = null;
    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ message: "Invalid or expired token" });
  }
};
