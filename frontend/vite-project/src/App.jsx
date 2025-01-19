import { useState } from 'react'
import './App.css'
import ColoringContributionGraph from './components/ColoringGraph'
import Slate from './components/Slate'
import { Analytics } from "@vercel/analytics/react"
import Input from './components/Input'

function App() {
  const [username, setUsername] = useState("Admin");
  const [theme, setTheme] = useState("Wrapped");
  const [font, setFont] = useState("Roboto");
  const [color, setColor] = useState("Blue");

  return (
    <>
    <div className='flex'>
        <div className="">
            <div className='h-[100vh] bg-black w-[20vw]  justify-left'>
              <Input username={username} setUsername={setUsername} className="mt-2"/>
            
            {username!="Admin" ? 
                (<>

                  <Dropdown options={["Wrapped", "Safari"]} head="Theme" setChoice={setTheme} />
                  <Dropdown options={["Roboto", "Bricolage Grotesque", "Onest", "Bebas Neue"]} head="Font Family" setChoice={setFont} />
                  <Dropdown options={["Blue", "Red"]} head="Color Scheme" setChoice={setColor} />

                  Text
                </>) 
                :
                (<>

                </>)
              }
              </div>
        </div>
        <Slate username = {username} 
        theme = {theme} font = {font} color = {color}
        className='rounded-2xl float-right mr-0 ml-96 mt-0 font-'/>
        {/* <Analytics /> */}
    </div>
    
      
    </>
  )
}

export default App

function Dropdown({ options, head, setChoice }) {
  const [up, setup] = useState(1);
  const [choice, setChoiceState] = useState(options[0]);

  const handleChoiceChange = (newChoice) => {
    setChoiceState(newChoice);
    setChoice(newChoice);  // Update the choice in the parent component
    setup(1);  // Close dropdown after selecting
  };

  return (
    <div className="cursor-pointer my-5 mx-2">
      <h1 className="text-[#4c4c4c]">{head}</h1>
      <div className="bg-gradient-to-r from-[#ff6448] to-[#f65b61] rounded-lg p-2">
        {/* Button to toggle dropdown */}
        <div
          className="text-white flex justify-between items-center font-medium p-2"
          onClick={() => setup(up === 0 ? 1 : 0)}
        >
          {choice}{" "}
          {up === 1 ? (
            <i className="ri-arrow-drop-down-fill p-2 bg-gradient-to-bl from-[#d03c41] to-[#cf3c42] rounded-lg"></i>
          ) : (
            <i className="ri-arrow-drop-up-fill p-2 bg-gradient-to-bl from-[#d03c41] to-[#cf3c42] rounded-lg"></i>
          )}
        </div>

        {/* Dropdown options */}
        {up === 0 && (
          <div className="border-dashed border-2 border-[#962831] p-1 rounded-lg mt-1 bg-white">
            {options.map((option, index) => (
              <div
                key={index}
                className="mt-2 text-[#333] hover:bg-[#f1f1f1] p-2 cursor-pointer rounded-lg"
                onClick={() => handleChoiceChange(option)}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}