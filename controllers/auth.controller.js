import bcryptjs from "bcryptjs";
import crypto from "crypto";

import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import {
  sendPasswordResetEmail,
  sendResetSuccessEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
} from "../mailtrap/emails.js";
import { User } from "../models/user.model.js";

export const signup = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    console.log("📝 Signup attempt:", { email, name });

    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const userAlreadyExists = await User.findOne({ email });

    if (userAlreadyExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

    const user = new User({
      email,
      password: hashedPassword,
      name,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });

    await user.save();
    console.log("✅ User created:", user.email);

    generateTokenAndSetCookie(res, user._id);

    // TRY to send email, but show in console if it fails
    let emailSent = false;
    try {
      await sendVerificationEmail(user.email, verificationToken);
      console.log("✅ Verification email sent successfully");
      emailSent = true;
    } catch (emailError) {
      console.log("⚠️  Email sending failed - Showing code in console instead");
    }

    // Always show code in console for easy testing
    if (!emailSent) {
      console.log("\n" + "=".repeat(60));
      console.log("🔐 VERIFICATION CODE");
      console.log("=".repeat(60));
      console.log("📧 Email:", email);
      console.log("🔢 Code:", verificationToken);
      console.log("⏰ Expires:", new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleString());
      console.log("=".repeat(60) + "\n");
    }

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.error("❌ Signup error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Error signing up",
    });
  }
};

export const verifyEmail = async (req, res) => {
  const { code } = req.body;
  
  try {
    console.log("🔍 Verifying email with code:", code);

    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification code",
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    console.log("✅ Email verified for:", user.email);

    try {
      await sendWelcomeEmail(user.email, user.name);
      console.log("✅ Welcome email sent");
    } catch (emailError) {
      console.log("⚠️  Welcome email skipped (Mailtrap not configured)");
    }

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.error("❌ Verify email error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    console.log("🔐 Login attempt:", email);

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    generateTokenAndSetCookie(res, user._id);

    user.lastLogin = new Date();
    await user.save();

    console.log("✅ Login successful:", email);

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  
  try {
    console.log("🔑 Forgot password request:", email);

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000;

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAt;

    await user.save();

    const resetURL = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    try {
      await sendPasswordResetEmail(user.email, resetURL);
      console.log("✅ Password reset email sent");
    } catch (emailError) {
      console.log("\n" + "=".repeat(60));
      console.log("🔗 PASSWORD RESET LINK");
      console.log("=".repeat(60));
      console.log("📧 Email:", email);
      console.log("🔗 Link:", resetURL);
      console.log("⏰ Expires in: 1 hour");
      console.log("=".repeat(60) + "\n");
    }

    res.status(200).json({
      success: true,
      message: "Password reset link sent to your email",
    });
  } catch (error) {
    console.error("❌ Forgot password error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    console.log("🔄 Reset password attempt");

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset token",
      });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();

    console.log("✅ Password reset successful for:", user.email);

    try {
      await sendResetSuccessEmail(user.email);
    } catch (emailError) {
      console.log("⚠️  Reset success email skipped");
    }

    res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    console.error("❌ Reset password error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("❌ Check auth error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};