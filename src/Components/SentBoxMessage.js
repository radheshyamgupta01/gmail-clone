import React from "react";
import "./SentBoxMessage.css";
import { useParams ,Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";

const SentBoxMessage = () => {
  const { Identifier } = useParams();
  const dataSentBox = useSelector((state) => state.sentboxReducer.dataSentBox);
  const singleMessage = dataSentBox.filter((msg) => msg.id === Identifier);

  const Message = singleMessage[0].message;

  const user = singleMessage[0].to;
  return (
    <div className="SentMessages">
      <Link to="/sentBox">
        <Button className="font-serif">Back to sent</Button>
      </Link>
      <div className="ToSentBoxInfo">
        <p className="font-serif">To : - {user}</p>
        <p className="font-serif">Message :- {Message}</p>
      </div>
    </div>
  );
};

export default SentBoxMessage;
