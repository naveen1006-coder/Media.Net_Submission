import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Home, BarChart, SunSnow } from 'lucide-react';
import { calculateROAS } from '../utils/budgetCalculator';
import backgroundVideo from '../data/video.mp4';

/**
 * Success Page - "/success" route
 */
export function Success() {
    const location = useLocation();
    const navigate = useNavigate();
    const campaign = location.state?.campaign;

    if (!campaign) {
        navigate('/');
        return null;
    }

    const roasData = calculateROAS(campaign.estClicks, campaign.budget);

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

            <div className="relative z-10 max-w-3xl w-full p-8 md:p-12 animate-fade-in bg-gray-900/95 rounded-2xl border border-white/10 shadow-2xl text-center">
                {/* Success Icon */}
                <div className="flex justify-center mb-8">
                    <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center border border-green-400/30">
                        <CheckCircle className="w-12 h-12 text-green-400" />
                    </div>
                </div>

                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-4xl font-bold text-white mb-3 font-serif">
                        Campaign Active
                    </h1>
                    <p className="text-lg text-gray-300 font-sans">
                        Your campaign <span className="text-blue-400 font-medium">#{campaign.id.slice(-6)}</span> has been successfully launched.
                    </p>
                </div>

                {/* ROAS Prediction Card */}
                <div className="bg-blue-900/40 border border-blue-400/20 rounded-2xl p-8 mb-10 shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-20">
                        <BarChart className="w-32 h-32 text-blue-300" />
                    </div>

                    <div className="relative z-10">
                        <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-2 font-sans">
                            Projected Return on Ad Spend
                        </h3>
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <span className="text-6xl font-bold text-blue-300 font-sans">{roasData.roas}x</span>
                        </div>

                        <div className="inline-flex items-center justify-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-sm text-gray-300 font-sans">
                            <span className="font-medium text-white mr-1">${roasData.estRevenue}</span>
                            <span>est. revenue from </span>
                            <span className="font-medium text-white ml-1">${campaign.budget}</span>
                            <span className="ml-1">spend</span>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => navigate('/')}
                        className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-semibold hover:from-blue-400 hover:to-blue-500 transition-all font-sans shadow-lg shadow-blue-500/30"
                    >
                        Create New Campaign
                    </button>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="px-8 py-3 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-lg font-semibold hover:bg-white/20 transition-all font-sans"
                    >
                        View Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
}
