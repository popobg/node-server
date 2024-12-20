const {parentPort} = require("worker_threads");

// thread différent du principal pour cette action
let i = 0;
while (i < 10000000000) {
    i++;
}

parentPort.postMessage("Worker finished");