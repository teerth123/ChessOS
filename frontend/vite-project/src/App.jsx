import { useState } from 'react'
import './App.css'
import CreateGraph from './components/CreateGraph'
import ColoringContributionGraph from './components/ColoringGraph'
import magnus from './images/magnus.png'
// import hand from './images/hand.png'
import slate from './images/slate.png'
import Slate from './components/Slate'
import { Analytics } from "@vercel/analytics/react"

function App() {
  const [input, setInput] = useState(null)
  const [username, setUsername] = useState("Admin")
  const [hover, setHover] = useState(false);

  return (
    <>

    <div className='flex'>
      <div className='flex'>
      <input type="text" placeholder='enter username' onChange={(e)=>setInput(e.target.value)}
            className='bg-[#53514f] px-3 py-1 m-5 rounded text-[#989996]'
          />
          <div onClick={()=>setUsername(input)} className='bg-[#81b64c] text-white p-3 py-1 mt-5 ml-5 mb-5 rounded cursor-pointer' 
              onMouseEnter={()=>setHover(true)}
              onMouseLeave={()=>setHover(false)}

        >Go!!!</div>
          
          <div className={`mt-10 p-1 text-white  rounded ${hover ? 'bg-[#363433]' : 'bg-transparent'}`}>
            {hover ? "good move" : ""}
          </div>
      </div>

      {/* <img src={hand} alt="" className='self-center small-image min-w-max h-40 rounded'/> */}
        
    </div>

    <div className='flex justify-between'>
  <div className='flex-1'>
    <ColoringContributionGraph username={username} />
  </div>
  <div>
  <img src={magnus} alt="" className='self-center small-image min-w-max rounded' />
    <span className='absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:block text-white bg-black rounded py-1 px-2 text-sm'>
      {username}
    </span>
  </div>
  {/* <img src={magnus} alt="" className='self-center small-image min-w-max rounded' /> */}
</div>

<div className="flex justify-between mt-5">
  <div className="mr-auto"></div>
  { username=="Admin" && <img src={slate} alt="" className='rounded-2xl float-right mr-0 ml-96' />}
  { username!="Admin" && <Slate username = {username} className='rounded-2xl float-right mr-0 ml-96 mt-0'/>}

  {/* <img src={slate} alt="" className='rounded-2xl float-right mr-0 ml-96' /> */}
</div>    
<Analytics />
    </>
  )
}

export default App
