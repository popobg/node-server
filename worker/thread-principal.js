const {Worker} = require("worker_threads");

console.log("Start thread principal");

const worker = new Worker("./worker.js");
const workerError  = new Worker("./thread-error.js");
let endOfThread = false;

worker.on("message", (msg) => {
    console.log(msg);
    endOfThread = true;
});

// doesn't stop the main thread
workerError.on("error", (err) => {
    console.error('Erreur dans le worker : ', err);
})

console.log("End thread principal");

const timer = setInterval(() => {
    // when the worker thread is done, this function stops
    if (endOfThread) {
        clearInterval(timer);
    }

    console.log("Hello");
}, 1000);