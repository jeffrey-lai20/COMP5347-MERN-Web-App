import React, { useState, Component } from "react";
import { MainPage } from "./mainpage";
import { Login } from "./login";
import { LandingPage } from "./landingpage"
import {
  Route, BrowserRouter as Router, Switch, Redirect, NavLink
} from "react-router-dom";

import { SideBar } from "./styled"

export default () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const login = () => {
    setLoggedIn(true);
  }

  return (
    <div>
     
      <Router>

        <Route path="/" component = {LandingPage}/>
        <Route path="/login" component={Login}/>
        <Route path="/main" component = {MainPage}/>

      </Router>
      </div>
  )
  
}
