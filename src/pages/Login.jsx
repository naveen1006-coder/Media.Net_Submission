import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Sparkles, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

/**
 * Login Page - "/login" route
 * Beautiful login form with Context-OS branding
 */
export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();

    const from = location.state?.from?.pathname || '/';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Please enter both email and password');
            return;
        }

        setLoading(true);

        try {
            await login(email, password);
            navigate(from, { replace: true });
        } catch (err) {
            setError('Invalid credentials. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-violet-50 via-white to-purple-50">
            <div className="card max-w-md w-full p-8 md:p-10 animate-fade-in bg-white border-violet-100 shadow-lg">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <div className="bg-gradient-to-br from-violet-100 to-purple-100 p-4 rounded-2xl shadow-sm">
                            <Sparkles className="w-10 h-10 text-primary" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2 font-serif">
                        Welcome to Context-OS
                    </h1>
                    <p className="text-gray-600 font-sans">
                        Sign in to launch intelligent ad campaigns
                    </p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700 text-sm">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span>{error}</span>
                    </div>
                )}

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Email Input */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2 font-sans">
                            Email Address
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="w-full pl-11 pr-4 py-3 border-2 border-violet-100 rounded-lg focus:border-primary focus:outline-none transition-colors font-sans"
                                autoComplete="email"
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2 font-sans">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="w-full pl-11 pr-4 py-3 border-2 border-violet-100 rounded-lg focus:border-primary focus:outline-none transition-colors font-sans"
                                autoComplete="current-password"
                            />
                        </div>
                    </div>

                    {/* Remember & Forgot */}
                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 mr-2 accent-primary" />
                            <span className="text-gray-600">Remember me</span>
                        </label>
                        <button type="button" className="text-primary hover:text-violet-500 font-medium">
                            Forgot password?
                        </button>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary text-white px-6 py-3 rounded-lg font-semibold text-base hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2 shadow-lg shadow-violet-200 hover:shadow-violet-300 transform hover:-translate-y-0.5 font-sans"
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
                <div className="mt-6 p-4 bg-violet-50 rounded-lg border border-violet-100">
                    <p className="text-xs text-gray-600 text-center">
                        <span className="font-semibold text-primary">Demo Mode:</span> Use any email/password to sign in
                    </p>
                </div>

                {/* Sign Up Link */}
                <div className="mt-6 text-center text-sm">
                    <span className="text-gray-600">Don't have an account? </span>
                    <button className="text-primary hover:text-violet-500 font-semibold">
                        Create one now
                    </button>
                </div>
            </div>
        </div>
    );
}
