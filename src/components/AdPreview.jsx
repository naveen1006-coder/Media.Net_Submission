import React from 'react';

/**
 * AdPreview Component - Mimics Bing search result
 * Editable headline and description
 */
export function AdPreview({ url, headline, description, onHeadlineChange, onDescriptionChange }) {
    return (
        <div className="card p-6 border-violet-200">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold font-serif text-gray-900">Ad Preview</h3>
                <span className="text-xs text-gray-400 font-sans">Live Preview</span>
            </div>

            <div className="border border-violet-100 rounded-lg p-5 bg-white shadow-sm hover:shadow-md transition-shadow">
                {/* Display path - green text (Search engine standard) */}
                <div className="text-[#1a0dab] text-sm mb-1 font-sans opacity-70">
                    Ad · {url}
                </div>

                {/* Headline - editable input */}
                <input
                    type="text"
                    value={headline}
                    onChange={(e) => onHeadlineChange(e.target.value)}
                    className="w-full text-xl text-[#1a0dab] font-medium mb-1 border-0 border-b border-transparent hover:border-violet-200 focus:border-primary focus:ring-0 focus:outline-none transition-colors px-0 py-1 underline decoration-transparent hover:decoration-violet-200"
                    placeholder="Enter headline..."
                    maxLength={90}
                />

                {/* Description - editable textarea */}
                <textarea
                    value={description}
                    onChange={(e) => onDescriptionChange(e.target.value)}
                    className="w-full text-sm text-[#4d5156] leading-relaxed border-0 border-b border-transparent hover:border-violet-200 focus:border-primary focus:ring-0 focus:outline-none resize-none transition-colors px-0 py-1"
                    placeholder="Enter description..."
                    rows={3}
                    maxLength={180}
                />

                {/* Character counts */}
                <div className="flex justify-between text-xs text-gray-400 mt-2 font-sans border-t border-gray-100 pt-2">
                    <span>{headline.length}/90</span>
                    <span>{description.length}/180</span>
                </div>
            </div>
        </div>
    );
}
