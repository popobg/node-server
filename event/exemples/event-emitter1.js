// Utile, par exemple dans les web sockets
const EventEmitter = require("events");
const em = new EventEmitter();

// PREMIERE FACON : ECRITURE MANUELLE DES EVENTS
// Dans une app
em.on("greet", () => {
    console.log("Bonjour tout le monde");
});

// Dans une autre app
em.emit("greet");

em.on("event-with-param", (data) => {
    console.log("data received", data);
});

em.emit("event-with-param", {message: "hello from em"});

