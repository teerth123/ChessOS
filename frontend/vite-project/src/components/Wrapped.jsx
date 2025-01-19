import ColoringContributionGraph from "./ColoringGraph";

export default function Wrapped({ avatar, username, name, followers, country, status, last_online, url, totalGames, totalWins, totalLosses, totalDraws , font, rating}) {
  const winPercentage = ((totalWins / totalGames) * 100).toFixed(2);
  font = font.trim();
  font = font.toLowerCase();
  font = font.split(' ').join(''); 
  console.log(name, font);  
  const topRatings = rating.slice(0, 3);

    const [first, second] = topRatings.map(rating => {
        const [gameType, ratingValue] = rating.split(": ");
        return { gameType, ratingValue };
    });
    return (
    <>
      <div className="w-fit h-fit p-2 bg-gradient-to-br from-[#27272A] to-[#18181B] text-white border-2 border-[#35332e] items-center rounded-2xl m-8 ">
        <div className="flex justify-between font-BricolageGrotesque">
          <div className="flex">
            <img src={avatar? avatar : `https://www.chess.com/bundles/web/images/user-image.007dad08.svg`} alt={username} className="rounded-full w-1/4 my-1" />
            <div className="cursor-pointer items-center ml-5 mt-5" onClick={() => window.open(url, "_blank")}>
              <h1 className={`font-medium text-3xl ${font === 'roboto' ? 'font-roboto' : font === 'bricolagegrotesque' ? 'font-bricolagegrotesque' : font === 'onest' ? 'font-onest' : 'font-bebasneue'}`}>@{name==undefined ? username : name}</h1>
              <h1 className={`text-left font-semibold text-xl ${font === 'roboto' ? 'font-roboto' : font === 'bricolagegrotesque' ? 'font-bricolagegrotesque' : font === 'onest' ? 'font-onest' : 'font-bebasneue'} bg-gradient-to-r from-[#6f529c] via-[#9563a2] to-[#cd78a5] inline-block text-transparent bg-clip-text`}>
                {username} <span><i className="ri-external-link-line" onClick={() => window.open(url, "_blank")}></i></span>
              </h1>
            </div>
          </div>
        </div>

        <ColoringContributionGraph username={username} color={["bg-white", "bg-[#e8e8e8]", "bg-[#bfbfbf]", "bg-[#686868]" , "bg-[#454545]"]} bg={"#3F3F46"} className="border-2 border-[#A1A1AA]"/>

        <div className="flex justify-between ">
          <Rect title={"Followers"} heading={followers} emoji={"🦸‍♂️"} color1="#002E62" color2="#001731" fontColor="#006FEE" className="bg-no"/>
          <Rect title={"Total Games"} heading={totalGames} emoji={"♟️"} color1="#62420E" color2="#312107" fontColor="#F5A524"/>
        </div>
        <div className="flex justify-between ">
            <Rect title={"Total Wins"} heading={totalWins} emoji={"🏆"} color1="#095028" color2="#052814" fontColor="#17C964"/>
            <Rect title={"Winning Rate"} heading={`${winPercentage}  %`} emoji={"⚡"} color1="#610726" color2="#310413" fontColor="#F31260"/>
        </div>
        <div className="flex justify-between ">
            <Rect title={"Total Draws"} heading={totalDraws} emoji={"🤝"} color1="#661F52" color2="#331029" fontColor="#FF4ECD"/>
            <Rect title={"Total Losses"} heading={totalLosses} emoji={"👎"} color1="#0E8AAA" color2="#053B48" fontColor="#7EE7FC"/>
        </div>
        
        <div className="flex justify-between ">
            {/* First Rect Component */}
            <Rect
                title={`${first.gameType}`}
                heading={`${first.ratingValue}`}
                emoji="🏆"
                color1="#610726"
                color2="#310413"
                fontColor="#F31260"
            />
            
            {/* Second Rect Component */}
            <Rect
                title={`${second.gameType}`}
                heading={`${second.ratingValue}`}
                emoji="🥈"
                color1="#661F52"
                color2="#331029"
                fontColor="#FF4ECD"
            />
          </div>

        <h1 className='text-left text-sm text-[#4c4c4c] mt-2 mb-0 cursor-pointer' onClick={()=>{window.open("https://arthteerth.vercel.app/", "_blank")}}>arthteerth.vercel.app</h1>

      </div>
    </>
  );
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
