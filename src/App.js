//
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import SignUp from "./Components/Auth/SignUp/SignUp";
import LogIn from "./Components/Auth/LogIn/LogIn";
import WelcomeScreen from "./Components/WelcomeScreen/WelcomeScreen";
import Inbox from "./Components/Inbox";
import InboxMessage from "./Components/InboxMessage";
import SentBox from "./Components/SentBox";
import SentBoxMessage from "./Components/SentBoxMessage";


function App() {
  return (
    <>
      <Routes>
        <Route index path='/' element={<Navbar />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/LogIn" element={<LogIn />} />
        <Route path="/WelcomeScreen" element={<WelcomeScreen/>}/>
        <Route path="/Inbox" element={<Inbox/>}/>
        <Route path="/Inbox/:Identifier" element={<InboxMessage/>}/>
        <Route path="/sentBox" element={<SentBox/>}/>
        <Route path="sentBox/:Identifier" element={<SentBoxMessage/>}/>
      </Routes>
    </>
  );
}

export default App;
