const {Worker} = require("worker_threads");

const worker = new Worker("./get-random.js");

worker.on("message", (n) => {
    console.log(n);
})