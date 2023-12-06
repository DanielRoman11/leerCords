import express from "express";
import dataRouter from "./routes/data.routes.js";

export const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

app.use('/geo', dataRouter);

