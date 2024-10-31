const router = require("express").Router();
const axios = require("axios");

const userInfo = async ({ username }) => {
    try {
        const response = await axios.get(`https://api.chess.com/pub/player/${username}`, {
            timeout: 100000
        });
        console.log("got the data");
        return response.data;
    } catch (e) {
        console.log(e);
        return null; 
    }
};

const statsData = async({username})=>{
    try {
        const response = await axios.get(`https://api.chess.com/pub/player/${username}/stats`, {
            timeout: 100000
        });
        console.log("got the data");
        return response.data;
    } catch (e) {
        console.log(e);
        return null; 
    }
}

var alldata = []

router.post('/info', async (req, res) => {
    const { username } = req.body; 
    const info = await userInfo({ username });
    const stats = await statsData({username})
    

    

    if (info && stats) {
        alldata.push(info);
        alldata.push(stats)
        res.json({
            userInfo: info,
            stats
        });
    } else {
        res.status(500).json({ error: "Failed to fetch user info" });
    }
});

module.exports = router;
