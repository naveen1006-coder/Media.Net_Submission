/**
 * LocalStorage utilities for campaign persistence
 */

const CAMPAIGNS_KEY = 'medianet_campaigns';

export function saveCampaign(campaign) {
    const campaigns = getCampaigns();
    campaigns.push(campaign);
    localStorage.setItem(CAMPAIGNS_KEY, JSON.stringify(campaigns));
}

export function getCampaigns() {
    const stored = localStorage.getItem(CAMPAIGNS_KEY);
    return stored ? JSON.parse(stored) : [];
}

export function getCampaignById(id) {
    const campaigns = getCampaigns();
    return campaigns.find(c => c.id === id);
}

export function clearCampaigns() {
    localStorage.removeItem(CAMPAIGNS_KEY);
}
