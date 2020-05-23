import React from "react";

import { NavContainer, LogoutButton } from "./styled";
import { Link } from "react-router-dom";
import Button from "@atlaskit/button/dist/cjs/components/Button";

export const NavigationBar = () => {

    return (
        <NavContainer>
            <LogoutButton>
            <form action='/logout' method='POST'>
                    <Button appearance="primary" className="button" type="submit" value="logout">Log Out</Button>
            </form>
            </LogoutButton>
        </NavContainer>
    )
}