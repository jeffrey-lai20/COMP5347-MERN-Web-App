import React, { useState, Component, useEffect } from "react";

import Button, { ButtonAppearances } from '@atlaskit/button';
import Textfield from '@atlaskit/textfield';
import Tag from '@atlaskit/tag';

import { DialogBox, Heading } from "./styled"

import Modal, { ModalTransition } from '@atlaskit/modal-dialog';

export const Register = ({signUpFunction}) => {

    const [isOpen, setIsOpen] = useState("");

    return (
        <div>

<Button onClick={() => setIsOpen(true)}>Sign Up</Button>

<ModalTransition>
  {isOpen && (
    <Modal onClose={() => setIsOpen(false)}>
        <DialogBox>
            <Heading>Create an Account</Heading>
         <form action='/register' method='POST' id='registerForm'>
            <div>
                <Tag text="First Name:" color="greyLight"/>
                <Textfield className="form-control" placeholder="First Name" type="text" name="firstName" placeholder='Firstname'/>
            </div>
             <div>
                 <Tag text="Last Name:" color="greyLight"/>
                 <Textfield className="form-control" placeholder="Last Name" type="text" name="lastName"/>
             </div>
             <div>
                 <Tag text="Email Address:" color="greyLight"/>
                 <Textfield className="form-control" placeholder="Email Address" type="email" name="email"/>
             </div>
             <div>
                 <Tag text="Username:" color="greyLight"/>
                 <Textfield class="form-control" placeholder="Username" type="text" name="userName"/>
             </div>
             <div>
                 <Tag text="Password:" color="greyLight"/>
                 <Textfield class="form-control" placeholder="Password" type="password" name="password"/>
             </div>
             <div>
                 <Tag text="Confirm Password:" color="greyLight"/>
                 <Textfield class="form-control" placeholder="Password" type="password" name="password2"/>
             </div>
             <div>
                 <Tag text="Reset Question:" color="greyLight"/>
                 <Textfield class="form-control" placeholder="Enter a question to reset your password." type="text" name="resetQuestion"/>
             </div>
             <div>
                 <Tag text="Reset Answer:" color="greyLight"/>
                 <Textfield class="form-control" placeholder="Enter the answer to reset your password." type="text" name="resetAnswer"/>
             </div>
             <Button appearance="primary" className="button" type="submit" value="Register">Register</Button>
             <Button appearance="primary" className="button" type="reset" value="Clear">Clear</Button>
         </form>
         </DialogBox>
    </Modal>
  )}
</ModalTransition>
        </div>
    )
}