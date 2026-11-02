import { Router } from "express";
import MotoController from "./MotoController.js";

const router = new Router();

router.get("/motos", MotoController.getMotos);
router.post("/addmoto", MotoController.addMoto);
router.patch("/moto/:id", MotoController.updateMoto);
router.put("/moto/:id", MotoController.updateMoto);
router.delete("/deletemoto/:id", MotoController.deleteMoto);

export default router;