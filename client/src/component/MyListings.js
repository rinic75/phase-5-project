import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../css/MyListings.css";
import { UserContext } from "../UserContext";

function MyListings() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  function handleEdit(listId) {
    navigate(`/editListing/${listId}`);
  }

  function handleDelete(listId) {
    fetch(`/lists/${listId}`, {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        const updatedLists = user.lists.filter((list) => list.id !== listId);
        setUser({ ...user, lists: updatedLists });
      }
    });
  }

  return (
    <div className="App">
      {user?.lists?.map((list) => (
        <div key={list.id} className="Listing">
          <h2>{list.title}</h2>
          <p>{list.description}</p>
          <div className="image-container">
            <img src={list.image} alt={list.title} />
          </div>
          <p className="price">${list.price}</p>
          <div className="buttons-container">
            <button onClick={() => handleEdit(list.id)} className="edit">
              Edit
            </button>
            <button onClick={() => handleDelete(list.id)} className="delete">
              Delete
            </button>
          </div>
            <div className="message-container">
              {/* Filter messages with the same list_id */}
              <h2>Messages</h2>
              {user.messages
                .filter((message) => message.list_id === list.id)
                .map((message) => (
                  <div key={message.id} className="message">
                    <p>{message.content}</p>
                  </div>
                ))}
            </div>
          </div>
        
      ))}
    </div>
  );
}

export default MyListings;