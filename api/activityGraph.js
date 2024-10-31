const axios = require("axios");

const userInfo = async (username) => {
    try {
        const response = await axios.get(`https://api.chess.com/pub/player/${username}`, {
            timeout: 10000
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const statsData = async (username) => {
    try {
        const response = await axios.get(`https://api.chess.com/pub/player/${username}/stats`, {
            timeout: 10000
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export default async (req, res) => {
    if (req.method === 'POST') {
        const { username } = req.body;
        const info = await userInfo(username);
        const stats = await statsData(username);

        if (info && stats) {
            return res.status(200).json({ userInfo: info, stats });
        } else {
            return res.status(500).json({ error: "Failed to fetch user info" });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
