const {parentPort} = require("worker_threads");
const start = performance.now();

for (let i = 1; i < 1000000; i++) {
    j = i * i;
}

const end = performance.now();
parentPort.postMessage(end - start);