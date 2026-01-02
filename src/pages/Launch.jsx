import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AlertCircle, Check, ArrowLeft, Shield, SunSnow } from 'lucide-react';
import { checkPolicy } from '../utils/policyFilter';
import { saveCampaign } from '../utils/storage';
import backgroundVideo from '../data/video.mp4';

/**
 * Launch Page - "/launch" route
 * Final confirmation with warnings and budget allocation
 */
export function Launch() {
    const location = useLocation();
    const navigate = useNavigate();

    const {
        url,
        selectedTopics,
        publisherMix,
        budget,
        headline,
        description,
        metrics,
        warnings: contextWarnings = []
    } = location.state || {};

    const [policyWarnings, setPolicyWarnings] = useState([]);
    const [confirmed, setConfirmed] = useState(false);

    useEffect(() => {
        if (!url) {
            navigate('/');
            return;
        }
        const headlineWarnings = checkPolicy(headline || '');
        const descWarnings = checkPolicy(description || '');
        const allWarnings = [...headlineWarnings, ...descWarnings, ...contextWarnings];
        setPolicyWarnings(allWarnings);
    }, [url, headline, description, contextWarnings, navigate]);

    const handleLaunch = () => {
        if (policyWarnings.length > 0 && !confirmed) return;

        const campaign = {
            id: Date.now().toString(),
            url,
            keywords: selectedTopics,
            headline,
            description,
            budget,
            publisherMix,
            cpm: metrics?.cpm,
            reach: metrics?.reach,
            estClicks: metrics?.estClicks,
            ctr: metrics?.ctr || 0.015,
            createdAt: new Date().toISOString()
        };

        saveCampaign(campaign);
        navigate('/success', { state: { campaign } });
    };

    if (!url) return null;

    return (
        <div className="min-h-screen py-12 px-4 relative overflow-hidden">
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
            </video>
            {/* Dark overlay */}
            <div className="fixed inset-0 bg-black/60 z-[1]"></div>

            {/* Logo and Title - Top Left */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-3">
                <div className="bg-white/10 backdrop-blur-xl p-2.5 rounded-xl shadow-sm border border-white/20">
                    <SunSnow className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h1 className="text-xl font-bold text-white font-serif">AD-ios</h1>
                </div>
            </div>

            <div className="relative z-10 max-w-3xl mx-auto">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-gray-300 hover:text-white mb-8 transition-colors font-sans"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Workspace
                </button>

                <div className="p-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl">
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-3xl font-bold text-white font-serif">
                            Launch Campaign
                        </h1>
                        <div className="bg-blue-600/30 backdrop-blur-sm text-blue-300 px-3 py-1 rounded-full text-sm font-bold border border-blue-400/20">
                            Final Step
                        </div>
                    </div>

                    {/* Campaign Summary */}
                    <div className="space-y-8 mb-10">
                        {/* Context Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-white/20">
                            <div>
                                <h3 className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2 font-sans">Target URL</h3>
                                <p className="text-lg font-medium text-white font-sans">{url}</p>
                            </div>
                            <div>
                                <h3 className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2 font-sans">Publisher Mix</h3>
                                <div className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm rounded border border-white/20 text-white capitalize font-sans">
                                    {publisherMix === 'premium' ? 'Premium News' : 'Niche Blogs'}
                                </div>
                            </div>
                        </div>

                        {/* Keywords */}
                        <div className="pb-6 border-b border-white/20">
                            <h3 className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-3 font-sans">Targeting Keywords</h3>
                            <div className="flex flex-wrap gap-2">
                                {selectedTopics?.map((topic, index) => (
                                    <span key={index} className="px-3 py-1 bg-blue-600/30 backdrop-blur-sm text-blue-300 border border-blue-400/20 rounded-full text-sm font-sans">
                                        {topic}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Creative Preview */}
                        <div className="pb-6 border-b border-white/20">
                            <h3 className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-3 font-sans">Creative Preview</h3>
                            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20">
                                <div className="text-green-400 text-xs mb-1 font-sans">Ad · {url}</div>
                                <div className="text-lg text-blue-300 font-medium mb-1 font-sans underline decoration-transparent hover:decoration-blue-300 cursor-pointer">{headline}</div>
                                <div className="text-sm text-gray-300 font-sans">{description}</div>
                            </div>
                        </div>

                        {/* Financials */}
                        <div>
                            <h3 className="text-xs uppercase tracking-wider text-gray-300 font-semibold mb-3 font-sans">Projected Performance</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="p-3 bg-blue-600/30 backdrop-blur-sm rounded border border-blue-400/20">
                                    <div className="text-xs text-gray-300 font-sans">Daily Budget</div>
                                    <div className="text-xl font-bold text-blue-200 font-sans">${budget}</div>
                                </div>
                                <div className="p-3 bg-white/10 backdrop-blur-sm rounded border border-white/20">
                                    <div className="text-xs text-gray-300 font-sans">CPM</div>
                                    <div className="text-xl font-bold text-white font-sans">${metrics?.cpm}</div>
                                </div>
                                <div className="p-3 bg-white/10 backdrop-blur-sm rounded border border-white/20">
                                    <div className="text-xs text-gray-300 font-sans">Reach</div>
                                    <div className="text-xl font-bold text-white font-sans">{metrics?.reach?.toLocaleString()}</div>
                                </div>
                                <div className="p-3 bg-white/10 backdrop-blur-sm rounded border border-white/20">
                                    <div className="text-xs text-gray-300 font-sans">Clicks</div>
                                    <div className="text-xl font-bold text-white font-sans">{metrics?.estClicks?.toLocaleString()}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Policy Warnings */}
                    {policyWarnings.length > 0 && (
                        <div className="bg-orange-500/20 backdrop-blur-sm border border-orange-400/30 rounded-lg p-5 mb-8">
                            <div className="flex items-start space-x-3">
                                <Shield className="w-5 h-5 text-orange-300 flex-shrink-0 mt-0.5" />
                                <div className="flex-1">
                                    <h4 className="font-semibold text-orange-200 mb-2 font-sans">
                                        Policy Confirmation Required
                                    </h4>
                                    <ul className="space-y-1 text-sm text-orange-100 mb-4 font-sans">
                                        {policyWarnings.map((warning, index) => (
                                            <li key={index}>• {warning.message}</li>
                                        ))}
                                    </ul>

                                    <label className="flex items-center space-x-3 cursor-pointer bg-white/10 backdrop-blur-sm p-3 rounded border border-white/20 hover:border-orange-300/50 transition-colors">
                                        <input
                                            type="checkbox"
                                            checked={confirmed}
                                            onChange={(e) => setConfirmed(e.target.checked)}
                                            className="w-5 h-5 accent-orange-400"
                                        />
                                        <span className="text-sm font-medium text-white font-sans">
                                            I certify that these claims are substantiated
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex justify-end pt-6 border-t border-white/20">
                        <button
                            onClick={handleLaunch}
                            disabled={policyWarnings.length > 0 && !confirmed}
                            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-semibold hover:from-blue-400 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transform hover:-translate-y-0.5 flex items-center space-x-2 font-sans"
                        >
                            <Check className="w-5 h-5" />
                            <span>Launch Campaign</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
