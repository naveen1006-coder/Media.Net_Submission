/**
 * Policy filter to flag prohibited words
 * Returns array of warnings if flagged words are found
 */

const FLAGGED_WORDS = ['fda', 'clinically', 'cure', 'guarantee', 'risk-free'];

export function checkPolicy(text) {
    const lowerText = text.toLowerCase();
    const warnings = [];

    FLAGGED_WORDS.forEach(word => {
        if (lowerText.includes(word)) {
            warnings.push({
                word: word,
                message: `Warning: "${word}" may violate advertising policies. Claims must be substantiated.`
            });
        }
    });

    return warnings;
}
