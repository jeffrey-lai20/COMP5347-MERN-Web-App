import React from "react";

export const Login = ({loginFunction}) => {

    return (
        <div>
        <h2> Login Page goes here </h2>
        <button onClick={loginFunction}>LOG IN</button>
        </div>
    )
}