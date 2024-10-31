import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Slate({ username }) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [hoverPawns, setHoverPawns] = useState(false)
    const [hoverDev, setHoverDev] = useState(false);

    useEffect(() => {
        if (username) {
            axios.post("http://localhost:3000/api/v1/slate/info", { username })
                .then(response => {
                    setData(response.data);
                    setError(null); // Reset error state on successful fetch
                })
                .catch(error => {
                    console.error("Error:", error);
                    setData(null);
                    setError("Failed to load data. Please try again later."); // Set error message
                });
        }
    }, [username]);

    if (error) {
        return <div className="text-red-500">{error}</div>; // Display error message
    }

    if (!data) {
        return <div className="text-white">Loading...</div>; // Optional loading state
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
            if (bestRating !== null) ratings.push(bestRating);
        }
    }

    ratings.sort((a, b) => b - a);

    return (
        <div className='flex justify-between'>
           <div className='flex flex-col'>
    <div onMouseEnter={() => setHoverPawns(true)} onMouseLeave={() => setHoverPawns(false)}>
        <h1 className='font-sans font-black text-[40px] w-[400px] mt-3 m-5 cursor-pointer text-[#fea357]'>
            <span className='inline-block transform transition-transform duration-300 hover:rotate-12' role="img" aria-label="pawn">♟️</span> 
            Wait...!!! Heatmap takes 60-90 secs to generate.
            <span className='inline-block transform transition-transform duration-300 hover:rotate-12' role="img" aria-label="pawn">♟️</span>
        </h1>
        {hoverPawns && (
            <div className={`ml-0 mt-1 p-1 w-min text-white rounded bg-[#363433]`}>
                bad move
            </div>
        )}
    </div>

    <div className='mt-5'>
        <div 
            onMouseEnter={() => setHoverDev(true)} 
            onMouseLeave={() => setHoverDev(false)}
            className='relative cursor-pointer'
        >
            <div
                onClick={() => setUsername(input)}
                className='bg-[#81b64c] text-white p-3 py-1 mb-5 rounded'
            >
                ❤️ By ❤️ 
                <h1 className='font-black text-[28px]'>AT</h1>
            </div>

            {hoverDev && (
                <div className="absolute left-0 mt-1 p-1 w-min text-white rounded bg-[#363433]">
                    <div className='text-blue-500'>A: <i class="ri-twitter-x-fill"></i>@KulkarniArth</div>
                    <div className='text-blue-500'>T: <i class="ri-twitter-x-fill"></i>@DexTee_17</div>
                </div>
            )}
        </div>
    </div>
</div>


            <div>
                <div className="flex justify-center items-center  mt-0">
                    <div className='rounded-2xl bg-[#32302F] h-[400px] w-[1360px] m-7 flex items-center justify-center mt-3'>
                        <div className='rounded-2xl m-5 border border-[#666658] h-[380px] w-[1300px] flex'>
                            <div className='avatar-div flex-none'>
                                <img src={avatar} alt={`${name}'s avatar`} className="rounded-lg large-avatar mt-20 ml-6 border-2 border-white" />
                            </div>
                            <div className='first-part flex-grow p-4 max-w-[450px]'>
                                <div className=' text-left p-2 rounded-lg  text-white font-bold mt-14 bg-[#4d4a49]'>Username: {username}</div>
                                <div className='text-left p-2 rounded-lg  text-white font-bold mt-5 bg-[#4d4a49]'>Full Name: {name}</div>
                                <div className='flex justify-between'>
                                    <div className='text-left p-2 rounded-lg  text-white font-bold mt-5 bg-[#4d4a49]'>Followers: {followers}</div>
                                    <div className='text-left p-2 rounded-lg  text-white font-bold mt-5 bg-[#4d4a49]'>Country: {country.split('/').pop()}</div>
                                </div>
                                <div className='flex justify-between'>
                                    <div className='text-left p-2 rounded-lg  text-white font-bold mt-5 bg-[#4d4a49]    '>Status: {status}</div>
                                    <div className='text-left p-2 rounded-lg  text-white font-bold mt-5 bg-[#4d4a49]'>Last Online:
                                        <span className='text-green-500'>{new Date(last_online * 1000).toLocaleString()}</span></div>
                                </div>
                            </div>
                            <div className="border-l border-dotted border-[#666658] mx-4"></div>
                            <div className='second-part flex p-4'>
                                <div className='flex-grow'>
                                    <div className='text-left p-2 rounded-lg  text-white font-bold mt-14 bg-[#4d4a49]'>
                                        View Full Profile: <a href={url} target='_blank' rel="noopener noreferrer">Profile Link</a>
                                    </div>
                                    <div className='border-2 text-left p-2 rounded-lg border-white text-white font-bold mt-5 h-40'>
                                        Total Games Played: <br />
                                        <span className="text-yellow-500 text-5xl pt-5 ml-10 block">{totalGames}</span>
                                    </div>
                                </div>
                                <div className='text-left p-2 rounded-lg  text-white font-bold  bg-[#4d4a49] mt-14 ml-5 h-60'>
                                <h3 className='text-lg font-semibold mb-2'>Matches</h3>
                                    <div className='text-white my-8 '><i class="ri-add-box-fill " style={{ color: 'rgb(17,153,51)' }} ></i> : {totalWins}</div>
                                    <div className='text-white my-5'><i class="ri-article-fill" ></i>: {totalDraws}</div>
                                    <div className='text-white my-10'><i class="ri-file-reduce-fill" style={{ color: 'rgb(251,65,44)' }}></i> : {totalLosses}</div>
                                </div>
                                <div className='text-left p-4 rounded-lg text-white font-bold bg-[#4d4a49] mt-14 ml-5 h-60 flex flex-col transition-transform transform hover:scale-105'>
                                    <h3 className='text-lg font-semibold mb-2'>Top Ratings</h3>
                                    {ratings.map((rating, index) => (
                                        <div key={index} className='text-white my-2'>
                                            Rapid - {rating}
                                        </div>
                                    ))}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
