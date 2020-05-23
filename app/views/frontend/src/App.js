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
  const [loginValue, setLoginValue] = useState();

  // useEffect(() => {
  //
  //   fetch('/main').then(res => res.json()).then(list => setLoginValue(list));
  // }, [])
  fetch('/main').then(res => res.json()).then(list => setLoginValue(list));

  return (
    <div>
      <Body>
        <Router>
          {/* Must be logged in to view main page */}
          {loginValue ?
            <Screen>
              <SideBar>
                <NavigationBar></NavigationBar>
              </SideBar>
              <Content>
                <Switch>
                  {console.log("SKREEE" + loginValue)}

                  <Route path="/" component={MainPage} />
                </Switch>
              </Content>
            </Screen>
                :
            <Screen>
              <Switch>
                {console.log("AOSIHD" + loginValue)}
                <Route path="/" component={LandingPage} />
              </Switch>
            </Screen>
          }


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