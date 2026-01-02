import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Pill } from '../components/Pill';
import { AdPreview } from '../components/AdPreview';
import { BudgetCard } from '../components/BudgetCard';
import { StepList } from '../components/StepList';
import { generateContext } from '../utils/contextGenerator';
import { calculateMetrics } from '../utils/budgetCalculator';
import { useAuth } from '../contexts/AuthContext';
import { Sparkles, ArrowLeft, LogOut } from 'lucide-react';

/**
 * Workspace Page - "/workspace" route
 * Two columns: Intelligence (left) + Controls (right)
 */
export function Workspace() {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuth();
    const url = location.state?.url || 'example.com';

    // Processing state
    const [isProcessing, setIsProcessing] = useState(true);
    const [processingStep, setProcessingStep] = useState(0);

    // Context data
    const [context, setContext] = useState(null);

    // User selections
    const [selectedTopics, setSelectedTopics] = useState([]);
    const [publisherMix, setPublisherMix] = useState('premium'); // 'premium' or 'niche'
    const [budget, setBudget] = useState(100);
    const [headline, setHeadline] = useState('');
    const [description, setDescription] = useState('');
    const [ctr, setCtr] = useState(0.015); // Default 1.5%

    // Budget metrics
    const [metrics, setMetrics] = useState(null);

    useEffect(() => {
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
        }, 700);

        return () => clearInterval(interval);
    }, [url]);

    useEffect(() => {
        if (!isProcessing) {
            const calculated = calculateMetrics(budget, publisherMix, ctr);
            setMetrics(calculated);
        }
    }, [budget, publisherMix, ctr, isProcessing]);

    const toggleTopic = (topic) => {
        setSelectedTopics(prev =>
            prev.includes(topic)
                ? prev.filter(t => t !== topic)
                : [...prev, topic]
        );
    };

    const handleLaunch = () => {
        navigate('/launch', {
            state: {
                url,
                selectedTopics,
                publisherMix,
                budget,
                headline,
                description,
                metrics,
                warnings: context?.warnings || []
            }
        });
    };

    if (isProcessing) {
        return (
            <div className="min-h-screen bg-violet-50 flex items-center justify-center p-4">
                <div className="card max-w-md w-full p-8 bg-white border-violet-100 shadow-sm">
                    <div className="flex justify-center mb-6">
                        <div className="bg-violet-100 p-3 rounded-full animate-pulse">
                            <Sparkles className="w-8 h-8 text-primary" />
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center font-serif">
                        Analyzing Context
                    </h2>
                    <p className="text-gray-600 mb-8 text-center font-sans">
                        Processing content for <span className="text-primary font-medium">{url}</span>
                    </p>
                    <StepList currentStep={processingStep} />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-violet-50 pb-28">
            {/* Header */}
            <div className="bg-white border-b border-violet-100 px-4 py-4 shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <button onClick={() => navigate('/')} className="p-2 hover:bg-violet-50 rounded-full transition-colors">
                            <ArrowLeft className="w-5 h-5 text-gray-500" />
                        </button>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900 font-serif flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-primary" />
                                Context-OS
                            </h1>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="text-sm font-medium text-gray-500 bg-violet-50 px-3 py-1 rounded-full">
                            {url}
                        </div>
                        <button
                            onClick={() => { logout(); navigate('/login'); }}
                            className="p-2 hover:bg-red-50 rounded-full transition-colors group"
                            title="Sign Out"
                        >
                            <LogOut className="w-4 h-4 text-gray-400 group-hover:text-red-500" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Two Column Layout */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* LEFT COLUMN - Intelligence */}
                    <div className="space-y-6">
                        {/* Detected Topics */}
                        <div className="card p-6 border-violet-200">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-semibold font-serif text-gray-900">Detected Topics</h2>
                                <span className="text-xs font-medium text-primary bg-violet-100 px-2 py-1 rounded">
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
                            <p className="text-sm text-gray-500 mt-4 font-sans">
                                Select relevant topics to refine targeting
                            </p>
                        </div>

                        {/* Publisher Mix */}
                        <div className="card p-6 border-violet-200">
                            <h2 className="text-xl font-semibold mb-4 font-serif text-gray-900">Publisher Mix</h2>
                            <div className="space-y-3">
                                <label className={`flex items-center space-x-3 cursor-pointer p-3 rounded-lg border transition-all ${publisherMix === 'premium' ? 'border-primary bg-violet-50' : 'border-transparent hover:bg-gray-50'}`}>
                                    <input
                                        type="radio"
                                        name="publisher"
                                        value="premium"
                                        checked={publisherMix === 'premium'}
                                        onChange={(e) => setPublisherMix(e.target.value)}
                                        className="w-5 h-5 text-primary accent-primary"
                                    />
                                    <div>
                                        <div className="font-medium text-gray-900">Premium News</div>
                                        <div className="text-sm text-gray-600">
                                            Tier 1 publishers, high trust (CPM × 1.6)
                                        </div>
                                    </div>
                                </label>

                                <label className={`flex items-center space-x-3 cursor-pointer p-3 rounded-lg border transition-all ${publisherMix === 'niche' ? 'border-primary bg-violet-50' : 'border-transparent hover:bg-gray-50'}`}>
                                    <input
                                        type="radio"
                                        name="publisher"
                                        value="niche"
                                        checked={publisherMix === 'niche'}
                                        onChange={(e) => setPublisherMix(e.target.value)}
                                        className="w-5 h-5 text-primary accent-primary"
                                    />
                                    <div>
                                        <div className="font-medium text-gray-900">Niche Blogs</div>
                                        <div className="text-sm text-gray-600">
                                            Highly specific audiences (CPM × 0.7)
                                        </div>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* CTR Testing */}
                        <div className="card p-6 border-violet-200">
                            <h2 className="text-xl font-semibold mb-4 font-serif text-gray-900">CTR Assumption</h2>
                            <div className="flex gap-4">
                                {[
                                    { value: 0.01, label: '1.0%', desc: 'Conservative' },
                                    { value: 0.015, label: '1.5%', desc: 'Avg' },
                                    { value: 0.02, label: '2.0%', desc: 'Optimistic' }
                                ].map(option => (
                                    <label key={option.value} className={`flex-1 cursor-pointer p-2 rounded text-center border transition-all ${ctr === option.value ? 'bg-primary text-white border-primary' : 'bg-white text-gray-600 border-gray-200 hover:border-violet-300'}`}>
                                        <input
                                            type="radio"
                                            name="ctr"
                                            value={option.value}
                                            checked={ctr === option.value}
                                            onChange={(e) => setCtr(parseFloat(e.target.value))}
                                            className="sr-only"
                                        />
                                        <div className="font-bold">{option.label}</div>
                                        <div className={`text-xs ${ctr === option.value ? 'text-violet-100' : 'text-gray-400'}`}>{option.desc}</div>
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
                        <div className="card p-6 border-violet-200">
                            <h2 className="text-xl font-semibold mb-6 font-serif text-gray-900">Campaign Budget</h2>

                            {/* Slider */}
                            <div className="mb-8">
                                <div className="flex justify-between items-end mb-4">
                                    <span className="text-gray-600 font-medium">Daily Spend</span>
                                    <div className="flex items-center text-3xl font-bold text-primary font-serif">
                                        $<input
                                            type="number"
                                            value={budget}
                                            onChange={(e) => setBudget(Math.max(10, Math.min(1000, parseInt(e.target.value) || 10)))}
                                            className="w-24 border-0 border-b-2 border-violet-200 focus:border-primary focus:ring-0 text-center bg-transparent"
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
                                    className="w-full h-2 bg-violet-100 rounded-lg appearance-none cursor-pointer accent-primary"
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
                                    <BudgetCard label="Reach" value={metrics.reach.toLocaleString()} />
                                    <BudgetCard label="Est. Clicks" value={metrics.estClicks.toLocaleString()} />
                                    <BudgetCard label="Est. CPC" value={metrics.cpc} unit="$" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Fixed Bottom Action Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-violet-100 px-4 py-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-20">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <button
                        onClick={() => navigate('/')}
                        className="px-6 py-3 text-gray-500 font-medium hover:text-gray-800 transition-colors font-sans"
                    >
                        Discard
                    </button>
                    <div className="flex items-center gap-4">
                        <div className="hidden md:block text-right mr-4">
                            <div className="text-xs text-gray-500">Estimated Reach</div>
                            <div className="font-bold text-gray-900">{metrics?.reach.toLocaleString()} people</div>
                        </div>
                        <button
                            onClick={handleLaunch}
                            className="px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-violet-500 shadow-lg shadow-violet-200 hover:shadow-violet-300 transition-all transform hover:-translate-y-0.5 font-sans"
                        >
                            Launch Campaign
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
