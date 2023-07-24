import React, { useEffect, useState, useContext } from "react";
import "../css/MyMessage.css";
import Modal from "react-modal";
import { UserContext } from "../UserContext";


function MyMessage() {
  const { user } = useContext(UserContext);
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [sentMessages, setSentMessages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyMessage, setReplyMessage] = useState("");
  
  console.log(user)
  console.log(receivedMessages)
  console.log(sentMessages)
  
  useEffect(() => {
    fetch(`/users/${user.id}/receivedMessages`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch received messages");
        }
        return response.json();
      })
      .then((data) => {
        setReceivedMessages(data);
      })
      .catch((error) => console.error(error));

    fetch(`/users/${user.id}/sentMessages`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch sent messages");
        }
        return response.json();
      })
      .then((data) => {
        setSentMessages(data);
      })
      .catch((error) => console.error(error));
  }, [user.id]);

  function handleReplyClick(message) {
    setSelectedMessage(message);
    setReplyMessage("");
    setShowModal(true);
  }

  function handleModalClose() {
    setSelectedMessage(null);
    setShowModal(false);
  }

  function handleSendReply() {
    // Create a new message with the sender_id and receiver_id switched
    const newMessage = {
      text: replyMessage,
      sender_id: selectedMessage.receiver_id,
      receiver_id: selectedMessage.sender_id,
    };

    fetch(`/users/${user.id}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: newMessage }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to create a new message");
        }
        return response.json();
      })
      .then((createdMessage) => {
        console.log(createdMessage);
        // Perform actions with the created message if needed
        setSelectedMessage(null);
        setShowModal(false);
      })
      .catch((error) => console.error(error));
  }

  return (
    <div className="MyMessage">
      <h1>Received Messages</h1>
      {receivedMessages.map((message) => (
        <div key={message.id} className="Message">
          <h2>From: {message.sender_name}</h2>
          <p>{message.list_title}</p>
          <button onClick={() => handleReplyClick(message)}>Reply</button>
        </div>
      ))}

      <h1>Sent Messages</h1>
      {sentMessages.map((message) => (
        <div key={message.id} className="Message">
          <h2>To: {message.receiver_name}</h2>
          <p>{message.list_title}</p>
        </div>
      ))}

      {showModal && (
        <Modal onClose={handleModalClose}>
          <h2>Compose Reply</h2>
          <textarea
            value={replyMessage}
            onChange={(e) => setReplyMessage(e.target.value)}
            placeholder="Write your reply..."
          />
          <button onClick={handleSendReply}>Send</button>
        </Modal>
      )}
    </div>
  );
}

export default MyMessage;