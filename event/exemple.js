const EventEmitter = require("events");
const em = new EventEmitter();

// Dans une app
em.on("monEvent", () => {
    console.log("Mon event");
});

// Dans une autre app
em.emit("monEvent");