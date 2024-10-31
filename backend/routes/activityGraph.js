const router = require("express").Router();
const axios = require("axios")
var games = async(username, month, year) =>{
    

    const response = await axios.get(`https://api.chess.com/pub/player/${username}/games/${year}/${month}` , {
        timeout:100000
    })
    console.log("got the data")
    return response.data;
    
}

const today = new Date();
const todayY = today.getFullYear(); 
var month = today.getMonth() + 1; 
let startY = todayY - 1; 

var gamesPerDay = (data) => {
    const gamesCount = {};

    // Loop through all games in the data
    data.forEach(monthData => {
        if (monthData.games && monthData.games.length > 0) {
            monthData.games.forEach(game => {
                // Extract the date from the game's PGN
                const match = game.pgn.match(/\[Date \"(\d{4}\.\d{2}\.\d{2})\"\]/);
                if (match) {
                    const date = match[1]; // e.g., "2023.10.01"
                    if (!gamesCount[date]) {
                        gamesCount[date] = 0;
                    }
                    gamesCount[date]++;
                }
            });
        }
    });

    return gamesCount; // This will return an object with date as key and number of games as value
};

// Example usage inside your route handler after fetching all data
router.post("/games", async (req, res) => {
    try {
        const username = req.body.username;
        const allData = []; 

        // Fetch data for each month
        for (let i = month; i <= 12; i++) {
            const newmonth = i < 10 ? `0${i}` : `${i}`; 
            const data = await games(username, newmonth, startY);
            allData.push(data); 
        }

        for (let i = 1; i <= month; i++) {
            const newmonth = i < 10 ? `0${i}` : `${i}`; 
            const data = await games(username, newmonth, todayY);
            if (data) {
                allData.push(data);
            }
        }

        // Calculate games played per day
        const gamesCountPerDay = gamesPerDay(allData);

        res.json({
            
            gamesCountPerDay
        }); 
    } catch (e) {
        res.json({ 
            error: e.message 
         }); 
    }
});


// var gamesPerDay = async()=>{
//     for(var i=0; i<games.length(); i++){

//     }
// }

module.exports = router




// old code - 
// const router = require("express").Router();
// const axios = require("axios")
// var games = async(username, month, year) =>{
    

//     const response = await axios.get(https://api.chess.com/pub/player/${username}/games/${year}/${month} , {
//         timeout:100000
//     })
//     console.log("got the data")
//     return response.data;
    
// }

// const today = new Date();
// const todayY = today.getFullYear(); 
// var month = today.getMonth() + 1; 
// let startY = todayY - 1; 

// router.post("/games", async (req, res) => {
//     try {
//         const username = req.body.username;
//         const allData = []; 

//         for (let i = month; i <= 12; i++) {
//             const newmonth = i < 10 ? 0${i} : ${i}; 
//             const data = await games(username, newmonth, startY);
//             allData.push(data); 
//         }

//         for (let i = 1; i <= month; i++) {
//             const newmonth = i < 10 ? 0${i} : ${i}; 
//             const data = await games(username, newmonth, todayY);
//             if (data) {
//                 allData.push(data);
//             }
//         }

//         res.json(allData); 
//     } catch (e) {
//         res.json({ 
//             error: e.message 
//          }); 
//     }
// });

// var gamesPerDay = async()=>{
//     for(var i=0; i<games.length(); i++){

//     }
// }

// module.exports = router