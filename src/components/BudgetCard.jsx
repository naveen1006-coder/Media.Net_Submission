import React from 'react';

/**
 * BudgetCard Component - Display metric cards
 */
export function BudgetCard({ label, value, unit = '' }) {
    return (
        <div className="p-4 rounded-lg bg-gray-50 border border-violet-100 text-center hover:bg-violet-50 transition-colors duration-200">
            <div className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">{label}</div>
            <div className="text-xl font-bold text-gray-900 font-serif">
                {unit}{value}
            </div>
        </div>
    );
}
