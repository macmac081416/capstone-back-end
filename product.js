const { Sequelize, DataTypes } = require("sequelize");
const express = require("express");
const login = require("./login");
const app = express();

app.use("/auth", login);

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

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

const tables = sequelize.define(
    "tables",
    {
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
    },
    {
        timestamps: true,
    }
);

sequelize
    .sync({ force: true }) // This line will drop and re-create the table
    .then(() => {
        console.log("Table created successfully!");
    })
    .catch((error) => {
        console.error("Unable to create table : ", error);
    });
app.get("/", (req, res) => {
    tables
        .findAll()
        .then((data) => res.json(data))
        .catch((err) => res.status(400).json("Error: " + err));
});
app.listen(9000, () => {
    console.log("Server is running on port 9000");
});

module.exports = { sequelize, tables };
