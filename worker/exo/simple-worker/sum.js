const {parentPort, workerData} = require("worker_threads");
const result = workerData.x + workerData.y;
parentPort.postMessage(result);