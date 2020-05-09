import React from "react";

import Button, { ButtonAppearances } from '@atlaskit/button';
import Textfield from '@atlaskit/textfield';
import Tag from '@atlaskit/tag';

export const Login = ({loginFunction}) => {

    return (
        <div className="col-sm-6">
            <h2>Please Log In</h2>
            <form action='/login' method='POST' id='loginForm'>
                <div>
                    <Tag text="Username:" color="greyLight"/>
                    <Textfield className="form-control" type="text" placeholder="Username" name="username"
                           required></Textfield>
                </div>
                <div>
                    <Tag text="Password:" color="greyLight"/>
                    <Textfield className="form-control" type="password" placeholder="Password" name="password"></Textfield>
                </div>
                    <Button appearance="primary" className="button" type="submit" value="Login">Login</Button>
                    <Button appearance="primary" className="button" type="reset" value="Clear">Clear</Button>
                <div id="loginStatus"></div>
            </form>
        </div>
    )
}