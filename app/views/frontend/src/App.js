import React, { useState, Component } from "react";
import { MainPage } from "./mainpage";
import { Login } from "./landingpage/loginDialog/main";
import { LandingPage } from "./landingpage"
import { Register } from "./landingpage/registerDialog/main"
import {
  Route, BrowserRouter as Router, Switch, Redirect, NavLink
} from "react-router-dom";

import { SideBar } from "./styled"

export default () => {
  const [loggedIn, setLoggedIn] = useState(true);

  const login = () => {
    setLoggedIn(true);
  }

  return (
    <div>
      <Router>
      {/* Must be logged in to view main page */}
      {/* {loggedIn ? (<Redirect to="/main"/>) : (<Redirect to="/"/>)}
      */}
        <Route path="/" component = {LandingPage}/>
        {/* <Route path="/login" component={Login}/> */}
        {/* <Route path="/signup" component={Register}/> */}
        <Route path="/main" component = {MainPage}/>
        
      </Router>
      </div>
  )
  
}
