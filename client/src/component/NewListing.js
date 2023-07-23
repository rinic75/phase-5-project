import React, { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import "../css/NewListing.css";

function NewListing({ categories }) {
  const { user, setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
    category_id: "",
    user_id: user.id
  });
  const [errors, setErrors] = useState([]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/lists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then((r) => {
        if (r.ok) {
          return r.json();
        } else {
          throw new Error("Failed to add listing");
        }
      })
      .then((listing) => {
        const updatedLists = [...user.lists, listing];
        setUser((prevUser) => ({
          ...prevUser,
          lists: updatedLists
        }));
        setFormData({
          title: "",
          description: "",
          price: "",
          image: "",
          category_id: ""
        });
        setErrors([]);
        console.log(listing);
      })
      .catch((error) => {
        setErrors([error.message]);
      });
  }


  return (
    <div>
      <h2>New Listing</h2>
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
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input
            type="text"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="image">Image</label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="category_id">Category</label>
          <select
            id="category_id"
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Add Listing</button>
      </form>
    </div>
  );
}

export default NewListing;