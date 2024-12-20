// Rien ne se passe tant que le programme n'est pas terminé ;
// il peut être intéressant d'avoir un autre node pour exécuter cette action --> multithreading

// Le set ne pourra pas s'exécuter tant que le while n'aura pas fini
setInterval(() => {
    console.log("Hello");
}, 1000);

let i = 0;
console.log("start");

while (i < 1000000000) {
    i++;
}

console.log("End");