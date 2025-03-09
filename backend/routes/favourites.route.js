import express from "express";
import {
	addToFavourites,
	removeFromFavourites,
	getFavourites,
} from "../controllers/favourites.controller.js";

const router = express.Router();

router.post("/", addToFavourites);
router.delete("/:contentId", removeFromFavourites);
router.get("/", getFavourites);

export default router;
