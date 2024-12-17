const sleep = () => new Promise(resolve => setTimeout(resolve, 2000));

console.log("start");

sleep().then(() => {
    console.log("Hello");
}).catch(() => {
    console.log("catch");
});

// Si on veut attendre la réponse de sleep avant d'exécuter la suite du code
const usingAsyncCode = async () => {
    console.log("start");
    await sleep();
    console.log("end");
}