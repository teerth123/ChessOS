const axios = require("axios");

const games = async (username, month, year) => {
    try {
        const response = await axios.get(`https://api.chess.com/pub/player/${username}/games/${year}/${month}`, {
            timeout: 10000
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const gamesPerDay = (data) => {
    const gamesCount = {};
    data.forEach(monthData => {
        if (monthData.games && monthData.games.length > 0) {
            monthData.games.forEach(game => {
                const match = game.pgn.match(/\[Date \"(\d{4}\.\d{2}\.\d{2})\"\]/);
                if (match) {
                    const date = match[1];
                    gamesCount[date] = (gamesCount[date] || 0) + 1;
                }
            });
        }
    });
    return gamesCount;
};

export default async (req, res) => {
    if (req.method === 'POST') {
        const { username } = req.body;
        const today = new Date();
        const todayY = today.getFullYear();
        let month = today.getMonth() + 1; 
        let startY = todayY - 1; 
        const allData = [];

        try {
            for (let i = month; i <= 12; i++) {
                const newMonth = i < 10 ? `0${i}` : `${i}`;
                const data = await games(username, newMonth, startY);
                allData.push(data);
            }

            for (let i = 1; i <= month; i++) {
                const newMonth = i < 10 ? `0${i}` : `${i}`;
                const data = await games(username, newMonth, todayY);
                if (data) {
                    allData.push(data);
                }
            }

            const gamesCountPerDay = gamesPerDay(allData);
            res.json({ gamesCountPerDay });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
    