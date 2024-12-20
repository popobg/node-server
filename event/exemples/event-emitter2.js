const EventEmitter = require("events");

// DEUXIEME FACON : CREER UNE CLASSE EVENEMENT
class MyEmitter extends EventEmitter {
    constructor() {
        super();
        this.counter = 0;
    }

    increment = () => {
        this.counter++;
        this.emit("increment", this.counter);
    }

    decrement = () => {
        this.counter--;
        this.emit("decrement", this.counter);
    }

    getStatus = () => {
        console.log(this.counter);
        this.emit("status", this.counter);
    }

    triggerEvent = () => {
        this.emit("customEvent");
    }
}

const myEvent = new MyEmitter();

myEvent.on("increment", (counter) => {
    console.log("event on increment", counter);
});

myEvent.on("decrement", (counter) => {
    console.log("event on decrement", counter);
});

myEvent.on("status", (counter) => {
    console.log("event on status", counter);
});

myEvent.on("customEvent", () => {
    console.log("on custom event");
})

myEvent.increment();
myEvent.increment();
myEvent.decrement();
myEvent.getStatus();
myEvent.triggerEvent();