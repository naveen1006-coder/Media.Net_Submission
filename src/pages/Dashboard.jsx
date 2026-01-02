import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, BarChart2, TrendingUp, SunSnow } from 'lucide-react';
import { getCampaigns, clearCampaigns } from '../utils/storage';
import backgroundVideo from '../data/video.mp4';

/**
 * Dashboard Page - "/dashboard" route
 */
export function Dashboard() {
    const navigate = useNavigate();
    const [campaigns, setCampaigns] = useState([]);

    useEffect(() => {
        const saved = getCampaigns();
        setCampaigns(saved);
    }, []);

    const handleClear = () => {
        if (window.confirm('Delete all history?')) {
            clearCampaigns();
            setCampaigns([]);
        }
    };

    return (
        <div className="min-h-screen py-8 px-4 relative overflow-hidden">
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

            <div className="relative z-10 max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-end mb-10 pb-6 border-b border-white/20">
                    <div>
                        <h1 className="text-4xl font-bold text-white font-serif">Mission Control</h1>
                    </div>
                    <div className="flex gap-3">
                        {campaigns.length > 0 && (
                            <button
                                onClick={handleClear}
                                className="px-4 py-2 text-sm text-gray-300 hover:text-red-400 transition-colors font-sans"
                            >
                                Clear History
                            </button>
                        )}
                        <button
                            onClick={() => navigate('/')}
                            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-semibold hover:from-blue-400 hover:to-blue-500 transition-all flex items-center space-x-2 shadow-lg shadow-blue-500/30 font-sans"
                        >
                            <Plus className="w-5 h-5" />
                            <span>New Campaign</span>
                        </button>
                    </div>
                </div>

                {/* Campaigns List */}
                {campaigns.length === 0 ? (
                    <div className="p-16 text-center border-dashed border-2 border-white/20 bg-gray-900/95 rounded-2xl border border-white/10">
                        <div className="text-gray-400 mb-6 flex justify-center">
                            <BarChart2 className="w-20 h-20" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2 font-serif">No active campaigns</h3>
                        <p className="text-gray-300 mb-8 max-w-sm mx-auto font-sans">
                            Launch your first intelligent ad campaign to see performance metrics here.
                        </p>
                        <button
                            onClick={() => navigate('/')}
                            className="px-8 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-lg font-semibold hover:bg-white/20 transition-colors font-sans"
                        >
                            Analyze a URL
                        </button>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {campaigns.map((campaign) => (
                            <div key={campaign.id} className="p-6 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 bg-gray-900/95 rounded-2xl border border-white/10">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-1 font-serif">
                                            {campaign.headline}
                                        </h3>
                                        <a href={`http://${campaign.url}`} target="_blank" rel="noreferrer" className="text-sm text-blue-400 hover:text-blue-300 hover:underline font-sans">
                                            {campaign.url}
                                        </a>
                                    </div>
                                    <div className="mt-4 md:mt-0 flex items-center gap-2">
                                        <span className="px-3 py-1 bg-green-500/20 text-green-300 border border-green-400/30 rounded-full text-xs font-bold uppercase tracking-wider font-sans">
                                            Active
                                        </span>
                                        <span className="text-xs text-gray-400 font-sans">
                                            {new Date(campaign.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-white/5 rounded-lg border border-white/10">
                                    <div>
                                        <div className="text-xs text-gray-400 uppercase tracking-wider mb-1 font-sans">Budget</div>
                                        <div className="font-bold text-white font-sans text-lg">${campaign.budget}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-400 uppercase tracking-wider mb-1 font-sans">Est. Reach</div>
                                        <div className="font-bold text-white font-sans text-lg">{campaign.reach?.toLocaleString()}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-400 uppercase tracking-wider mb-1 font-sans">Est. Clicks</div>
                                        <div className="font-bold text-white font-sans text-lg">{campaign.estClicks?.toLocaleString()}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-400 uppercase tracking-wider mb-1 font-sans">Platform</div>
                                        <div className="font-bold text-white capitalize font-sans">{campaign.publisherMix}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
