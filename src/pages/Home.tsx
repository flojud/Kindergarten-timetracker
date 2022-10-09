import { Button } from "@mui/material";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/AuthContextProvider";


const Home = () => {
  const userAuth = useContext(UserContext);

  const logout = () => {
    userAuth.logout();
    console.log(userAuth.user);
  }
  
  return(
  <>
    <div>
      <div>Home Page</div>
      <div><Link to={"/profile"} >My Profile</Link></div>
      <Link to='/signup'>SignUp</Link>
      <Link to='/login'>Login</Link>      
      <div>
      <Button variant="contained" onClick={logout}>Logout</Button>
      </div>
    </div>
  </>)
}

export default Home;