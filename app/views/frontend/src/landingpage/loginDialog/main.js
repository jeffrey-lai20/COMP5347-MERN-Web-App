import React, { useState, Component, useEffect } from "react";

import Button, { ButtonAppearances } from '@atlaskit/button';
import Textfield from '@atlaskit/textfield';
import Tag from '@atlaskit/tag';

import Modal, { ModalTransition } from '@atlaskit/modal-dialog';

export const Login = ({loginFunction}) => {
    const [isOpen, setIsOpen] = useState("");

    // const actions = [
    //     { text: 'Login', onClick: setIsOpen(false) },
    // ];

    return (
        <div>
        <Button onClick={() => setIsOpen(true)}>Login</Button>

        <ModalTransition>
          {isOpen && (
            <Modal onClose={() => setIsOpen(false)} heading="Login">
            {/* <form action='/login' method='POST' id='loginForm'> */}
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

            </Modal>
          )}
        </ModalTransition>
      </div>
    )
}