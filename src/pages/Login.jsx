import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Sparkles,
  Mail,
  Lock,
  ArrowRight,
  AlertCircle,
  Codesandbox,
  SunSnow,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import backgroundVideo from "../data/video.mp4";

/**
 * Login Page - "/login" route
 * Beautiful login form with Context-OS branding
 */
export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    setLoading(true);

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError("Invalid credentials. Please try again.");
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
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <div className="bg-blue-600/30 backdrop-blur-sm p-3 rounded-xl shadow-sm border border-blue-400/20">
              <SunSnow className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white mb-1 font-serif">
            Welcome Back
          </h1>
          <p className="text-gray-300 text-sm font-sans">
            Sign in to launch intelligent ad campaigns
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-500/20 backdrop-blur-sm border border-red-400/30 rounded-lg flex items-center gap-2 text-red-200 text-sm">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-200 mb-1.5 font-sans"
            >
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-2.5 bg-white/10 backdrop-blur-sm border-2 border-blue-500/30 rounded-lg focus:border-blue-400 focus:outline-none transition-colors font-sans text-white placeholder-gray-400"
                autoComplete="email"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-200 mb-1.5 font-sans"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full pl-10 pr-4 py-2.5 bg-white/10 backdrop-blur-sm border-2 border-blue-500/30 rounded-lg focus:border-blue-400 focus:outline-none transition-colors font-sans text-white placeholder-gray-400"
                autoComplete="current-password"
              />
            </div>
          </div>

          {/* Remember & Forgot */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center cursor-pointer">
              <input type="checkbox" className="w-4 h-4 mr-2 accent-blue-500" />
              <span className="text-gray-300">Remember me</span>
            </label>
            <button
              type="button"
              className="text-blue-400 hover:text-blue-300 font-medium"
            >
              Forgot password?
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold text-base hover:from-blue-500 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transform hover:-translate-y-0.5 font-sans"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        {/* Demo Hint */}
        <div className="mt-4 p-3 bg-blue-600/20 backdrop-blur-sm rounded-lg border border-blue-400/30">
          <p className="text-xs text-gray-300 text-center">
            <span className="font-semibold text-blue-300">Demo Mode:</span> Use
            any email/password to sign in
          </p>
        </div>

        {/* Sign Up Link */}
        <div className="mt-4 text-center text-sm">
          <span className="text-gray-300">Don't have an account? </span>
          <button
            onClick={() => navigate("/signup")}
            className="text-blue-400 hover:text-blue-300 font-semibold"
          >
            Create one now
          </button>
        </div>
      </div>
    </div>
  );
}
