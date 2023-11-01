import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import SendIcon from "@mui/icons-material/Send";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import { InboxActions } from "../ReduxStore/InboxReducer";
import { authActions } from "../ReduxStore/AuthSlice";
import "./SideBar.css";
const SideBar = () => {
  const dispatch = useDispatch();
  const unread = useSelector((state) => state.inboxReducer.unread);
  const getRequest = useSelector((state) => state.inboxReducer.getReq);

  let url = "https://mail-box-client-72ab7-default-rtdb.firebaseio.com/";
  const email = localStorage.getItem("email").replace(/['@','.']/g, "");

  const getData = async () => {
    try {
      const response = await fetch(`${url}/Inbox/${email}.json`);
      const data = await response.json();
      // console.log(data)
      let arrayOfData = [];
      for (let key in data) {
        arrayOfData.unshift({ id: key, ...data[key] });
      }

      dispatch(InboxActions.changeInbox(arrayOfData));

      let count = 0;
      arrayOfData.forEach((msg) => {
        if (msg.read === false) {
          count++;
        }
      });
      dispatch(InboxActions.updateUnread(count));
    } catch (error) {
      console.log(error);
    }
  };

  // LogOutHandler :
  const logOutHandler = () => {
    dispatch(authActions.logOut());
  };

  // getData func will call after every 2 sec : so new mail render on UI without refresh.
  useEffect(() => {
    const intervalId = setInterval(() => {
      getData();
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="SideBarContainer" style={{ marginTop: "2rem" }}>
     
      <div className="allsidebarMenu">
        <Link to="/welcomeScreen">
          <Button className="composebtn" startIcon={<AddIcon />}>
            Compose
          </Button>
        </Link>
        <Link to="/Inbox">
          <Button startIcon={<InsertPhotoIcon />}>Inbox</Button>
          {unread}
        </Link>
        <Link to="/sentBox">
          <Button startIcon={<SendIcon />}>Sent</Button>
        </Link>
        <Link>
          <Button startIcon={<StarBorderIcon />} disabled>Starred</Button>
        </Link>
        <Link>
          <Button startIcon={<SaveAsIcon />} disabled>Draft</Button>
        </Link>

        <Link to="/">
          <Button startIcon={<LogoutIcon />} onClick={logOutHandler}>
            LogOut
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
