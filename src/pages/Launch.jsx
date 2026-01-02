import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AlertCircle, Check, ArrowLeft, Shield } from 'lucide-react';
import { checkPolicy } from '../utils/policyFilter';
import { saveCampaign } from '../utils/storage';

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
        <div className="min-h-screen bg-violet-50 py-12 px-4">
            <div className="max-w-3xl mx-auto">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-gray-500 hover:text-gray-900 mb-8 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Workspace
                </button>

                <div className="card p-8 bg-white border-violet-100 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 font-serif">
                            Launch Campaign
                        </h1>
                        <div className="bg-violet-100 text-primary px-3 py-1 rounded-full text-sm font-bold">
                            Final Step
                        </div>
                    </div>

                    {/* Campaign Summary */}
                    <div className="space-y-8 mb-10">
                        {/* Context Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-gray-100">
                            <div>
                                <h3 className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">Target URL</h3>
                                <p className="text-lg font-medium text-gray-900">{url}</p>
                            </div>
                            <div>
                                <h3 className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">Publisher Mix</h3>
                                <div className="inline-block px-3 py-1 bg-gray-100 rounded text-gray-700 capitalize">
                                    {publisherMix === 'premium' ? 'Premium News' : 'Niche Blogs'}
                                </div>
                            </div>
                        </div>

                        {/* Keywords */}
                        <div className="pb-6 border-b border-gray-100">
                            <h3 className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-3">Targeting Keywords</h3>
                            <div className="flex flex-wrap gap-2">
                                {selectedTopics?.map((topic, index) => (
                                    <span key={index} className="px-3 py-1 bg-violet-50 text-primary border border-violet-100 rounded-full text-sm">
                                        {topic}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Creative Preview */}
                        <div className="pb-6 border-b border-gray-100">
                            <h3 className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-3">Creative Preview</h3>
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                <div className="text-green-700 text-xs mb-1 font-sans">Ad · {url}</div>
                                <div className="text-lg text-blue-700 font-medium mb-1 font-sans underline decoration-transparent hover:decoration-blue-700 cursor-pointer">{headline}</div>
                                <div className="text-sm text-gray-600 font-sans">{description}</div>
                            </div>
                        </div>

                        {/* Financials */}
                        <div>
                            <h3 className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-3">Projected Performance</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="p-3 bg-violet-50 rounded border border-violet-100">
                                    <div className="text-xs text-gray-500">Daily Budget</div>
                                    <div className="text-xl font-bold text-primary font-serif">${budget}</div>
                                </div>
                                <div className="p-3 bg-white rounded border border-gray-200">
                                    <div className="text-xs text-gray-500">CPM</div>
                                    <div className="text-xl font-bold text-gray-900 font-serif">${metrics?.cpm}</div>
                                </div>
                                <div className="p-3 bg-white rounded border border-gray-200">
                                    <div className="text-xs text-gray-500">Reach</div>
                                    <div className="text-xl font-bold text-gray-900 font-serif">{metrics?.reach?.toLocaleString()}</div>
                                </div>
                                <div className="p-3 bg-white rounded border border-gray-200">
                                    <div className="text-xs text-gray-500">Clicks</div>
                                    <div className="text-xl font-bold text-gray-900 font-serif">{metrics?.estClicks?.toLocaleString()}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Policy Warnings */}
                    {policyWarnings.length > 0 && (
                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-5 mb-8">
                            <div className="flex items-start space-x-3">
                                <Shield className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                                <div className="flex-1">
                                    <h4 className="font-semibold text-orange-900 mb-2">
                                        Policy Confirmation Required
                                    </h4>
                                    <ul className="space-y-1 text-sm text-orange-800 mb-4">
                                        {policyWarnings.map((warning, index) => (
                                            <li key={index}>• {warning.message}</li>
                                        ))}
                                    </ul>

                                    <label className="flex items-center space-x-3 cursor-pointer bg-white p-3 rounded border border-orange-100 hover:border-orange-300 transition-colors">
                                        <input
                                            type="checkbox"
                                            checked={confirmed}
                                            onChange={(e) => setConfirmed(e.target.checked)}
                                            className="w-5 h-5 accent-orange-500"
                                        />
                                        <span className="text-sm font-medium text-orange-900">
                                            I certify that these claims are substantiated
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex justify-end pt-6 border-t border-gray-100">
                        <button
                            onClick={handleLaunch}
                            disabled={policyWarnings.length > 0 && !confirmed}
                            className="px-8 py-4 bg-primary text-white rounded-lg font-semibold hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-violet-200 hover:shadow-violet-300 transform hover:-translate-y-0.5 flex items-center space-x-2 font-sans"
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
