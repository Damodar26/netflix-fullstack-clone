import axios from "axios";
import { ENV_VARS } from "../config/envVars.js";

export const fetchFromTMDB = async (url) => {
	const options = {
		headers: {
			accept: "application/json",
			//Authorization: "Bearer " + ENV_VARS.TMDB_API_KEY,
            Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMjdiNTkxYTRhMWY0NGEzYmFhMjU3ZGI5ZWEyMGNjZSIsIm5iZiI6MTc0MTQ0MDI4Ni42NzYsInN1YiI6IjY3Y2M0NTFlMDVhZGZiOWViOTViYWQxYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AXpsT_00oQVlBNhyd6thCNBvcVHcT26OnTMy9lKYAxk" 
		},
	};

	const response = await axios.get(url, options);

	if (response.status !== 200) {
		throw new Error("Failed to fetch data from TMDB" + response.statusText);
	}

	return response.data;
};