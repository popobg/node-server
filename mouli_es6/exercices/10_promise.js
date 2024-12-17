
/**
 * Créez une fonction synchrone qui attend 2 seconde
 *
 * utilisez new Promise
 */

// équivalent plus verbeux de :
// () => new Promise((resolve) => setTimeout(() => resolve()), 2000);
const sleep = () => {
    // reject non nécessaire
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 2000);
    });
};

module.exports = {sleep};