const {sleep} = require("../exercices/10_promise");

/**
 * Créez une fonction synchrone qui attend 2 secondes puis execute le callback passé en paramètre
 * vous pouvez utiliser la fonction sleep créé précedement: const {sleep} = require("../exercices/10_promise");
 *
 * Vous devez utiliser .then
 *
 * contraintes :
 *    - votre fonction doit être synchrone et ne pas retourner de Promise
 *    - ne pas utiliser async await
 *
 */

// équivalent plus verbeux de :
// (callback) => sleep().then(() => callback())
const usingThen = (callback) => {
    // on trouve parfois .catch() après .then() au cas où une erreur est levée
    sleep().then(() => {
        callback();
    })
}

/**
 * Créez une fonction asynchrone qui attend 2 secondes puis execute le callback passé en paramètre
 * vous pouvez utiliser la fonction sleep créé précedement: const {sleep} = require("../exercices/10_promise");
 *
 * Vous devez utiliser await
 *
 * contrainte:
 *   - votre fonction doit être asynchrone et retourner une Promise
 *   - ne pas utiliser .then
 */

const usingAwait = async (callback) => {
    await sleep();
    callback();
}

/**
 * Créez une fonction asynchrone qui effectue un appel api vers l'url passé en paramètre
 * retourne le résultat de la requête (data)
 *
 * Vous pouvez utiliser axios, mais n'oubliez pas d'installer le package et de l'importer
 * npm install axios
 *
 * votre réponse doit être un objet json
 *
 * url de test: https://jsonplaceholder.typicode.com/todos/1
 */

//décommentez la ligne suivante une fois le package installé
const axios = require("axios");

const apiResponse = async (url) => {
    return (await axios.get(url)).data;
}

module.exports = {usingThen, usingAwait, apiResponse};