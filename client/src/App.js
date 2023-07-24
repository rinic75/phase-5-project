import React, { useState, useEffect } from 'react';
import {Routes, Route} from 'react-router-dom';
// import { useContext } from 'react';
import './App.css';
import Home from './component/Home';
import NavBar from './component/NavBar';
import ListingPage from './component/listingPage';

// import { UserContext } from './UserContext';
import MyListings from './component/MyListings';
import EditListing from './component/EditListing';
import NewListing from './component/NewListing';
import Frontpage from './component/FrontPage';
import SendMessage from './component/SendMessage';
import MyMessages from './component/MyMessages';




function App() {
  // const {user, setUser} = useContext(UserContext);
  const [categories, setCategories] = useState([]);
  
  useEffect(() => {
    fetch("/categories")
      .then((r) => r.json())
      .then((data) => {
        setCategories(data);
      });
  }, []);
  
  return (
    <div className="App">
      <NavBar />
    
      <Routes>
        <Route exact path="/" element={<Frontpage />} />
        <Route exact path="/home" element={<Home categories={categories}/>} />
        <Route exact path="/categories/:id" element={<ListingPage />} />
        <Route exact path="/mylistings" element={<MyListings />} />
        <Route exact path="/editListing/:id" element={<EditListing categories={categories}/>} />
        <Route exact path="/newlisting" element={<NewListing categories={categories}/>} />
        <Route exact path="/sendmessages" element={<SendMessage />} />
        <Route exact path="/mymessages" element={<MyMessages />} />
      </Routes>
    </div>
  );
}

export default App;
