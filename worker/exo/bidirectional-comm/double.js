const {parentPort, workerData} = require("worker_threads");
const result = workerData * 2;
parentPort.postMessage(result);