import express from "express";
import {
	addToWatchlist,
	removeFromWatchlist,
	getWatchlist,
} from "../controllers/watchlist.controller.js";

const router = express.Router();

router.post("/", addToWatchlist);
router.delete("/:contentId", removeFromWatchlist);
router.get("/", getWatchlist);

export default router;
