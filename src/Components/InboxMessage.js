import React from 'react'
import './InboxMessage.css'
// import SideBar from './SideBar'
import { useSelector} from 'react-redux'
import { useParams,Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { useEffect } from 'react'
const InboxMessage = () => {
  const {Identifier} =useParams();
  const arrayData = useSelector(state =>state.inboxReducer.inboxData)
  const Msg = arrayData.filter((msg)=>msg.id === Identifier)
  console.log(Msg)
  const sigleMsg = Msg[0].message;

  const user = Msg[0].from


  let url = "https://mail-box-client-72ab7-default-rtdb.firebaseio.com/"

  const receiver1 = localStorage.getItem('email').replace(/['@','.']/g, "");

  const putData = async ()=>{
    try {
        const response = await fetch(`${url}/Inbox/${receiver1}/${Identifier}.json`,{
          method:'PATCH',
          body:JSON.stringify({
            read:true
          }),
          headers:{
            'Content-Type':'application/json'
          }
        })

        console.log(response)
    } catch (error) {
      alert(error)
    }
  }
useEffect(()=>{
  putData()
},[])

  return (
    <div className='SentMessages'>
      <Link to="/Inbox">
        <Button class="font-serif">Back to Inbox</Button>
      </Link>
      <div className='ChildBox'>
      <p className='font-serif'>FROM :- {user}</p>
      <p className='font-serif'>Message :- {sigleMsg}</p>
      </div>
      
    </div>
  )
}

export default InboxMessage