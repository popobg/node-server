const {parentPort} = require("worker_threads");

// Throws an error to the main thread
const a = 1;
a = 2;

parentPort.postMessage("Worker error finished");