import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Pill } from "../components/Pill";
import { AdPreview } from "../components/AdPreview";
import { BudgetCard } from "../components/BudgetCard";
import { StepList } from "../components/StepList";
import { generateContext } from "../utils/contextGenerator";
import { calculateMetrics } from "../utils/budgetCalculator";
import { useAuth } from "../contexts/AuthContext";
import { Codesandbox, ArrowLeft, LogOut, SunSnow, Trash2 } from "lucide-react";
import backgroundVideo from "../data/video.mp4";

/**
 * Workspace Page - "/workspace" route
 * Two columns: Intelligence (left) + Controls (right)
 */
export function Workspace() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const url = location.state?.url || "example.com";

  // Processing state
  const [isProcessing, setIsProcessing] = useState(true);
  const [processingStep, setProcessingStep] = useState(0);

  // Context data
  const [context, setContext] = useState(null);

  // User selections
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [publisherMix, setPublisherMix] = useState("premium"); // 'premium' or 'niche'
  const [budget, setBudget] = useState(100);
  const [headline, setHeadline] = useState("");
  const [description, setDescription] = useState("");
  const [ctr, setCtr] = useState(0.015); // Default 1.5%

  // Budget metrics
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    // TEMPORARILY DISABLED - Keep page in processing state for UI work
    // Uncomment below to enable processing completion
    const steps = [0, 1, 2, 3];
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < steps.length) {
        setProcessingStep(steps[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(interval);
        const generated = generateContext(url);
        setContext(generated);
        setHeadline(generated.suggestedHeadline);
        setDescription(generated.suggestedDescription);
        setSelectedTopics(generated.topics.slice(0, 3));
        setIsProcessing(false);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [url]);

  useEffect(() => {
    if (!isProcessing) {
      const calculated = calculateMetrics(budget, publisherMix, ctr);
      setMetrics(calculated);
    }
  }, [budget, publisherMix, ctr, isProcessing]);

  const toggleTopic = (topic) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const handleLaunch = () => {
    navigate("/launch", {
      state: {
        url,
        selectedTopics,
        publisherMix,
        budget,
        headline,
        description,
        metrics,
        warnings: context?.warnings || [],
      },
    });
  };

  if (isProcessing) {
    return (
      <div className="h-screen flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src={backgroundVideo} type="video/mp4" />
          {/* Fallback to black background if video doesn't load */}
        </video>
        {/* Dark overlay for better contrast */}
        <div className="absolute inset-0 bg-black/50 z-[1]"></div>

        <div className="max-w-lg w-full p-10 animate-fade-in bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl relative z-10">
          <div className="flex justify-center mb-8">
            <div className="bg-blue-600/30 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-blue-400/20 animate-pulse">
              <SunSnow className="w-10 h-10 text-white" />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-white mb-3 text-center font-serif">
            Analyzing Context
          </h2>
          <p className="text-lg text-gray-300 mb-10 text-center font-sans">
            Processing content for{" "}
            <span className="text-blue-300 font-medium">{url}</span>
          </p>
          <StepList currentStep={processingStep} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-28 relative overflow-hidden">
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
      {/* Dark overlay */}
      <div className="fixed inset-0 bg-black/60 z-[1]"></div>

      {/* Header */}
      <div className="bg-white/10 backdrop-blur-xl border-b border-white/20 px-4 py-4 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate("/")}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-300" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-white font-serif flex items-center gap-2">
                <SunSnow className="w-5 h-5 text-white" />
                AD-ios
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-sm font-medium text-gray-200 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">
              {url}
            </div>
            <button
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="p-2 hover:bg-white/10 rounded-full transition-colors group"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4 text-gray-300 group-hover:text-red-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* LEFT COLUMN - Intelligence */}
          <div className="space-y-6 flex flex-col">
            {/* Detected Topics */}
            <div className="p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold font-serif text-white">
                  Detected Topics
                </h2>
                <span className="text-xs font-medium text-blue-300 bg-blue-600/30 backdrop-blur-sm px-2 py-1 rounded border border-blue-400/20">
                  AI Generated
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {context?.topics.map((topic, index) => (
                  <Pill
                    key={index}
                    text={topic}
                    isSelected={selectedTopics.includes(topic)}
                    onClick={() => toggleTopic(topic)}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-300 mt-4 font-sans">
                Select relevant topics to refine targeting
              </p>
            </div>

            {/* Publisher Mix */}
            <div className="p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl">
              <h2 className="text-xl font-semibold mb-4 font-serif text-white">
                Publisher Mix
              </h2>
              <div className="space-y-3">
                <label
                  className={`flex items-center space-x-3 cursor-pointer p-3 rounded-lg border transition-all ${
                    publisherMix === "premium"
                      ? "border-blue-400 bg-blue-600/30 backdrop-blur-sm"
                      : "border-white/20 hover:bg-white/10"
                  }`}
                >
                  <input
                    type="radio"
                    name="publisher"
                    value="premium"
                    checked={publisherMix === "premium"}
                    onChange={(e) => setPublisherMix(e.target.value)}
                    className="w-5 h-5 text-blue-500 accent-blue-500"
                  />
                  <div>
                    <div className="font-medium text-white">Premium News</div>
                    <div className="text-sm text-gray-300">
                      Tier 1 publishers, high trust (CPM × 1.6)
                    </div>
                  </div>
                </label>

                <label
                  className={`flex items-center space-x-3 cursor-pointer p-3 rounded-lg border transition-all ${
                    publisherMix === "niche"
                      ? "border-blue-400 bg-blue-600/30 backdrop-blur-sm"
                      : "border-white/20 hover:bg-white/10"
                  }`}
                >
                  <input
                    type="radio"
                    name="publisher"
                    value="niche"
                    checked={publisherMix === "niche"}
                    onChange={(e) => setPublisherMix(e.target.value)}
                    className="w-5 h-5 text-blue-500 accent-blue-500"
                  />
                  <div>
                    <div className="font-medium text-white">Niche Blogs</div>
                    <div className="text-sm text-gray-300">
                      Highly specific audiences (CPM × 0.7)
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* CTR Testing */}
            <div className="px-6 py-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl flex-1 flex flex-col">
              <h2 className="text-xl font-semibold mb-4 font-serif text-white">
                CTR Assumption
              </h2>
              <div className="flex gap-4 flex-1 items-start">
                {[
                  { value: 0.01, label: "1.0%", desc: "Conservative" },
                  { value: 0.015, label: "1.5%", desc: "Avg" },
                  { value: 0.02, label: "2.0%", desc: "Optimistic" },
                ].map((option) => (
                  <label
                    key={option.value}
                    className={`flex-1 cursor-pointer p-3 rounded-lg text-center border transition-all backdrop-blur-sm ${
                      ctr === option.value
                        ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white border-blue-400 shadow-lg shadow-blue-500/30"
                        : "bg-white/10 text-gray-300 border-white/20 hover:bg-white/20"
                    }`}
                  >
                    <input
                      type="radio"
                      name="ctr"
                      value={option.value}
                      checked={ctr === option.value}
                      onChange={(e) => setCtr(parseFloat(e.target.value))}
                      className="sr-only"
                    />
                    <div className="font-bold">{option.label}</div>
                    <div
                      className={`text-xs ${
                        ctr === option.value ? "text-blue-100" : "text-gray-400"
                      }`}
                    >
                      {option.desc}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - Controls */}
          <div className="space-y-6">
            {/* Ad Preview */}
            <AdPreview
              url={url}
              headline={headline}
              description={description}
              onHeadlineChange={setHeadline}
              onDescriptionChange={setDescription}
            />

            {/* Budget Calculator */}
            <div className="p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl">
              <h2 className="text-xl font-semibold mb-6 font-serif text-white">
                Campaign Budget
              </h2>

              {/* Slider */}
              <div className="mb-8">
                <div className="flex justify-between items-end mb-4">
                  <span className="text-gray-300 font-medium">Daily Spend</span>
                  <div className="flex items-center text-3xl font-bold text-blue-300 font-serif">
                    $
                    <input
                      type="number"
                      value={budget}
                      onChange={(e) =>
                        setBudget(
                          Math.max(
                            10,
                            Math.min(1000, parseInt(e.target.value) || 10)
                          )
                        )
                      }
                      className="w-24 border-0 border-b-2 border-white/30 focus:border-blue-400 focus:ring-0 text-center bg-transparent text-blue-300"
                      min="10"
                      max="1000"
                    />
                  </div>
                </div>
                <input
                  type="range"
                  min="10"
                  max="1000"
                  step="1"
                  value={budget}
                  onChange={(e) => setBudget(parseInt(e.target.value))}
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-2">
                  <span>$10</span>
                  <span>$1000</span>
                </div>
              </div>

              {/* Metrics */}
              {metrics && (
                <div className="grid grid-cols-2 gap-4">
                  <BudgetCard label="Est. CPM" value={metrics.cpm} unit="$" />
                  <BudgetCard
                    label="Reach"
                    value={metrics.reach.toLocaleString()}
                  />
                  <BudgetCard
                    label="Est. Clicks"
                    value={metrics.estClicks.toLocaleString()}
                  />
                  <BudgetCard label="Est. CPC" value={metrics.cpc} unit="$" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/10 backdrop-blur-xl border-t border-white/20 px-4 py-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.3)] z-30">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <button
            onClick={() => navigate("/")}
            className="px-4 py-3 text-gray-300 hover:text-white transition-colors font-sans rounded-lg hover:bg-white/10"
            title="Discard"
          >
            <Trash2 className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-4">
            <div className="hidden md:block text-right mr-4">
              <div className="text-xs text-gray-400">Estimated Reach</div>
              <div className="font-bold text-white">
                {metrics?.reach.toLocaleString()} people
              </div>
            </div>
            <button
              onClick={handleLaunch}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-semibold hover:from-blue-400 hover:to-blue-500 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all transform hover:-translate-y-0.5 font-sans"
            >
              Launch Campaign
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
