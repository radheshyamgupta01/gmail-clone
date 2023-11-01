import React from 'react'
import './WelcomeScreen.css'
import PersonIcon from '@mui/icons-material/Person';
import ComposeMail from '../ComposeMail/ComposeMail'
import gmailImg from '../Images/Daco_106653.png'
const WelcomeScreen = () => {
  
  const LoggedInUserName = localStorage.getItem('email')
  // console.log(LoggedInUserName)
    return (
      <>
      <div className='MainHeaderInsideEmail'>
        <img  src={gmailImg} alt='img' style={{width:'10%' ,display:'flex'}}/>
        <div>
        <div ><PersonIcon style={{width:'100%'}} className="font-serif"></PersonIcon></div>
        <div style={{color:'blueviolet'}} className="font-serif">{LoggedInUserName}</div>
        </div>
      </div>
      <hr></hr>
      <ComposeMail/>
      </>
      )
}

export default WelcomeScreen;