import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Modal from "react-modal";

// Custom CSS for the modal and cards
import "../css/listingPage.css";

function ListingPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [listings, setListings] = useState(null);
  const [selectedListing, setSelectedListing] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    fetch(`/categories/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setListings(data);
      });
  }, [id]);

  function handleClick() {
    console.log(selectedListing)
    const {title, id, user_id } = selectedListing;
    console.log(title, id, user_id) 
    navigate('/mymessages', {state: {title, id, user_id}})
  }
    
  const openModal = (listing) => {
    setSelectedListing(listing);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedListing(null);
    setModalIsOpen(false);
  };

  if (!listings) {
    return <div>Loading...</div>;
  }
  Modal.setAppElement("#app-root");
  
  return (
    <div>
      <ul className="listing-cards">
        {listings.map((listing) => (
          <li key={listing.id} className="listing-card" onClick={() => openModal(listing)}>
            <h3>{listing.title}</h3>
            <img src={listing.image} alt={listing.title} />
            <p>{listing.price}</p>
          </li>
        ))}
      </ul>
  
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Listing Details"
        className="modal"
        overlayClassName="modal-overlay"
      >
        {selectedListing && (
          <div>
            <h2>{selectedListing.title}</h2>
            <p>{selectedListing.description}</p>
            <p>{selectedListing.price}</p>
            <p>Contact Information: {selectedListing.user.email} </p>
            <button className="message-button" onClick={handleClick}>Send Message</button>
            {/* <button onClick={closeModal}>Close</button> */}
          </div>
        )}
      </Modal>
    </div>
  );
}

export default ListingPage;