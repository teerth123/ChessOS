import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Wrapped from './Wrapped';
import Safari from './Safari';

export default function Slate({ username, theme, font, color }) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (username !== "Admin") {
            // Introduce a delay to simulate data fetching time
            setTimeout(() => {
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
            }, 2000); 
        }
    }, [username]);

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }
    if (!data) {
        return (
            <div className="flex justify-center items-center w-full bg-gray-100">
                <SkeletonWrapped />
            </div>
        );
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
    console.log(ratings) 


    // Sort the ratings from highest to lowest
    ratings.sort((a, b) => b.rating - a.rating);

    // Now you can map the ratings to show the game type and rating
    const sortedRatings = ratings.map(entry => `${entry.gameType}: ${entry.rating}`);

    console.log(sortedRatings);
    return (
        <>
            
            <div className='flex justify-center items-center w-full'>
                {theme === "Wrapped" && data && (
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
                {theme === "Safari" && data && (
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

function SkeletonWrapped() {
    return (
        <div className="border border-gray-400 p-4 rounded-lg animate-pulse bg-gray-500 w-full max-w-md">
            {/* Profile Section */}
            <div className="flex items-center mb-4">
                <div className="w-14 h-14 bg-gray-400 rounded-full mr-4"></div>
                <div className="flex-1">
                    <div className="h-4 bg-gray-400 rounded w-32 mb-2"></div>
                    <div className="h-3 bg-gray-400 rounded w-32"></div>
                </div>
            </div>

            {/* Heatmap (7 Rows, Multiple Columns) */}
            <div className="grid grid-rows-7 grid-flow-col gap-1 mb-4">
                {Array.from({ length: 147 }).map((_, i) => (
                    <div key={i} className="w-4 h-4 bg-gray-400 rounded"></div>
                ))}
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 gap-3">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="h-14 bg-gray-400 rounded-lg"></div>
                ))}
            </div>
        </div>
    );
}
