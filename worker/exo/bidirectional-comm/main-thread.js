const {Worker} = require("worker_threads");

let n =2;
const worker1 = new Worker("./double.js", {workerData: n});
const worker2 = new Worker("./double.js", {workerData: 4});
const worker3 = new Worker("./double.js", {workerData: 8});
const worker4 = new Worker("./double.js", {workerData: 16});

worker1.on("message", (result) => {
    console.log("worker 1 : ", result);
    n = result;
});

worker1.on("message", (result) => {
    console.log("worker 1 : ", result);
    n = result;
});

worker1.on("message", (result) => {
    console.log("worker 1 : ", result);
    n = result;
});

worker2.on("message", (result) => {
    console.log("worker 2 : ", result);
});

worker3.on("message", (result) => {
    console.log("worker 3 : ", result);
});

worker4.on("message", (result) => {
    console.log("worker 4 : ", result);
});

console.log("n : ", n);