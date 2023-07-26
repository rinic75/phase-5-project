import React, { useContext} from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../css/NavBar.css";
import {UserContext} from "../UserContext";


function NavBar() {
  const navigate = useNavigate();
  const {user, setUser} = useContext(UserContext)

  const handleLogout = () => {
    fetch("/logout", {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
    navigate("/");
  };

  return (
    <nav className="navbar">
      {user ? (
        <>
          <h2 className="navbar__welcome">Welcome {user.name}</h2>
          <ul className="navbar__links">
            <li>
              <NavLink to="/home" className="navbar__link">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/mylistings"
                className="navbar__link"
                // activeClassName="active"
              >
                My Listings
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/newlisting"
                className="navbar__link"
                // activeClassName="active"
              >
                New Listing
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/mymessages"
                className="navbar__link"
                // activeClassName="active"
              >
                My Messages
              </NavLink>
            </li>
          </ul>
          <button className="navbar__logout" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <div>
          <h2 className="navbar__welcome">GolfClubLists</h2>
        </div>
      )}
    </nav>
  );
}

export default NavBar;