import React from "react";
// import { Modal } from "react-modal";
import { useNavigate } from "react-router-dom";
import "../css/MyListings.css";
import { UserContext } from "../UserContext";

function MyListings() {
  const { user, setUser } = React.useContext(UserContext);
  const navigate = useNavigate();

  // const [showModal, setShowModal] = useState(false);
  // const [replyContent, setReplyContent] = useState("");
  // const [currentListId, setCurrentListId] = useState(null);

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

  // function handleReply(listId) {
  //   setCurrentListId(listId);
  //   setShowModal(true);
  // }

  // function handleSend() {
  //   if (replyContent.trim() === "") return;

  //   fetch("/messages", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       content: replyContent,
  //       list_id: currentListId,
  //     }),
  //   }).then((r) => {
  //     if (r.ok) {
  //       // Assuming the response returns the newly created message
  //       r.json().then((newMessage) => {
  //         // Update the user context with the new message
  //         setUser({ ...user, messages: [...user.messages, newMessage] });
  //         // Reset the state
  //         setReplyContent("");
  //         setCurrentListId(null);
  //         setShowModal(false);
  //       });
  //     }
  //   });
  // }

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
          {/* <div className="message-container">
            <h2>Messages</h2>
            {user.messages
              .filter((message) => message.list_id === list.id)
              .map((message) => (
                <div key={message.id} className="message">
                  <p>{message.content}</p>
                  <button
                    onClick={() => handleReply(list.id)}
                    className="reply"
                  >
                    Reply
                  </button>
                </div>
              ))}
          </div> */}
        </div>
      ))}
      {/* {showModal && (
        <Modal>
          <div>
            <textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="Enter your reply..."
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </Modal>
      )} */}
    </div>
  );
}

export default MyListings;
