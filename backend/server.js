import express from "express"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/auth.route.js"
import movieRoutes from "./routes/movie.route.js"
import tvRoutes from "./routes/tv.route.js"
import searchRoutes from "./routes/search.route.js"
import { ENV_VARS } from "./config/envVars.js"
import { connectDB } from "./config/db.js"
import { protectRoute } from "./middleware/protectRoute.js"
import watchlistRoutes from "./routes/watchlist.route.js"
import favouritesRoutes from "./routes/favourites.route.js"

const app = express()

const PORT = ENV_VARS.PORT

app.use(express.json())
app.use(cookieParser())
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", protectRoute, movieRoutes);
app.use("/api/v1/tv",  protectRoute, tvRoutes)
app.use("/api/v1/search", protectRoute, searchRoutes)
app.use("/api/v1/watchlist",protectRoute, watchlistRoutes)
app.use("/api/v1/favourites",protectRoute, favouritesRoutes)



app.listen(PORT, () => {
	console.log("Server started at http://localhost:" + PORT);
	connectDB()
});

