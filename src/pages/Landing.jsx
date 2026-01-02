import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Codesandbox, User, LogOut, SunSnow } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import demoData from "../data/demo_data.json";
import backgroundVideo from "../data/video.mp4";

/**
 * Landing Page - "/" route
 * Centered card with URL input and CTA button
 */
export function Landing() {
  const [url, setUrl] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleAnalyze = () => {
    if (!url.trim()) return;

    // Check if it's a demo shortcut
    let finalUrl = url.trim();
    if (demoData[finalUrl]) {
      finalUrl = demoData[finalUrl];
    }

    // Navigate to workspace with URL as state
    navigate("/workspace", { state: { url: finalUrl } });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAnalyze();
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="h-screen flex items-center justify-center p-4 relative overflow-hidden">
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
      <div className="fixed inset-0 bg-black/50 z-[1]"></div>

      {/* Logo and Title - Top Left */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-3">
        <div className="bg-white/10 backdrop-blur-xl p-2.5 rounded-xl shadow-sm border border-white/20">
          <SunSnow className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white font-serif">AD-ios</h1>
        </div>
      </div>

      {/* User Menu */}
      <div className="absolute top-4 right-4 z-20">
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:border-blue-400 transition-colors shadow-sm text-white"
          >
            <User className="w-4 h-4 text-blue-300" />
            <span className="text-sm font-medium text-white">
              {user?.email}
            </span>
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white/10 backdrop-blur-xl rounded-lg shadow-lg border border-white/20 py-1 z-50">
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-left text-sm text-white hover:bg-white/10 flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="max-w-2xl w-full p-6 md:p-8 animate-fade-in bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl relative z-10">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 font-serif">
            Turn Your Website into{" "}
            <span className="text-blue-300">Ads. Instantly.</span>
          </h1>
          <p className="text-base text-gray-300 font-sans">
            Enter your website URL and let our AI analyze your content to create
            high-converting contextual ad campaigns.
          </p>
        </div>

        {/* URL Input */}
        <div className="space-y-3">
          <div>
            <label
              htmlFor="url-input"
              className="block text-sm font-medium text-gray-200 mb-1.5 font-sans"
            >
              Enter Website URL
            </label>
            <input
              id="url-input"
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="try 'mikes-coffee.com' or 'fashion-store.com'"
              className="w-full px-4 py-2.5 bg-white/10 backdrop-blur-sm border-2 border-blue-500/30 rounded-lg focus:border-blue-400 focus:outline-none transition-colors text-base font-sans text-white placeholder-gray-400"
            />
          </div>

          {/* Demo hints */}
          <div className="text-sm text-gray-300 font-sans">
            <p className="mb-1.5">Demo shortcuts:</p>
            <div className="flex flex-wrap gap-2">
              {Object.keys(demoData).map((key) => (
                <button
                  key={key}
                  onClick={() => setUrl(key)}
                  className="px-3 py-1 bg-blue-600/20 backdrop-blur-sm text-blue-50 rounded-md hover:bg-blue-600/30 border border-blue-400/20 transition-colors font-medium"
                >
                  {key}
                </button>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={handleAnalyze}
            disabled={!url.trim()}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-400 text-white px-6 py-3 rounded-lg font-bold text-base hover:from-blue-400 hover:to-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2 shadow-lg shadow-blue-400/50 hover:shadow-blue-400/70 transform hover:-translate-y-0.5 font-sans"
          >
            <span className="text-white font-bold">Analyze Context</span>
            <ArrowRight className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Features */}
        <div className="mt-6 grid grid-cols-3 gap-4 text-center font-sans">
          <div className="p-2">
            <div className="text-2xl font-bold text-blue-300 mb-1 font-sans">
              60s
            </div>
            <div className="text-xs text-gray-300">Setup Time</div>
          </div>
          <div className="p-2 border-l border-white/20 border-r">
            <div className="text-2xl font-bold text-blue-300 mb-1 font-sans">
              AI
            </div>
            <div className="text-xs text-gray-300">Powered</div>
          </div>
          <div className="p-2">
            <div className="text-2xl font-bold text-blue-300 mb-1 font-sans">
              $10
            </div>
            <div className="text-xs text-gray-300">Min Budget</div>
          </div>
        </div>
      </div>
    </div>
  );
}
