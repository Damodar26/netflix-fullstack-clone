import { User } from "../models/user.model.js";


export async function addToWatchlist(req, res) {
	try {
		const { contentId, title, image, contentType } = req.body;

        if (!contentId || !title || !image || !contentType) {
			return res.status(400).json({ success: false, message: "Missing required fields" });
		}

		const user = await User.findById(req.user._id);
		const isAlreadyInWatchlist = user.watchlist.some(item => item.id === contentId);

		if (isAlreadyInWatchlist) {
			return res.status(400).json({ success: false, message: "Item already in watchlist" });
		}

		await User.findByIdAndUpdate(req.user._id, {
			$addToSet: {
				watchlist: { id: contentId, title, image, contentType, addedAt: new Date() },
			},
		});

		res.status(200).json({ success: true, message: "Added to watchlist" });
	} catch (error) {
		console.error("Error in addToWatchlist:", error.message);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}


export async function removeFromWatchlist(req, res) {
	try {
		const { contentId } = req.params;

		await User.findByIdAndUpdate(req.user._id, {
			$pull: { watchlist: { id: contentId } },
		});

		res.status(200).json({ success: true, message: "Removed from watchlist" });
	} catch (error) {
		console.error("Error in removeFromWatchlist:", error.message);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}


export async function getWatchlist(req, res) {
	try {
		const user = await User.findById(req.user._id).select("watchlist");
		res.status(200).json({ success: true, content: user.watchlist });
	} catch (error) {
		console.error("Error in getWatchlist:", error.message);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}
