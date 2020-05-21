import React, {useState, Component, useEffect} from "react";
import { MainPage } from "./mainpage";
import { Login } from "./landingpage/loginDialog/main";
import { LandingPage } from "./landingpage"
import { Register } from "./landingpage/registerDialog/main"
import { NavigationBar } from "./navigationBar/main"
import {
  Route, BrowserRouter as Router, Switch, Redirect, NavLink
} from "react-router-dom";

import { SideBar, Body, Screen, Content } from "./styled"

export default () => {
  const [loggedIn, setLoggedIn] = useState(true);

  const login = () => {
    setLoggedIn(true);
  }

  useEffect(() => {
    // console.log();
    // Overall: Data
    /*USE FETCH TO CHECK LOGGED IN */
    // fetch('/api/author/getAllAuthors').then(res => res.json()).then(list => setAllAuthors(list));
    //
    // fetch('/api/longesArticletHistory/?topcount=' + 3).then(res => res.json()).then(list => setLongestHistory(list));
    // fetch('/api/authorUser').then(res => res.json()).then(list => );
  }, [])

  return (
    <div>
      <Body>
        <Router>
          {/* Must be logged in to view main page */}
          {loggedIn ? (<Redirect to="/main"/>) : (<Redirect to="/"/>)}

          {loggedIn ? <Screen>

            <SideBar>
              <NavigationBar></NavigationBar>
            </SideBar>
            <Content>
              <Switch>
                <Route path="/main" component={MainPage} />
              </Switch>
            </Content>
          </Screen> : 
          <Screen>
          <Switch>
              <Route path="/" component={LandingPage} />
            </Switch>
          </Screen>}
          {/* <Screen>

        <SideBar>
          <NavigationBar></NavigationBar>
        </SideBar>
      <Content>
      <Switch>
        <Route path="/main" component = {MainPage}/>
        <Route path="/" component = {LandingPage}/>
        </Switch>
        
     
      </Content>
      </Screen> */}
        </Router>
      </Body>
    </div>
  )

}
