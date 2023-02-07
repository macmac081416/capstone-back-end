const { Sequelize, DataTypes } = require("sequelize");
const express = require("express");
const login = require("./login");
const app = express();
app.use("/auth", login);

const sequelize = new Sequelize("shop", "root", "", {
    host: "localhost",
    dialect: "mysql",
});

sequelize
    .authenticate()
    .then(() => {
        console.log("Connection has been established successfully.");
    })
    .catch((error) => {
        console.error("Unable to connect to the database: ", error);
    });

const table = sequelize.define("table", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
    },
    image: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING,
    },
});

sequelize
    .sync()
    .then(() => {
        console.log("Table created successfully!");
    })
    .catch((error) => {
        console.error("Unable to create table : ", error);
    });
app.get("/productlist", (req, res) => {
    Model.findAll()
        .then((data) => res.json(data))
        .catch((err) => res.status(400).json("Error: " + err));
});
module.exports = { sequelize, table };
