import express from "express";
import { Router } from "./router/router";
import { parseCSV } from "./Stream/dataStream";

const app = express();

app.use("/v1", express.json(), Router);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});

parseCSV()