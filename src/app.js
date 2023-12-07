import express from "express";
import dataRouter from "./routes/data.routes.js";
import cors from "cors";
export const app = express();

app.use(express.static('./public'));
app.use(express.urlencoded({extended: false}));
app.use(cors({
  origin: '*'
}))

app.use('/geo', dataRouter);
