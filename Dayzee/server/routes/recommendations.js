import express from "express";
import { getRecommendations } from "../controllers/recommendationsController.js";

const router = express.Router();

router.post("/", getRecommendations);

export default router; 