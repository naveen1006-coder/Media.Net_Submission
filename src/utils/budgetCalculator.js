/**
 * Budget calculator with exact formulas
 * Base CPM = $4.50
 * Premium News => CPM = baseCPM × 1.6
 * Niche Blogs => CPM = baseCPM × 0.7
 * Reach = Math.floor((budget / CPM) * 1000)
 * Estimated Clicks = Math.round(Reach * CTR)
 * CPC = budget / EstClicks (handle divide-by-zero)
 */

const BASE_CPM = 4.50;

export function calculateMetrics(budget, publisherMix, ctr = 0.015) {
    // Calculate CPM based on publisher mix
    let cpm = BASE_CPM;

    if (publisherMix === 'premium') {
        cpm = BASE_CPM * 1.6; // $7.20
    } else if (publisherMix === 'niche') {
        cpm = BASE_CPM * 0.7; // $3.15
    }

    // Calculate reach
    const reach = Math.floor((budget / cpm) * 1000);

    // Calculate estimated clicks
    const estClicks = Math.round(reach * ctr);

    // Calculate CPC (handle divide-by-zero)
    const cpc = estClicks > 0 ? (budget / estClicks) : 0;

    return {
        cpm: cpm.toFixed(2),
        reach,
        estClicks,
        cpc: cpc.toFixed(2)
    };
}

export function calculateROAS(estClicks, budget) {
    // ROAS calculation
    // avgOrderValue = $25
    // conversionRate = 0.02 (2%)
    // estSales = estClicks * conversionRate
    // estRevenue = estSales * avgOrderValue
    // ROAS = estRevenue / budget

    const avgOrderValue = 25;
    const conversionRate = 0.02;

    const estSales = estClicks * conversionRate;
    const estRevenue = estSales * avgOrderValue;
    const roas = budget > 0 ? (estRevenue / budget) : 0;

    return {
        estSales: estSales.toFixed(1),
        estRevenue: estRevenue.toFixed(2),
        roas: roas.toFixed(2)
    };
}
