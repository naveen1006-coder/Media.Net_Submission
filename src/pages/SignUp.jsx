import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Mail,
  Lock,
  ArrowRight,
  AlertCircle,
  SunSnow,
  User,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import backgroundVideo from "../data/video.mp4";

/**
 * Sign Up Page - "/signup" route
 * Beautiful sign up form with Context-OS branding
 */
export function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      // In demo mode, just log them in with the provided credentials
      // In a real app, you would call a signup API here
      await login(email, password);
      navigate("/", { replace: true });
    } catch (err) {
      setError("Failed to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover z-0"
        style={{ minHeight: "100vh" }}
      >
        <source src={backgroundVideo} type="video/mp4" />
        {/* Fallback to black background if video doesn't load */}
      </video>
      {/* Dark overlay for better contrast */}
      <div className="fixed inset-0 bg-black/60 z-[1]"></div>

      <div className="relative z-10 max-w-md w-full p-6 animate-fade-in bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="text-center mb-5">
          <div className="flex justify-center mb-2.5">
            <div className="bg-blue-600/30 backdrop-blur-sm p-3 rounded-xl shadow-sm border border-blue-400/20">
              <SunSnow className="w-7 h-7 text-white" />
            </div>
          </div>
          <h1 className="text-xl font-bold text-white mb-1 font-serif">
            Create Your Account
          </h1>
          <p className="text-gray-300 text-xs font-sans">
            Join AD-ios to launch intelligent ad campaigns
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-500/20 backdrop-blur-sm border border-red-400/30 rounded-lg flex items-center gap-2 text-red-200 text-sm">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Sign Up Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {/* Name Input */}
          <div>
            <label
              htmlFor="name"
              className="block text-xs font-semibold text-gray-200 mb-1.5 font-sans"
            >
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full pl-9 pr-3 py-2.5 bg-white/10 backdrop-blur-sm border-2 border-blue-500/30 rounded-lg focus:border-blue-400 focus:outline-none transition-colors font-sans text-sm text-white placeholder-gray-400"
                autoComplete="name"
              />
            </div>
          </div>

          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-semibold text-gray-200 mb-1.5 font-sans"
            >
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-9 pr-3 py-2.5 bg-white/10 backdrop-blur-sm border-2 border-blue-500/30 rounded-lg focus:border-blue-400 focus:outline-none transition-colors font-sans text-sm text-white placeholder-gray-400"
                autoComplete="email"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-xs font-semibold text-gray-200 mb-1.5 font-sans"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                className="w-full pl-9 pr-3 py-2.5 bg-white/10 backdrop-blur-sm border-2 border-blue-500/30 rounded-lg focus:border-blue-400 focus:outline-none transition-colors font-sans text-sm text-white placeholder-gray-400"
                autoComplete="new-password"
              />
            </div>
          </div>

          {/* Confirm Password Input */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-xs font-semibold text-gray-200 mb-1.5 font-sans"
            >
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="w-full pl-9 pr-3 py-2.5 bg-white/10 backdrop-blur-sm border-2 border-blue-500/30 rounded-lg focus:border-blue-400 focus:outline-none transition-colors font-sans text-sm text-white placeholder-gray-400"
                autoComplete="new-password"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-400 text-white px-6 py-2.5 rounded-lg font-bold text-sm hover:from-blue-400 hover:to-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transform hover:-translate-y-0.5 font-sans"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Creating account...</span>
              </>
            ) : (
              <>
                <span>Sign Up</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Demo Hint */}
        <div className="mt-4 p-2.5 bg-blue-600/20 backdrop-blur-sm rounded-lg border border-blue-400/30">
          <p className="text-xs text-gray-300 text-center">
            <span className="font-semibold text-blue-300">Demo Mode:</span> Use
            any email/password to sign up
          </p>
        </div>

        {/* Sign In Link */}
        <div className="mt-4 text-center text-sm">
          <span className="text-gray-300">Already have an account? </span>
          <Link
            to="/login"
            className="text-blue-400 hover:text-blue-300 font-semibold"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
