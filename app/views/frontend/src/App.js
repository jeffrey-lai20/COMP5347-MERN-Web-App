import React, { useState, Component } from "react";
import { MainPage } from "./mainpage";
import { Login } from "./login";
import {
  Route, BrowserRouter as Router, Switch, Redirect, NavLink
} from "react-router-dom";

export default () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const login = () => {
    setLoggedIn(true);
  }

  return (
    <div>
     
      <Router>
        <Route path="/login" component = {Login}/>
        { loggedIn ? ( <Redirect to="/main"/>) : (<Login loginFunction={login}/>)}

        <Route path="/main" component = {MainPage}/>

      </Router>
      </div>
  )
  
}
