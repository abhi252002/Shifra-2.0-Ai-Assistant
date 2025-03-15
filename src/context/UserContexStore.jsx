import { createContext, useState } from "react";
import run from "../gemini";
export const dataContext = createContext();

function UserContextStore({children}) {
  let [speaking, setSpeaking] = useState(false);
  let [text, setText] = useState("listening...")
  let [response, setResponse] = useState(true);
  function speak(text){
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.volume = 1;
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.lang = "hi-GB";
    window.speechSynthesis.speak(text_speak);

  }
  async function aiResponse(prompt){
 let text =  await run(prompt)
 console.log(text);
 let newText = text.split("**")&&text.split("*")&&text.replace("google","Abhishek Prajapati")&&text.replace("Google","Abhishek Prajapati")
 setText(newText)
 speak(newText);
 setResponse(true);
 setTimeout(()=>{
  setSpeaking(false);
 },5000);
 
}
  let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    let recognition = new speechRecognition();
   recognition.onresult = (e)=>{
    console.log(e);
    let currentIndex = e.resultIndex;
    let transcript = e.results[currentIndex][0].transcript;
    setText(transcript);
    takeCommand(transcript.toLowerCase());
   }


  let value = {
   recognition,
   speaking, 
   setSpeaking,
   text,
   setText,
   response, 
   setResponse,
  }
function takeCommand(command){
  if (command.includes("open") && command.includes("youtube")) {
    window.open("https://www.youtube.com/", "_blank");
    speak("Opening YouTube..");
    setResponse(true);
    setText("Opening YouTube...");
} else if (command.includes("open") && command.includes("whatsapp")) {
    window.open("https://web.whatsapp.com/", "_blank");
    speak("Opening WhatsApp..");
    setResponse(true);
    setText("Opening WhatsApp...");
} else if (command.includes("open") && command.includes("telegram")) {
    window.open("https://web.telegram.org/", "_blank");
    speak("Opening Telegram..");
    setResponse(true);
    setText("Opening Telegram...");
} else if (command.includes("open") && command.includes("calculator")) {
    window.open("calc://");
    speak("Opening Calculator..");
    setResponse(true);
    setText("Opening Calculator...");
} else if (command.includes("open") && command.includes("flipkart")) {
    window.open("https://www.flipkart.com/", "_blank");
    speak("Opening Flipkart..");
    setResponse(true);
    setText("Opening Flipkart...");
} else if (command.includes("open") && command.includes("amazon")) {
    window.open("https://www.amazon.in/", "_blank");
    speak("Opening Amazon..");
    setResponse(true);
    setText("Opening Amazon...");
}else if (command.includes("open") && command.includes("google")) {
  window.open("https://www.google.com/", "_blank");
  speak("Opening google..");
  setResponse(true);
  setText("Opening google...");
}else if (command.includes("time")) {
    let currentTime = new Date().toLocaleTimeString();
    speak(`The current time is ${currentTime}`);
    setResponse(true);
    setText(`The current time is ${currentTime}`);
} else if (command.includes("date")) {
    let currentDate = new Date().toLocaleDateString();
    speak(`Today's date is ${currentDate}`);
    setResponse(true);
    setText(`Today's date is ${currentDate}`);
}else if(command.includes("open") && command.includes("pornhub")){
    window.open("https://www.reddit.com/media?url=https%3A%2F%2Fi.redd.it%2Fmnqnb2ykv51d1.jpeg&rdt=33088","_blank")
    speak("opening pornhub..");
    setResponse(true);
    setText("opening pornhub...")
    setTimeout(()=>{
      setSpeaking(false);
    },5000)
  }else{
    aiResponse(command)
  }
  // Reset speaking state after a delay
setTimeout(() => {
  setSpeaking(false);
}, 5000);
}

  return (
    <dataContext.Provider value={value}>

      {children}
    </dataContext.Provider>
  );
}

export default UserContextStore;