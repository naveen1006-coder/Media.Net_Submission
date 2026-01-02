import React from 'react';
import { Check, Loader2 } from 'lucide-react';

/**
 * StepList Component - Processing animation with checkmarks
 */
export function StepList({ currentStep }) {
    const steps = [
        'Resolving URL Context',
        'Analyzing DOM Structure',
        'Categorizing Content Themes',
        'Generating Ad Creative'
    ];

    return (
        <div className="space-y-5">
            {steps.map((step, index) => {
                const isCompleted = index < currentStep;
                const isActive = index === currentStep;
                const isPending = index > currentStep;

                return (
                    <div
                        key={index}
                        className={`flex items-center space-x-5 transition-all duration-300 ${isPending ? 'opacity-40' : 'opacity-100'
                            }`}
                    >
                        <div className={`
              w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
              ${isCompleted ? 'bg-green-500/30 text-green-300 border border-green-400/30' : ''}
              ${isActive ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/50 scale-110' : ''}
              ${isPending ? 'bg-white/10 border border-white/20' : ''}
            `}>
                            {isCompleted && <Check className="w-6 h-6" />}
                            {isActive && <Loader2 className="w-6 h-6 animate-spin" />}
                            {isPending && <span className="text-gray-400 text-sm">{index + 1}</span>}
                        </div>

                        <span className={`text-base font-medium ${isActive ? 'text-blue-300' : 'text-gray-300'
                            }`}>
                            {step}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}
