import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
import { useContext } from "react";

function EditListing({ categories }) {
  const { user, setUser } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category_id, setCategory_id] = useState("");
  const [errors, setErrors] = useState([]);
  const [listing, setListing] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
    category_id: "",
  });
  const { id } = useParams();

  useEffect(() => {
    fetch(`/lists/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setListing(data);
        setTitle(data.title || "");
        setDescription(data.description || "");
        setPrice(data.price || "");
        setImage(data.image || "");
        setCategory_id(data.category_id || "");
      });
  }, [id]);

  function handleSubmit(e) {
    e.preventDefault();
    const listingData = {
      title,
      description,
      price,
      image,
      category_id,
    };
    fetch(`/lists/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(listingData),
    }).then((r) => {
      if (r.ok) {
        r.json().then((listing) => {
          setListing(listing);
          if (user && user.listings) {
            const updatedListings = user.listings.map((l) => {
              if (l.id === listing.id) return listing;
              return l;
            });
            const updatedUser = { ...user, listings: updatedListings };
            setUser(updatedUser);
          }
        });
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  if (!listing) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <form className="edit-listing-form" onSubmit={handleSubmit}>
        <h1 className="edit-listing-heading">Edit Listing</h1>
        <div className="form-group">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="form-input"
            autoComplete="off"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            id="description"
            className="form-input"
            autoComplete="off"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="text"
            id="price"
            className="form-input"
            autoComplete="off"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="image_url" className="form-label">
            Image URL
          </label>
          <input
            type="text"
            id="image_url"
            className="form-input"
            autoComplete="off"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="category_id" className="form-label">
            Category
          </label>
          <select
            id="category_id"
            className="form-input"
            value={category_id}
            onChange={(e) => setCategory_id(e.target.value)}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="form-button">
          Edit Listing
        </button>
      </form>

      {errors.length > 0 && (
        <div className="error-container">
          <h2>Error</h2>
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

export default EditListing;