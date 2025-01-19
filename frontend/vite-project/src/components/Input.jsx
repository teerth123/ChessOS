import { useState } from "react";

export default function Input({username, setUsername}){
      const [input, setInput] = useState(null)
      const [hover, setHover] = useState(false);

    return (
        <div className='flex h-fit w-full text-left '>
            <div className='flex bg-gradient-to-br from-[#cd8113] to-[#cd5c24] p-2 rounded-xl mt-5 ml-3'>
            <input type="text" placeholder='Enter Chess.com Username' onChange={(e)=>setInput(e.target.value)}
                    className='bg-gradient-to-br from-[#cd8113] to-[#cd5c24] rounded text-white font-medium p-3 mx-2'
                    style={{ outline: 'none' }}
                />
                <div onClick={()=>setUsername(input)} className='bg-[#81b64c] p-3 text-white  rounded cursor-pointer mx-2 ' 
                >Go!!!</div>
                
                <div className={` p-1 text-white  rounded ${hover ? 'bg-[#363433]' : 'bg-transparent'}`}>
                    {hover ? "good move" : ""}
                </div>
            </div>        
        </div>
    )
    
}