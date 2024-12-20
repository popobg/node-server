const {Worker} = require("worker_threads");

const worker = new Worker("./sum.js", {workerData: {x: 3, y: 20}});

worker.on("message", (result) => {
    console.log(result);
});