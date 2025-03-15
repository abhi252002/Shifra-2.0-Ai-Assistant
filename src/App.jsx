import "./App.css";
import va from "./assets/ai.png";
import { FaMicrophoneAlt } from "react-icons/fa";
import { useContext } from "react";
import { dataContext } from "./context/UserContexStore";
import speakImg from "./assets/speak.gif"
import aiVoice from "./assets/aiVoice.gif"

function App() {
  const { recognition, speaking, setSpeaking, text, response, setResponse  } = useContext(dataContext);
  

  return (
    <>
      <div className="main">
        <img src={va} alt="" className="shifra" />
        <span>I'm Shifra, Your Advance Virtual Assistant</span>
        {!speaking ? <button className="btn" onClick={()=>{
          setSpeaking(true)
          setResponse(false)
          recognition.start()}}>
          Click here
          <FaMicrophoneAlt
            style={{ backgroundColor: "" }}
            size={30}
            color="black"
          />
        </button >: <div className="response" >
         {!response?  <img src={speakImg} alt="speak icon"  className="speak"/>: <img src={aiVoice} alt="ai voice icon"  className="aiVoice"/> }
          <p>{text}</p>
          </div>
        }
      </div>
    </>
  );
}

export default App;
