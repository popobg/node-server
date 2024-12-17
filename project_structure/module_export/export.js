const sayHello = () => {
    console.log("Hello");
}

const sayBye = () => {
    console.log("Bye");
}

// exporter les fonctions de ce fichier
module.exports = {sayHello, sayBye};