const express = require("express");
const userRouter = require("./router/userRouter");
const app = express();

app.use(express.json());
app.use(userRouter);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});

// global middleware: 404 route not found
app.use((req, res) => {
    console.error(err.stack);
    res.status(404).json({ error: "Route not found." });
});

// global middleware: 500 server error
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal server error." });
});