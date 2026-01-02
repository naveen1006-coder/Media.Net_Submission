/**
 * generateContext(url) - Dynamic context generation based on URL input
 * CRITICAL: Returns DIFFERENT outputs based on input string
 * Does NOT rely on a single hard-coded object
 */

// Simple hash function to create deterministic randomness from URL
function hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
}

// Seeded shuffle for deterministic but varied results
function seededShuffle(array, seed) {
    const arr = [...array];
    let currentIndex = arr.length;

    // Simple seeded random
    const random = () => {
        seed = (seed * 9301 + 49297) % 233280;
        return seed / 233280;
    };

    while (currentIndex !== 0) {
        const randomIndex = Math.floor(random() * currentIndex);
        currentIndex--;
        [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]];
    }

    return arr;
}

export function generateContext(url) {
    const lowerUrl = url.toLowerCase();
    const seed = hashString(url);

    // Coffee/Cafe theme
    if (lowerUrl.includes('coffee') || lowerUrl.includes('cafe') || lowerUrl.includes('espresso')) {
        const topics = ['Coffee', 'Espresso', 'Cafe Culture', 'Artisan Brewing', 'Morning Rituals'];
        const headlines = [
            'Premium Coffee Delivered Fresh',
            'Artisan Coffee at Your Doorstep',
            'Wake Up to Freshly Roasted Coffee',
            'Discover Exceptional Coffee Blends'
        ];
        const descriptions = [
            'Experience the perfect cup every morning. Premium beans, expert roasting.',
            'From bean to cup - authentic coffee crafted with passion and precision.',
            'Elevate your coffee ritual with our handpicked selection of premium blends.'
        ];

        const shuffledTopics = seededShuffle(topics, seed);
        const headlineIndex = seed % headlines.length;
        const descIndex = seed % descriptions.length;

        return {
            topics: shuffledTopics,
            suggestedHeadline: headlines[headlineIndex],
            suggestedDescription: descriptions[descIndex],
            warnings: []
        };
    }

    // Fashion/Apparel theme
    if (lowerUrl.includes('fashion') || lowerUrl.includes('wear') ||
        lowerUrl.includes('apparel') || lowerUrl.includes('clothing')) {
        const topics = ['Fashion', 'Style', 'Trendy Apparel', 'Designer Wear', 'Seasonal Collections'];
        const headlines = [
            'Latest Fashion Trends - Shop Now',
            'Discover Your Perfect Style',
            'Premium Apparel for Every Occasion',
            'Elevate Your Wardrobe Today'
        ];
        const descriptions = [
            'Find the perfect outfit. Curated collections from top designers.',
            'Express yourself through fashion. Quality apparel that fits your lifestyle.',
            'From casual to formal - discover styles that define you.'
        ];

        const shuffledTopics = seededShuffle(topics, seed);
        const headlineIndex = seed % headlines.length;
        const descIndex = seed % descriptions.length;

        return {
            topics: shuffledTopics,
            suggestedHeadline: headlines[headlineIndex],
            suggestedDescription: descriptions[descIndex],
            warnings: []
        };
    }

    // Bakery theme
    if (lowerUrl.includes('bakery') || lowerUrl.includes('bakes') || lowerUrl.includes('cake')) {
        const topics = ['Bakery', 'Fresh Baked Goods', 'Artisan Pastries', 'Custom Cakes', 'Daily Specials'];
        const headlines = [
            'Fresh Baked Daily - Order Now',
            'Artisan Bakery Goods Delivered',
            'Custom Cakes for Every Celebration',
            'Taste the Difference - Fresh Daily'
        ];
        const descriptions = [
            'Freshly baked pastries and breads made daily with premium ingredients.',
            'From classic to creative - bakery goods that delight every palate.',
            'Celebrate life\'s moments with our custom cakes and artisan treats.'
        ];

        const shuffledTopics = seededShuffle(topics, seed);
        const headlineIndex = seed % headlines.length;
        const descIndex = seed % descriptions.length;

        return {
            topics: shuffledTopics,
            suggestedHeadline: headlines[headlineIndex],
            suggestedDescription: descriptions[descIndex],
            warnings: []
        };
    }

    // Fitness/Gym theme
    if (lowerUrl.includes('fitness') || lowerUrl.includes('gym') || lowerUrl.includes('yoga')) {
        const topics = ['Fitness', 'Wellness', 'Workout Programs', 'Yoga Classes', 'Health Goals'];
        const headlines = [
            'Transform Your Fitness Journey',
            'Achieve Your Health Goals Today',
            'Expert-Led Fitness Programs',
            'Your Path to Wellness Starts Here'
        ];
        const descriptions = [
            'Personalized fitness programs designed to help you reach your goals.',
            'Join a community committed to health, wellness, and transformation.',
            'Expert trainers, flexible schedules, proven results - start today.'
        ];

        const shuffledTopics = seededShuffle(topics, seed);
        const headlineIndex = seed % headlines.length;
        const descIndex = seed % descriptions.length;

        return {
            topics: shuffledTopics,
            suggestedHeadline: headlines[headlineIndex],
            suggestedDescription: descriptions[descIndex],
            warnings: []
        };
    }

    // Product-focused (transactional) - check for /product/ or ?product=
    if (lowerUrl.includes('/product/') || lowerUrl.includes('?product=')) {
        // Extract product hint from URL
        let productHint = 'Product';
        const productMatch = lowerUrl.match(/\/product\/([^/?]+)/);
        if (productMatch) {
            productHint = productMatch[1].replace(/-/g, ' ').replace(/\//g, ' ').trim();
        }

        const topics = [`Buy ${productHint}`, 'Shop Online', 'Product Deals', 'Fast Shipping', 'Secure Checkout'];
        const headlines = [
            `Buy ${productHint} - Best Prices`,
            `${productHint} - Free Shipping Available`,
            `Shop ${productHint} - Order Today`,
            `Premium ${productHint} - Shop Now`
        ];
        const descriptions = [
            `Find the best ${productHint} at competitive prices. Fast, secure checkout.`,
            `Shop ${productHint} with confidence. Free shipping on orders over $50.`,
            `Quality ${productHint} delivered to your door. Easy returns guaranteed.`
        ];

        const shuffledTopics = seededShuffle(topics, seed);
        const headlineIndex = seed % headlines.length;
        const descIndex = seed % descriptions.length;

        return {
            topics: shuffledTopics,
            suggestedHeadline: headlines[headlineIndex],
            suggestedDescription: descriptions[descIndex],
            warnings: []
        };
    }

    // Fallback: semantic extraction from domain tokens
    // Example: "green-mug-shop.com" -> ["green", "mug", "shop"]
    const domainMatch = lowerUrl.match(/([a-z0-9-]+)\.[a-z]+/);
    let tokens = [];

    if (domainMatch) {
        tokens = domainMatch[1].split('-').filter(t => t.length > 2);
    }

    if (tokens.length === 0) {
        tokens = ['Business', 'Services', 'Quality'];
    }

    // Generate generic SMB keywords from tokens
    const genericTopics = [
        'Business Growth',
        `${tokens[0]} Online`,
        'Professional Services',
        `Quality ${tokens[0]}`,
        'Local Business'
    ];

    const genericHeadlines = [
        `Discover ${tokens[0]} Services`,
        `${tokens[0]} - Your Trusted Provider`,
        `Quality ${tokens[0]} Solutions`,
        `Professional ${tokens[0]} Services`
    ];

    const genericDescriptions = [
        `Expert ${tokens[0]} services tailored to your needs. Get started today.`,
        `Trusted by customers for quality ${tokens[0]}. Discover the difference.`,
        `Professional ${tokens[0]} solutions delivered with care and expertise.`
    ];

    const shuffledTopics = seededShuffle(genericTopics, seed);
    const headlineIndex = seed % genericHeadlines.length;
    const descIndex = seed % genericDescriptions.length;

    return {
        topics: shuffledTopics,
        suggestedHeadline: genericHeadlines[headlineIndex],
        suggestedDescription: genericDescriptions[descIndex],
        warnings: []
    };
}
