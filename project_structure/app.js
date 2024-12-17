const express = require("express");
const app = express();
const userRouter = require("./app/router/userRouter");

app.use(express.json());
app.use(userRouter);

// Start the server
const PORT = 3000;
// http://localhost:3000/
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});

