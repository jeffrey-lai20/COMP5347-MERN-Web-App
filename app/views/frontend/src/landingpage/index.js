import React from "react";
import Button, { ButtonAppearances } from '@atlaskit/button';
import { Login } from './loginDialog/main'
import { Register } from './registerDialog/main'
import {Heading, LoginButton, RegisterButton, SubHeading} from './styled'

export const LandingPage = () => {

    return (
        <div>

            <title>Wikipedia Analytics</title>
            <div>
                <Heading>Wikipedia Analytics</Heading>

                <SubHeading>This is a data analytic web application. Please register or login to start exploring!</SubHeading>

            </div>


            {/* <div id="image_section">
                <div class = "col-sm-6">
                    <h2>Description of first image</h2>
                    <img src="image URL goes here" alt="First image here"></img>
                </div>
                <div className="col-sm-6">
                    <h2>Description of second image</h2>
                    <img src="image URL goes here" alt="Second image here"></img>
                </div>
            </div> */}
            {/* <Button appearance="primary" href="/login">Login</Button>
            <Button  appearance="primary" href="/register">Sign Up</Button> */}
            <LoginButton><Login/></LoginButton>
            <RegisterButton><Register/></RegisterButton>

        </div>
    )
}