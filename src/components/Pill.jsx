import React from 'react';

/**
 * Pill Component - Clickable topic pills with toggle selection
 */
export function Pill({ text, isSelected, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${isSelected
                    ? 'bg-primary text-white border-primary shadow-md shadow-violet-200'
                    : 'bg-white text-gray-600 border-violet-100 hover:border-primary hover:text-primary hover:bg-violet-50'
                }`}
            aria-pressed={isSelected}
        >
            {text}
        </button>
    );
}
