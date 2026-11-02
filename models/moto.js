import mongoose from "mongoose";

const MotoSchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true, "ID обязателен!"],
    trim: true,
    
  },
  brand: {
    type: String,
    required: [true, "Марка обязательна!"],
    trim: true,
  },
  model: {
    type: String,
    required: [true, "Модель обязательна!"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Цена обязательна!"],
    min: 0,
  },
  year: {
    type: Number,
    required: [true, "Год выпуска обязателен!"],
    min: 1900,
  },
  image: {
    type: String,
    required: [true, "Изображение обязательно!"],
  },
});

export default mongoose.model("Moto", MotoSchema);