import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Wrapped from './Wrapped';
import Safari from './Safari';


export default function Slate({ username , theme, font, color}) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [choice, setChoice] = useState(null);

    useEffect(() => {
        if (username!="Admin") {
            axios.post("https://chessmacbackend.onrender.com/api/v1/slate/info", { username })
                .then(response => {
                    setData(response.data);
                    setError(null); 
                })
                .catch(error => {
                    console.error("Error:", error);
                    setData(null);
                    setError("Failed to load data. Please try again later."); 
                });
        }
    }, [username]);

    if (error) {
        return <div className="text-red-500">{error}</div>; 
    }

    if (!data) {
        return <div className="text-white"></div>; 
    }

    const { userInfo, stats } = data;

    const {
        avatar,
        name,
        followers,
        country,
        status,
        last_online,
        url,
    } = userInfo || {};

    let totalGames = 0;
    let totalWins = 0;
    let totalLosses = 0;
    let totalDraws = 0;

    if (stats) {
        for (let gameType in stats) {
            const record = stats[gameType].record || { win: 0, loss: 0, draw: 0 };
            totalGames += record.win + record.loss + record.draw;
            totalWins += record.win;
            totalLosses += record.loss;
            totalDraws += record.draw;
        }
    }

    const ratings = [];
    if (stats) {
        for (let gameType in stats) {
            const bestRating = stats[gameType].best ? stats[gameType].best.rating : null;
            if (bestRating !== null) {
                ratings.push({ gameType, rating: bestRating });
            }
        }
    }

    // Sort the ratings from highest to lowest
    ratings.sort((a, b) => b.rating - a.rating);

    // Now you can map the ratings to show the game type and rating
    const sortedRatings = ratings.map(entry => `${entry.gameType}: ${entry.rating}`);

console.log(sortedRatings);
    return (
        <>
        <div className='flex justify-center items-center w-full'>
            {(theme == "Wrapped") && data && (
                <Wrapped 
                    avatar={avatar}
                    username={username}
                    name={name}
                    followers={followers}
                    country={country}
                    status={status}
                    last_online={last_online}
                    url={url}
                    totalGames={totalGames} 
                    totalWins={totalWins}
                    totalLosses={totalLosses}
                    totalDraws={totalDraws}
                    font={font}
                    rating={sortedRatings}
                />
            )}
            {(theme == "Safari") && data && (
                <Safari 
                    avatar={avatar}
                    username={username}
                    name={name}
                    followers={followers}
                    country={country}
                    status={status}
                    last_online={last_online}
                    url={url}
                    totalGames={totalGames} 
                    totalWins={totalWins}
                    totalLosses={totalLosses}
                    totalDraws={totalDraws}
                    font={font}
                    rating={sortedRatings}
                />
            )}
                    </div>

        </>

    
    );
}
