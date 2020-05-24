import React, {useState, Component, useEffect} from "react";
import { MainPage } from "./mainpage";
import { LandingPage } from "./landingpage"
import { NavigationBar } from "./navigationBar/main"
import {
  Route, BrowserRouter as Router, Switch, Redirect, NavLink
} from "react-router-dom";
import { SideBar, Body, Screen, Content } from "./styled"

export default () => {
    const [loginValue, setLoginValue] = useState();
    const [errorValue, setErrorValue] = useState();
    {console.log(errorValue)}

  useEffect(() => {
      fetch('/main').then(res => res.json()).then(list => setLoginValue(list));
      fetch('/error').then(res => setErrorValue(res));
  }, [])

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
                  <Route path="/" component={MainPage} />
                </Switch>
              </Content>
            </Screen>
                :
            <Screen>
              <Switch>
                <Route path="/" component={LandingPage} />
                  {typeof errorValue !== 'undefined' ?
                      (alert("Alert: \"" + errorValue.statusText + "\"."))
                      :(<h1></h1>)}   {/*Do nothing*/}
            </Switch>
            </Screen>
          }
        </Router>
      </Body>
    </div>
  )
}