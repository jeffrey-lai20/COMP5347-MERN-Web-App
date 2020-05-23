import React, { useState, CSSProperties, ReactElement } from 'react';
import Button, { ButtonAppearances } from '@atlaskit/button';
import { Login } from './loginDialog/main'
import { Register } from './registerDialog/main'
import {colors, gridSize} from "@atlaskit/theme";
import Flag from "@atlaskit/flag/dist/cjs/components/Flag";
import Tick from "@atlaskit/icon/glyph/check-circle";
import Error from "@atlaskit/icon/glyph/error";


export const LandingPage = () => {
    const actions = [
        { content: 'Understood', onClick: () => {} },
    ];
    const appearances: { [key: string]: { description: string; title: string } } = {
        error: {
            description: 'You need to take action, something has gone terribly wrong!',
            title: 'Uh oh!',
        },

        success: {
            description: 'Nothing to worry about, everything is going great!',
            title: 'Good news, everyone',
        },
    };
    const iconMap = (key: string) => {
        const icons: { [key: string]: ReactElement } = {
            success: <Tick label="Success" secondaryColor={colors.G400} />,
            error: <Error label="Error icon" secondaryColor={colors.R300} />,
        };

        return key ? icons[key] : icons;
    };
    const getIcon = (key: string) => {
        return iconMap(key);
    };
    return (
        <div>
            <title>Wikipedia Analytics</title>
            <div>
                <h1>Wiki Analytic Heading</h1>
                <p>Little description on what this is, stuff like wikipedia articles
                and revisions idk</p>
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
            <Login/>
            <Register/>
            {/*{Object.keys(appearances).map((type, idx) => (*/}
            {/*    <div*/}
            {/*        key={'error'}*/}
            {/*        style={idx ? ({ marginTop: gridSize() }) : undefined}*/}
            {/*    >*/}
            {/*        <Flag*/}
            {/*            actions={actions}*/}
            {/*            appearance={'error'}*/}
            {/*            description={appearances['error'].description}*/}
            {/*            icon={getIcon('error')}*/}
            {/*            id={'error'}*/}
            {/*            isDismissAllowed*/}
            {/*            key={'error'}*/}gi
            {/*            title={appearances['error'].title}*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*))}*/}
        </div>
    )
}