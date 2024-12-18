// Middlewares gestion d'erreurs
const nameIsValid = (req, res, next) => {
    const {name} = req.body;

    if (!name || typeof name != 'string' || name === "") {
        return res.status(400).json({error: "The name must have at least one character."});
    }

    next();
}

const ageIsValid = (req, res, next) => {
    const {age} = req.body;

    if (!age || !Number.isInteger(age) || age < 0) {
        return res.status(400).json({error: "The age must be a positive integer."});
    }

    next();
}

module.exports = {nameIsValid, ageIsValid};