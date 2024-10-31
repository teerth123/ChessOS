import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ColoringContributionGraph = ({ username }) => {
    const [gamesCountPerDay, setGamesperDay] = useState({});

    useEffect(() => {
        if (username) {
            axios.post(`http://localhost:3000/api/v1/graph/games`, { username })
                .then(response => {
                    setGamesperDay(response.data.gamesCountPerDay);
                })
                .catch(error => {
                    console.error("Error:", error);
                    setGamesperDay({});
                });
        }
    }, [username]);

    const ContributionHeatmap = ({ gamesCountPerDay }) => {
        const getDateRange = () => {
            const today = new Date();
            const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0); // Last day of the current month
            const startDate = new Date(endDate.getFullYear(), endDate.getMonth() - 5, 1); // Start from the beginning of 5 months back
            return { startDate, endDate };
        };
        

        const generateDates = () => {
            const { startDate, endDate } = getDateRange();
            const dates = [];
            const current = new Date(startDate);
        
            while (current <= endDate) {
                dates.push(new Date(current));
                current.setDate(current.getDate() + 1);
            }
        
            // Ensure no future dates are added
            const today = new Date();
            return dates.filter(date => date <= today);
        };

        const formatDateId = (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}.${month}.${day}`;
        };

        const getDayOfWeek = (date) => date.getDay();

        const getWeekGroups = () => {
            const dates = generateDates();
            const weeks = [];
            let currentWeek = [];
            const firstDay = getDayOfWeek(dates[0]);
            for (let i = 0; i < firstDay; i++) {
                currentWeek.push(null);
            }
            dates.forEach((date) => {
                if (getDayOfWeek(date) === 0 && currentWeek.length > 0) {
                    while (currentWeek.length < 7) {
                        currentWeek.push(null);
                    }
                    weeks.push(currentWeek);
                    currentWeek = [];
                }
                currentWeek.push(date);
            });
            if (currentWeek.length > 0) {
                while (currentWeek.length < 7) {
                    currentWeek.push(null);
                }
                weeks.push(currentWeek);
            }
            return weeks;
        };

        const getColor = (count) => {
            if (count === 0) return 'bg-zinc-500'; 
            if (count <= 5) return 'bg-custom-green-1';
            if (count <= 15) return 'bg-custom-green-2';
            if (count <= 20) return 'bg-custom-green-3';
            return 'bg-custom-green-4';
        };

        const weeks = getWeekGroups();
        const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        const getMonthLabels = () => {
            const dates = generateDates();
            const labels = [];
            let currentMonth = -1;
        
            dates.forEach((date) => {
                const month = date.getMonth();
                if (month !== currentMonth) {
                    currentMonth = month;
                    const firstOccurrenceIndex = labels.length * 7; // Calculate the start index of this month
                    const daysInMonth = new Date(date.getFullYear(), month + 1, 0).getDate(); // Get the number of days in the month
                    const centerPosition = firstOccurrenceIndex + Math.floor(daysInMonth / 2); // Center position for the label
                    labels.push({
                        month: months[month],
                        position: centerPosition
                    });
                }
            });
        
            return labels.slice(-6);
        };

        const monthLabels = getMonthLabels();
        const { startDate, endDate } = getDateRange();

        return (
            <div className="p-6 bg-[#363433] rounded-lg overflow-auto">
                <h2 className="text-xl font-bold mb-4 text-white">
                    {username}'s  Heatmap 
                    <span className="text-sm font-normal ml-2 text-gray-500">
                        {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
                    </span>
                </h2>
                <div className="flex gap-4 overflow-x-auto whitespace-nowrap">
                    {/* Days of week labels */}
                    <div className="flex flex-col gap-2 pt-8 text-sm text-gray-500">
                        {weekDays.map((day, index) => (
                            <div key={day} className="h-8">{index % 2 === 0 ? day : ''}</div>
                        ))}
                    </div>
                    
                    <div className="flex flex-col">
                        {/* Month labels */}
                        <div className="flex mb-2 text-sm text-gray-500">
                            {monthLabels.map((label, idx) => (
                                <div
                                    key={idx}
                                    className="inline-block "
                                    style={{ marginLeft: idx === 0 ? '0' : `${label.position * 32 - (monthLabels[idx-1]?.position || 0) * 32 - 32}px` }}
                                >
                                    {label.month}
                                </div>
                            ))}
                        </div>
                        
                        {/* Heatmap grid */}
                        <div className="flex gap-2">
                            {weeks.map((week, weekIndex) => (
                                <div key={weekIndex} className="flex flex-col gap-2">
                                    {week.map((date, dayIndex) => {
                                        const dateId = date ? formatDateId(date) : null;
                                        const count = dateId && gamesCountPerDay ? (gamesCountPerDay[dateId] || 0) : 0;
                                        return (
                                            <div
                                                key={dayIndex}
                                                id={dateId || `empty-${weekIndex}-${dayIndex}`}
                                                className={`w-8 h-8 rounded transition-colors ${getColor(count)}`}
                                                title={date ? `${date.toLocaleDateString()}: ${count} contributions` : ''}
                                            />
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <ContributionHeatmap gamesCountPerDay={gamesCountPerDay} />
    );
};

export default ColoringContributionGraph;