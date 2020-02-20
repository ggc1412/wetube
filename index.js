import express from "express"; //const express = require('express');
import morgan from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const app = express();
const PORT = 4000;


const handleLisetning = () =>
    console.log(`Lisetning on: http://localhost:${PORT}`);
// respond with "Hello from home" when a GET request is made to the homepage
const handleHome = (req, res) => res.send("Hello from home");
const handleProfile = (req, res) => res.send("You are on my profile");

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(helmet());
app.use(morgan("dev"));

app.get("/", handleHome);

app.get("/profile", handleProfile);

app.listen(PORT, handleLisetning);
