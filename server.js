import express from "express";
import mongoose from "mongoose";

import router from "./router.js";

const app = express();
const PORT = 5000;
app.use(express.json())


app.use( router)

mongoose
  .connect("mongodb://localhost:27017/motos")
  .then(() => {
    console.log("Успешное подключение к БД");
  })
  .catch((error) => {
    console.log("Ошибка при подключении к БД: " + error);
  });




  app.listen(PORT, () =>{
    console.log("Сервер успешно запущен на порту: " + PORT);
    
  })
