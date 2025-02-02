const axios = require("axios");
const { PrismaClient } = require("@prisma/client");
const { nodeModuleNameResolver } = require("typescript");

const prisma = new PrismaClient();

// Fetch user info from Chess.com API
const fetchUserInfo = async (username) => {
    try {
        const response = await axios.get(`https://api.chess.com/pub/player/${username}`, { timeout: 100000 });
        console.log("✔ User info fetched");
        return response.data;
    } catch (e) {
        console.error("❌ Error fetching user info:", e.message);
        return null;
    }
};

// Fetch chess stats from Chess.com API
const fetchStatsData = async (username) => {
    try {
        const response = await axios.get(`https://api.chess.com/pub/player/${username}/stats`, { timeout: 100000 });
        console.log("✔ Chess stats fetched");
        return response.data;
    } catch (e) {
        console.error("❌ Error fetching chess stats:", e.message);
        return null;
    }
};

// Controller to handle user data
const storeUserInfo = async (req, res) => {
    const { username } = req.body;

    if (!username) {
        return res.status(400).json({ error: "Username is required" });
    }

    const info = await fetchUserInfo(username);
    const stats = await fetchStatsData(username);

    if (!info || !stats) {
        return res.status(500).json({ error: "Failed to fetch user data" });
    }

    try {
        // Check if user already exists
        let user = await prisma.usersTable.findUnique({
            where: { username: info.username },
        });

        if (!user) {
            // Insert new user
            let countrycode = "unknown";  // default value
            if (info.country && info.country.includes("https://api.chess.com/pub/country/")) {
                console.log(countrycode);
                console.log(info.country);
                countrycode = info.country.split("/").pop().toUpperCase();  // extract "in", "us", etc.
                console.log(countrycode);
            }
            console.log(countrycode);
            console.log(info.country);
            user = await prisma.usersTable.create({
                data: {
                    username: info.username,
                    name: info.name || "Unknown",
                    url: info.url || "",
                    country: countrycode || "Unknown",
                    lastvisit: new Date(),
                    noofdownloads: 1,
                },
            });
            console.log("✔ New user added:", user.username);
        } else {
            // Update last visit time
            await prisma.usersTable.update({
                where: { username: info.username },
                data: { 
                    lastvisit: new Date(),
                    noofdownloads: {
                        increment: 1
                    },
                },

            });
            console.log("✔ User last visit updated:", user.username);
        }

        // Extract key chess stats
        const chessStats = {
            chess_rapid_rating: stats.chess_rapid?.last?.rating || 0,
            chess_blitz_rating: stats.chess_blitz?.last?.rating || 0,
            chess_bullet_rating: stats.chess_bullet?.last?.rating || 0,
            chess_daily_rating: stats.chess_daily?.last?.rating || 0,
            tactics_highest: stats.tactics?.highest?.rating || 0,
            puzzle_rush_best: stats.puzzle_rush?.best?.score || 0,
        };

        res.json({
            message: "User data fetched and stored successfully",
            userInfo: info,
            chessStats,
        });

    } catch (error) {
        console.error("❌ Database error:", error.message);
        res.status(500).json({ error: "Database operation failed" });
    }
};

module.exports = storeUserInfo 
