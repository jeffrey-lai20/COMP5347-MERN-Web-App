import React from "react";

import Button, { ButtonAppearances } from '@atlaskit/button';
import Textfield from '@atlaskit/textfield';
import Tag from '@atlaskit/tag';

export const Register = ({signUpFunction}) => {

    return (
        <div className="col-sm-6">
            <h2>Please Register Your Account</h2>
            <form action='/register' method='POST' id='signupForm'>
                <div>
                    <Tag text="First Name:" color="greyLight"/>
                    <Textfield className="form-control" placeholder="First Name" type="text" name="firstname" pattern="[A-Z]{1}[a-z]+" title="Please enter a valid first name"></Textfield>
                </div>
                <div>
                    <Tag text="Last Name:" color="greyLight"/>
                    <Textfield className="form-control" placeholder="Last Name" type="text" name="lastname" pattern="[A-Z]{1}[a-z]+" title="Please enter a valid last name"></Textfield>
                </div>
                <div>
                    <Tag text="Email Address:" color="greyLight"/>
                    <Textfield className="form-control" placeholder="Email Address" type="email" name="emailaddress"></Textfield>
                </div>
                <div>
                    <Tag text="Username:" color="greyLight"/>
                    <Textfield class="form-control" placeholder="Username" type="text" name="username"></Textfield>
                </div>
                <div>
                    <Tag text="Password:" color="greyLight"/>
                    <Textfield class="form-control" placeholder="Password" type="password" name="password"></Textfield>
                </div>
                    <Button appearance="primary" className="button" type="submit" value="Register">Register</Button>
                    <Button appearance="primary" className="button" type="reset" value="Clear">Clear</Button>
                <div id="loginStatus"></div>
            </form>
        </div>
    )
}