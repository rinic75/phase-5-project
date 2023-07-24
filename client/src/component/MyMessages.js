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
  // const [selectedMessage, setSelectedMessage] = useState(null);
  // const [replyMessage, setReplyMessage] = useState("");
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
    // setSelectedMessage(message);
    // setReplyMessage("");
    console.log(message)

    navigate("/sendmessages", {
      state: {
        title: `Received Message: ${message.content}`,
        id: message.list_id,
        user_id: message.sender_id,
      },
    });
  }

  // Calculate the total number of pages based on the messages array length and messagesPerPage
  const totalPages = Math.ceil(receivedMessages.length / messagesPerPage);

  // Function to handle page change
  function handlePageChange(newPage) {
    setCurrentPage(newPage);
  }

  // Get the slice of messages for the current page
  const indexOfLastMessage = currentPage * messagesPerPage;
  const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
  const currentReceivedMessages = receivedMessages.slice(indexOfFirstMessage, indexOfLastMessage);

  return (
    <div className="MyMessage">
      <h1>Received Messages</h1>
      {currentReceivedMessages.map((message) => (
        <div key={message.id} className="Message">
          <h2>From: {message.sender_name}</h2>
          <p>{message.content}</p>
          <button onClick={() => handleReplyClick(message)}>Reply</button>
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
          <h2>To: {message.receiver_name}</h2>
          <p>{message.content}</p>
        </div>
      ))}
    </div>
  );
}

export default MyMessage;