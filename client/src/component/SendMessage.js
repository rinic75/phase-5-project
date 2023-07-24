import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from "../UserContext";
import { useContext } from "react";

function MyMessage() {
  const { user, setUser } = useContext(UserContext);
  const location = useLocation();
  const { title, id, user_id } = location.state || {}; // Destructure the state object, set defaults to empty object
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState([]);
  console.log(title, id, user_id, user.id);
  function handleSubmit(e) {
    e.preventDefault();
    const messageData = {
      sender_id: user.id,
      receiver_id: user_id,
      list_id: id,
      content: message,
    };

    fetch("/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messageData),
    })
      .then((r) => {
        if (r.ok) {
          return r.json();
        } else {
          throw new Error("Failed to send message");
        }
      })
      .then((message) => {
        console.log(message);
        const updatedMessages = [...user.messages, message];
        setUser((prevUser) => ({
          ...prevUser,
          messages: updatedMessages,
        }));
        setMessage("");
        setErrors([]);
        console.log(message);
      })
      .catch((error) => {
        setErrors([error.message]);
      });
  }

  return (
    <div>
      <h1>Send Message</h1>
      <h2>{title}</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
      {errors.length > 0 && (
        <div>
          <h3>Error:</h3>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default MyMessage;
