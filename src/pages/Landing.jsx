import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, User, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import demoData from '../data/demo_data.json';

/**
 * Landing Page - "/" route
 * Centered card with URL input and CTA button
 */
export function Landing() {
    const [url, setUrl] = useState('');
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
        navigate('/workspace', { state: { url: finalUrl } });
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleAnalyze();
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-violet-50 relative">
            {/* User Menu */}
            <div className="absolute top-4 right-4">
                <div className="relative">
                    <button
                        onClick={() => setShowUserMenu(!showUserMenu)}
                        className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-violet-100 hover:border-primary transition-colors shadow-sm"
                    >
                        <User className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-gray-700">{user?.email}</span>
                    </button>

                    {showUserMenu && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-violet-100 py-1 z-50">
                            <button
                                onClick={handleLogout}
                                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-violet-50 flex items-center gap-2"
                            >
                                <LogOut className="w-4 h-4" />
                                Sign Out
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div className="card max-w-2xl w-full p-8 md:p-12 animate-fade-in bg-white border-violet-100 shadow-sm">
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="flex justify-center mb-4">
                        <div className="bg-violet-100 p-3 rounded-full">
                            <Sparkles className="w-8 h-8 text-primary" />
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-serif">
                        Context-OS
                    </h1>
                    <p className="text-lg text-gray-600 font-sans">
                        The Intelligent Contextual Ad Engine
                    </p>
                </div>

                {/* URL Input */}
                <div className="space-y-4">
                    <div>
                        <label htmlFor="url-input" className="block text-sm font-medium text-gray-700 mb-2 font-sans">
                            Enter Website URL
                        </label>
                        <input
                            id="url-input"
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="try 'mikes-coffee.com' or 'fashion-store.com'"
                            className="w-full px-4 py-3 border-2 border-violet-100 rounded-lg focus:border-primary focus:outline-none transition-colors text-lg font-sans"
                        />
                    </div>

                    {/* Demo hints */}
                    <div className="text-sm text-gray-500 font-sans">
                        <p className="mb-1">Demo shortcuts:</p>
                        <div className="flex flex-wrap gap-2">
                            {Object.keys(demoData).map(key => (
                                <button
                                    key={key}
                                    onClick={() => setUrl(key)}
                                    className="px-3 py-1 bg-violet-50 text-violet-700 rounded-md hover:bg-violet-100 transition-colors"
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
                        className="w-full bg-primary text-white px-6 py-4 rounded-lg font-semibold text-lg hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2 shadow-sm font-sans"
                    >
                        <span>Analyze Context</span>
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>

                {/* Features */}
                <div className="mt-12 grid grid-cols-3 gap-4 text-center font-sans">
                    <div className="p-2">
                        <div className="text-2xl font-bold text-primary mb-1 font-serif">60s</div>
                        <div className="text-sm text-gray-600">Setup Time</div>
                    </div>
                    <div className="p-2 border-l border-violet-100 border-r">
                        <div className="text-2xl font-bold text-primary mb-1 font-serif">AI</div>
                        <div className="text-sm text-gray-600">Powered</div>
                    </div>
                    <div className="p-2">
                        <div className="text-2xl font-bold text-primary mb-1 font-serif">$10</div>
                        <div className="text-sm text-gray-600">Min Budget</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
