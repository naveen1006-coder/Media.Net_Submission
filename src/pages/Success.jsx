import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Home, BarChart } from 'lucide-react';
import { calculateROAS } from '../utils/budgetCalculator';

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
        <div className="min-h-screen flex items-center justify-center p-4 bg-violet-50">
            <div className="card max-w-3xl w-full p-8 md:p-12 animate-fade-in bg-white border-violet-100 shadow-sm text-center">
                {/* Success Icon */}
                <div className="flex justify-center mb-8">
                    <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center border border-green-100">
                        <CheckCircle className="w-12 h-12 text-green-500" />
                    </div>
                </div>

                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-4xl font-bold text-gray-900 mb-3 font-serif">
                        Campaign Active
                    </h1>
                    <p className="text-lg text-gray-600 font-sans">
                        Your campaign <span className="text-primary font-medium">#{campaign.id.slice(-6)}</span> has been successfully launched.
                    </p>
                </div>

                {/* ROAS Prediction Card */}
                <div className="bg-gradient-to-br from-violet-50 to-white border border-violet-100 rounded-2xl p-8 mb-10 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <BarChart className="w-32 h-32 text-primary" />
                    </div>

                    <div className="relative z-10">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                            Projected Return on Ad Spend
                        </h3>
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <span className="text-6xl font-bold text-primary font-serif">{roasData.roas}x</span>
                        </div>

                        <div className="inline-flex items-center justify-center px-4 py-2 bg-white rounded-full border border-violet-100 text-sm text-gray-600 shadow-sm">
                            <span className="font-medium text-gray-900 mr-1">${roasData.estRevenue}</span>
                            <span>est. revenue from </span>
                            <span className="font-medium text-gray-900 ml-1">${campaign.budget}</span>
                            <span className="ml-1">spend</span>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => navigate('/')}
                        className="px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-violet-500 transition-all font-sans"
                    >
                        Create New Campaign
                    </button>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="px-8 py-3 bg-white text-gray-700 border border-gray-200 rounded-lg font-semibold hover:bg-gray-50 transition-all font-sans"
                    >
                        View Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
}
