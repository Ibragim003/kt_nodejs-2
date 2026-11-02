import Moto from "./models/moto.js";
import fileService from "./fileService.js";

class MotoController {
    async getMotos(req, res) {
        try {
            const motos = await Moto.find();
            res.json(motos);
            console.log(motos);
        } catch (error) {
            console.log("Ошибка при получении мотоцикла: " + error);
        }
    }

    async addMoto(req, res) {
        try {
            let fileName = null;
            console.log(req.files?.image);

            if (req.files && req.files.image) {
                fileName = await fileService.saveFile(req.files.image);
                if (!fileName) {
                    return res.status(500).send("Ошибка при сохранении файла");
                }
            }

            const { id, brand, price, model, year } = req.body;
            
            const newMoto = await Moto.create({
                id,
                brand,
                price,
                model,
                year,
                image: fileName || req.body.image 
            });

            res.send("Мотоцикл успешно добавлен!");
        } catch (error) {
            console.log("Ошибка при добавлении мотоцикла: " + error);
            res.status(500).send("Ошибка сервера");
        }
    }

    async updateMoto(req, res) {
        try {
            const { id } = req.params; 
            let updateData = { ...req.body };

            if (req.files && req.files.image) {
                const fileName = await fileService.saveFile(req.files.image);
                if (fileName) {
                    updateData.image = fileName;
                }
            }

            const updatedMoto = await Moto.findByIdAndUpdate(id, updateData, { new: true });

            if (!updatedMoto) {
                return res.status(404).send("Мотоцикл не найден");
            }

            res.json(updatedMoto);
        } catch (error) {
            console.log("Ошибка при обновлении мотоцикла: " + error);
            res.status(500).send("Ошибка сервера");
        }
    }

    async deleteMoto(req, res) {
        try {
            const { id } = req.params; 
            
            const moto = await Moto.findByIdAndDelete(id);

            if (!moto) {
                return res.status(404).send("Мотоцикл не найден");
            }

            res.send("Мотоцикл успешно удалён!");
        } catch (error) {
            console.log("Ошибка при удалении мотоцикла: " + error);
            res.status(500).send("Ошибка сервера");
        }
    }
}

export default new MotoController();