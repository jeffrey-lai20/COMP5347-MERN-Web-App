import React from "react";

import Button, { ButtonAppearances } from '@atlaskit/button';

export const LandingPage = () => {

    return (
        <div>
        <h2> Here is the landing page - Wikipedia Analytics</h2>
        <Button appearance="primary" href="/login">Click to Login</Button>

        <Button  appearance="primary">Create an account</Button>
        </div>
    )
}