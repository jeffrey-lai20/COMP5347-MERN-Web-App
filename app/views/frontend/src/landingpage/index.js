import React from "react";

import Button, { ButtonAppearances } from '@atlaskit/button';

export const LandingPage = () => {

    return (
        <div>
            <title>Wikipedia Analytics</title>
            <div>
                <h1>Wiki Analytic Heading</h1>
                <p>Little description on what this is, stuff like wikipedia articles
                and revisions idk</p>
            </div>
            <div id="image_section">
                <div class = "col-sm-6">
                    <h2>Description of first image</h2>
                    <img src="image URL goes here" alt="First image here"></img>
                </div>
                <div className="col-sm-6">
                    <h2>Description of second image</h2>
                    <img src="image URL goes here" alt="Second image here"></img>
                </div>
            </div>
            <Button appearance="primary" href="/login">Login</Button>
            <Button  appearance="primary" href="/signup">Sign Up</Button>
        </div>
    )
}