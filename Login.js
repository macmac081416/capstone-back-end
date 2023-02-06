const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

const users = [
    {
        username: "try",
        password: "123456",
    },
    {
        username: "try2",
        password: "123456",
    },
];

app.post("/login", (req, res) => {
    const { username, password } = req.body;

    const user = users.find(
        (user) => user.username === username && user.password === password
    );

    if (!user) {
        return res
            .status(401)
            .json({ message: "Incorrect username or password" });
    }

    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

    res.json({ token });
});

module.exports = app;
