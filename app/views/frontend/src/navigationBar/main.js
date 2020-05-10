import React from "react";

import { NavContainer, LogoutButton } from "./styled";
import { Link } from "react-router-dom";

export const NavigationBar = () => {

    return (
        <NavContainer>

            <LogoutButton>
                <Link to="/"> Log Out </Link>
            </LogoutButton>
        </NavContainer>
    )
}