import { User } from "../models/user.model.js";


export async function addToFavourites(req, res) {
	try {
		const { contentId, title, image, contentType } = req.body;

        if (!contentId || !title || !image || !contentType) {
			return res.status(400).json({ success: false, message: "Missing required fields" });
		}


		const user = await User.findById(req.user._id);
		const isAlreadyInFavourites = user.favourites.some(item => item.id === contentId);

		if (isAlreadyInFavourites) {
			return res.status(400).json({ success: false, message: "Item already in favourites" });
		}


		await User.findByIdAndUpdate(req.user._id, {
			$addToSet: {
				favourites: { id: contentId, title, image, contentType, addedAt: new Date() },
			},
		});

		res.status(200).json({ success: true, message: "Added to favourites" });
	} catch (error) {
		console.error("Error in addToFavourites:", error.message);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

export async function removeFromFavourites(req, res) {
	try {
		const { contentId } = req.params;

		await User.findByIdAndUpdate(req.user._id, {
			$pull: { favourites: { id: contentId } },
		});

		res.status(200).json({ success: true, message: "Removed from favourites" });
	} catch (error) {
		console.error("Error in removeFromFavourites:", error.message);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}


export async function getFavourites(req, res) {
	try {
		const user = await User.findById(req.user._id).select("favourites");
		res.status(200).json({ success: true, content: user.favourites });
	} catch (error) {
		console.error("Error in getFavourites:", error.message);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}
