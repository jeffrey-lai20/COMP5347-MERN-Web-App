import React from "react";

import Button, { ButtonAppearances } from '@atlaskit/button';

export const Login = ({loginFunction}) => {

    return (
        <div>
        <h2> Login Page goes here </h2>
        <Button  appearance="primary" href="/main">LOG IN</Button>
        </div>
    )
}