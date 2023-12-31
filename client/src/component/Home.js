import React from "react";
import { Link } from "react-router-dom";
import CategoryChart from "./CategoryChart";
import "../css/Home.css"; // Import the CSS file

function Home({ categories }) {
 
  return (
    <div className="App">
      {categories.map((category) => (
        <div key={category.id} className="CategoryBox">
          <div className="CategoryImage">
            <img src={category.image_Url} alt={category.name} />
          </div>
          <h2 className="CategoryName">
            <Link to={`/categories/${category.id}`} className="CategoryLink">
              {category.name}
            </Link>
          </h2>
        </div>
      ))}
      <div className="ChartBox">
        <h1>List Data</h1>
        <CategoryChart />
      </div>

    </div>
    
  );
}

export default Home;