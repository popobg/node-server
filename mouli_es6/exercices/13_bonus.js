/**

Exercice : Trouver la fréquence des mots dans une phrase

Objectif :
Écrire une fonction qui prend en entrée une chaîne de caractères et qui retourne un objet où les clés sont les mots de la phrase et les valeurs sont le nombre de fois où ces mots apparaissent.

Consignes :

Convertir la phrase en tableau de mots.
Utiliser la méthode .reduce() pour compter la fréquence des mots.
Retourner l'objet avec les fréquences.

ex: la pomme est rouge et la banane est jaune
{
  "la": 2,
  "pomme": 1,
  "est": 2,
  "rouge": 1,
  "et": 1,
  "banane": 1,
  "jaune": 1
}

 */

const countWords = (str) => {
    if (str === "") {
        return {};
    }

    // on pourrait couper en prenant en compte la ponctuation en plus des espaces
    // à l'aide d'une regex comme /[\s,.'!?]+/
    const words = str.trim().split(" ");

    return obj = words.reduce((acc, word) => {
        acc[word] = (acc[word] || 0) + 1;
        return acc;
    }, {});
};

/**
Exercice : Trier un objet par valeur

Objectif :
Écrire une fonction qui prend en entrée un objet et qui retourne un
nouvel objet dont les propriétés sont triées en fonction de leurs valeurs, en ordre croissant.

exemple:
{
  "pommes": 3,
  "bananes": 1,
  "cerises": 8
};

->

{
  "bananes": 1,
  "pommes": 3,
  "cerises": 8
}

*/

const sortObjectByValue = (obj) => {
    // convertir l'objet en tableau pour pouvoir utiliser la méthode sort
    const arr = Object.entries(obj);
    arr.sort((a, b) => a[1] - b[1]);
    return Object.fromEntries(arr);
};

module.exports = { countWords, sortObjectByValue };