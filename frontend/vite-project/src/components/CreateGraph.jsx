import React, { useState, useEffect } from "react";
import axios from "axios";
import ContributionGraph from "./ColoringGraph";

export default function CreateGraph({ username }) {
    const [gamesperDay, setGamesperDay] = useState(null);
    const [loading, setLoading] = useState(true); // Set initial loading state to true

    useEffect(() => {
        if (username) {
            setLoading(true); // Start loading
            axios.post("https://chessmacbackend.onrender.com/api/v1/games", { username })
                .then(response => {
                    setGamesperDay(response.data);
                })
                .catch(error => {
                    console.error("Error:", error);
                })
                .finally(() => {
                    setLoading(false); // End loading
                });
        }
    }, [username]);

    // Show loading message or spinner while fetching data
    if (loading) {
        return <div>Loading data, please wait...</div>;
    }

    return (
        <div>
            {gamesperDay && <ContributionGraph gamesperDay={gamesperDay} />}
        </div>
    );
}
