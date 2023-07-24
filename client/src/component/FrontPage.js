import React, {useContext} from "react";
import Signup from "./Signup";
import Login from "./Login";
import { UserContext } from "../UserContext";

function Frontpage() {
  const {setUser} = useContext(UserContext)

  return (
    <div className="container">
    <h1>Where Golf Enthusiasts Connect and Swing into Great Deals!</h1>
    <h3>To get started, we kindly invite you to create an account with us. If you've already created an account, simply login!</h3>
    <Signup setUser={setUser} />
    <Login setUser={setUser} />
  </div>
  );
}

export default Frontpage;