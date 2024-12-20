const {Worker} = require("worker_threads");
const worker = new Worker("./square.js");

const start = performance.now();

worker.on("message", (execTime) => {
    console.log(`Execution time worker thread : ${execTime} ms.`);
});

const end = performance.now();
console.log(`Execution time main thread : ${end - start} ms.`);