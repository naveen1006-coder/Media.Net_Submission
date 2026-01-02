import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, BarChart2, TrendingUp, Sparkles } from 'lucide-react';
import { getCampaigns, clearCampaigns } from '../utils/storage';

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
        <div className="min-h-screen bg-violet-50 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-end mb-10 pb-6 border-b border-violet-200">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="w-5 h-5 text-primary" />
                            <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Context-OS</span>
                        </div>
                        <h1 className="text-4xl font-bold text-gray-900 font-serif">Mission Control</h1>
                    </div>
                    <div className="flex gap-3">
                        {campaigns.length > 0 && (
                            <button
                                onClick={handleClear}
                                className="px-4 py-2 text-sm text-gray-500 hover:text-red-500 transition-colors"
                            >
                                Clear History
                            </button>
                        )}
                        <button
                            onClick={() => navigate('/')}
                            className="px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-violet-500 transition-colors flex items-center space-x-2 shadow-sm"
                        >
                            <Plus className="w-5 h-5" />
                            <span>New Campaign</span>
                        </button>
                    </div>
                </div>

                {/* Campaigns List */}
                {campaigns.length === 0 ? (
                    <div className="card p-16 text-center border-dashed border-2 border-violet-200 bg-white/50">
                        <div className="text-violet-200 mb-6 flex justify-center">
                            <BarChart2 className="w-20 h-20" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2 font-serif">No active campaigns</h3>
                        <p className="text-gray-500 mb-8 max-w-sm mx-auto">
                            Launch your first intelligent ad campaign to see performance metrics here.
                        </p>
                        <button
                            onClick={() => navigate('/')}
                            className="px-8 py-3 bg-white border border-primary text-primary rounded-lg font-semibold hover:bg-violet-50 transition-colors"
                        >
                            Analyze a URL
                        </button>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {campaigns.map((campaign) => (
                            <div key={campaign.id} className="card p-6 hover:shadow-lg hover:shadow-violet-100 transition-all duration-300 border-violet-100 bg-white">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-1 font-serif">
                                            {campaign.headline}
                                        </h3>
                                        <a href={`http://${campaign.url}`} target="_blank" rel="noreferrer" className="text-sm text-primary hover:underline">
                                            {campaign.url}
                                        </a>
                                    </div>
                                    <div className="mt-4 md:mt-0 flex items-center gap-2">
                                        <span className="px-3 py-1 bg-green-50 text-green-700 border border-green-100 rounded-full text-xs font-bold uppercase tracking-wider">
                                            Active
                                        </span>
                                        <span className="text-xs text-gray-400">
                                            {new Date(campaign.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
                                    <div>
                                        <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Budget</div>
                                        <div className="font-bold text-gray-900 font-serif text-lg">${campaign.budget}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Est. Reach</div>
                                        <div className="font-bold text-gray-900 font-serif text-lg">{campaign.reach?.toLocaleString()}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Est. Clicks</div>
                                        <div className="font-bold text-gray-900 font-serif text-lg">{campaign.estClicks?.toLocaleString()}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Platform</div>
                                        <div className="font-bold text-gray-900 capitalize">{campaign.publisherMix}</div>
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
