import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import "../css/MyMessage.css";

function MyMessage() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const messagesPerPage = 5; // Number of messages to display per page
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [sentMessages, setSentMessages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchMessages(`/users/${user.id}/receivedMessages`, setReceivedMessages);
    fetchMessages(`/users/${user.id}/sentMessages`, setSentMessages);
  }, [user.id]);

  async function fetchMessages(url, setMessages) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error(error);
    }
  }

  function handleReplyClick(message) {
    navigate("/sendmessages", {
      state: {
        title: `Received Message: ${message.content}`,
        id: message.list_id,
        user_id: message.sender_id,
      },
    });
  }

  async function handleDeleteClick(messageId) {
    try {
      const response = await fetch(`/messages/${messageId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete the message");
      }

      // Remove the deleted message from the received messages list
      setReceivedMessages((prevMessages) =>
        prevMessages.filter((message) => message.id !== messageId)
      );
      setSentMessages((prevMessages) =>
        prevMessages.filter((message) => message.id !== messageId)
      );
    } catch (error) {
      console.error(error);
    }
  }

  const totalPages = Math.ceil(receivedMessages.length / messagesPerPage);
  const indexOfLastMessage = currentPage * messagesPerPage;
  const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
  const currentReceivedMessages = receivedMessages.slice(
    indexOfFirstMessage,
    indexOfLastMessage
  );

  function handlePageChange(newPage) {
    setCurrentPage(newPage);
  }

  return (
    <div className="MyMessage">
      <h1>Received Messages</h1>
      {currentReceivedMessages.map((message) => (
        <div key={message.id} className="Message">
          <h3>Item : {message.list.title}</h3>
          <p>From: {message.sender.name}</p>
          <p>{message.content}</p>
          <button onClick={() => handleReplyClick(message)}>Reply</button>
          <button className="deleteButton" onClick={() => handleDeleteClick(message.id)}>Delete</button>
        </div>
      ))}

      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
          <button key={pageNum} onClick={() => handlePageChange(pageNum)}>
            {pageNum}
          </button>
        ))}
      </div>

      <h1>Sent Messages</h1>
      {sentMessages.map((message) => (
        <div key={message.id} className="Message">
          <h3>Item : {message.list.title}</h3>
          <p>To : {message.receiver.name}</p>
          <p>{message.content}</p>
          <button className="deleteButton" onClick={() => handleDeleteClick(message.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default MyMessage;