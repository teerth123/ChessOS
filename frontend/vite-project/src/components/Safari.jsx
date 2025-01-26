import ColoringContributionGraph from "./ColoringGraph"

export default function Safari({ avatar, username, name, followers, country, status, last_online, url, totalGames, totalWins, totalLosses, totalDraws , font, rating}) {
    const winPercentage = ((totalWins / totalGames) * 100).toFixed(2);
    font = font.trim();
    font = font.toLowerCase();
    font = font.split(' ').join(''); 

    console.log(name);  
    console.log(font, rating);
    
    const topRatings = rating.slice(0, 3);

    const [first, second, third] = topRatings.map(rating => {
        const [gameType, ratingValue] = rating.split(": ");
        return { gameType, ratingValue };
    });
    
    const color1 = ["#4cc762", "#1c3024", "#8bf7a3", "#406747", "#4c6e45", "#18251d", "#18251a", "#3f4641"]
    const color2 = ["#4cc5c7", "#1c1f30", "#8becf7", "#56969d", "#406167", "#45666e", "#182325", "#3F3F46"]
    const color3 = ["#4cc5c7", "#1c1f30", "#8becf7", "#56969d", "#406167", "#45666e", "#182325", "#3F3F46"]
    return (
        <>
        <div className="bg-gradient-to-br from-[#4cc5c7] to-[#1c1f30] w-fit h-fit p-2 m-10 rounded-2xl">

            <div className="w-fit bg-gradient-to-br from-[#132e31] to-[#090a0f] p-5 m-10 rounded-xl" >
                <div className="topbar flex justify-between">
                    <div className="flex p-2">
                        <i className="ri-circle-fill text-red-500"></i>
                        <i className="ri-circle-fill text-yellow-500"></i>
                        <i className="ri-circle-fill text-green-500"></i>

                        <div className="flex ml-1 text-base">
                            <h1><i className="ri-arrow-right-s-line text-[#6f6f6f]"></i></h1>
                            <h1><i className="ri-arrow-left-s-line text-[#6f6f6f]"></i></h1>
                        </div>
                    </div>

                    <div className="rounded-xl p-2 flex justify-between text-[#6f6f6f] bg-gradient-to-r from-[#192e2f] to-[#162729]">
                        <i className="ri-lock-line"></i>
                        <h1 className="px-5">chess.com/{username}</h1>
                        <i className="ri-restart-line"></i>
                    </div>

                    <div className=" p-2 flex justify-between text-[#6f6f6f]">
                        <i className="ri-upload-2-line"></i>
                        <i className="ri-add-fill"></i>
                        <i className="ri-file-copy-line"></i>
                    </div>
                </div>

                <div className="flex">
                    <img src={avatar? avatar : `https://www.chess.com/bundles/web/images/user-image.007dad08.svg`} alt={username} className="rounded-full w-1/5 my-1 " />
                    <div className="cursor-pointer items-center ml-5 mt-5" onClick={() => window.open(url, "_blank")}>
                        <h1 className={`font-medium text-2xl ${font === 'roboto' ? 'font-roboto' : font === 'bricolagegrotesque' ? 'font-bricolagegrotesque' : font === 'onest' ? 'font-onest' : 'font-bebasneue'} text-white`}>@{name==undefined ? username : name}</h1>
                        <h1 className={`text-left  font-semibold text-lg ${font === 'roboto' ? 'font-roboto' : font === 'bricolagegrotesque' ? 'font-bricolagegrotesque' : font === 'onest' ? 'font-onest' : 'font-bebasneue'}  text-[#bccccc]`}>
                            {username} <span><i className="ri-external-link-line" onClick={() => window.open(url, "_blank")}></i></span>
                        </h1>
                    </div>
                </div>

                <ColoringContributionGraph username={username} color={["bg-[#8becf7]", "bg-[#56969d]", "bg-[#406167]", "bg-[#45666e]" , "bg-[#182325]"]} bg={"#3F3F46"} className="border-2 border-[#A1A1AA]"/>


                <div className="flex justify-evenly ">
                    <Rect title={"Followers"} heading={followers} emoji={"🦸‍♂️"} color1="#002E62" color2="#001731" fontColor="#006FEE" className={`${font === 'roboto' ? 'font-roboto' : font === 'bricolagegrotesque' ? 'font-bricolagegrotesque' : font === 'onest' ? 'font-onest' : 'font-bebasneue'}`} />
                    <Rect title={"Total Games"} heading={totalGames} emoji={"♟️"} color1="#62420E" color2="#312107" fontColor="#F5A524" className={`${font === 'roboto' ? 'font-roboto' : font === 'bricolagegrotesque' ? 'font-bricolagegrotesque' : font === 'onest' ? 'font-onest' : 'font-bebasneue'}`}/>
                    <Rect title={"Total Wins"} heading={totalWins} emoji={"🏆"} color1="#095028" color2="#052814" fontColor="#17C964" className={`${font === 'roboto' ? 'font-roboto' : font === 'bricolagegrotesque' ? 'font-bricolagegrotesque' : font === 'onest' ? 'font-onest' : 'font-bebasneue'}`}/>
                </div>
                
                <div className="flex justify-between ">
                    <Rect title={"Winning Rate"} heading={`${winPercentage}  %`} emoji={"⚡"} color1="#610726" color2="#310413" fontColor="#F31260"/>
                    <Rect title={"Total Draws"} heading={totalDraws} emoji={"🤝"} color1="#661F52" color2="#331029" fontColor="#FF4ECD"/>
                    <Rect title={"Total Losses"} heading={totalLosses} emoji={"👎"} color1="#0E8AAA" color2="#053B48" fontColor="#7EE7FC"/>
                </div>

                <div className="flex justify-between ">
                    {/* First Rect Component */}
                    <Rect
                        title={`${first.gameType}`}
                        heading={`${first.ratingValue}`}
                        emoji="🏆"
                        color1="#095028"
                        color2="#052814"
                        fontColor="#17C964"
                    />
                    
                    {/* Second Rect Component */}
                    <Rect
                        title={`${second.gameType}`}
                        heading={`${second.ratingValue}`}
                        emoji="🥈"
                        color1="#62420E"
                        color2="#312107"
                        fontColor="#F5A524"
                    />
                    
                    {/* Third Rect Component */}
                    <Rect
                        title={`${third.gameType}`}
                        heading={`${third.ratingValue}`}
                        emoji="🥉"
                        color1="#002E62"
                        color2="#001731"
                        fontColor="#006FEE"
                    />
                </div>
                <h1 className='text-left text-sm text-[#4c4c4c] mt-2 mb-0 cursor-pointer' onClick={()=>{window.open("https://arthteerth.vercel.app/", "_blank")}}>arthteerth.vercel.app</h1>

            </div>
        </div>

        </>
    )
}

function Rect({ title, heading, emoji, color1, color2, fontColor }) {
    return (
      <>
        <div style={{ background: `linear-gradient(to right, ${color1}, ${color2})` }}
          className="mx-3 w-full rounded-lg my-2 p-2"
        >
          <h1 style={{ color: '#8d8c8c' }} className="text-left">{emoji}{title}</h1>    
          <h1 className="font-medium text-3xl p-1" style={{ color: fontColor }}>{heading}</h1>
        </div>
      </>
    );
  }