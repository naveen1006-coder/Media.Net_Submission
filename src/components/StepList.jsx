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
        <div className="space-y-4">
            {steps.map((step, index) => {
                const isCompleted = index < currentStep;
                const isActive = index === currentStep;
                const isPending = index > currentStep;

                return (
                    <div
                        key={index}
                        className={`flex items-center space-x-4 transition-all duration-300 ${isPending ? 'opacity-40' : 'opacity-100'
                            }`}
                    >
                        <div className={`
              w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300
              ${isCompleted ? 'bg-green-100 text-green-600' : ''}
              ${isActive ? 'bg-primary text-white shadow-lg shadow-violet-200 scale-110' : ''}
              ${isPending ? 'bg-gray-100 border border-gray-200' : ''}
            `}>
                            {isCompleted && <Check className="w-5 h-5" />}
                            {isActive && <Loader2 className="w-5 h-5 animate-spin" />}
                            {isPending && <span className="text-gray-400 text-xs">{index + 1}</span>}
                        </div>

                        <span className={`text-sm font-medium ${isActive ? 'text-primary' : 'text-gray-700'
                            }`}>
                            {step}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}
