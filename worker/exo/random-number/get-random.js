const { parentPort } = require("worker_threads");

parentPort.postMessage(Math.random());