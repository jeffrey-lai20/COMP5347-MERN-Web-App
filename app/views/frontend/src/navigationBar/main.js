import React from "react";

import { NavContainer, LogoutButton } from "./styled";
import { Link } from "react-router-dom";
import Button from "@atlaskit/button/dist/cjs/components/Button";

export const NavigationBar = () => {

    return (
        <NavContainer>
            <form action='/logout' method='POST'>
            <LogoutButton>
                    <a type="submit" value="logout">Log Out</a>
            </LogoutButton>
            </form>
        </NavContainer>
    )
}