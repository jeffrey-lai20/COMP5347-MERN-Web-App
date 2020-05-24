import React, { useState, Component, useEffect } from "react";
import Button, { ButtonAppearances } from '@atlaskit/button';
import Textfield from '@atlaskit/textfield';
import {SubHeading, Heading, TextField, LoginButton } from './styled';
import Modal, { ModalTransition } from '@atlaskit/modal-dialog';

export const Register = ({signUpFunction}) => {

    const [isOpen, setIsOpen] = useState("");

    return (
        <div>
            <Button onClick={() => setIsOpen(true)}>Sign Up</Button>
            <ModalTransition>
              {isOpen && (
                <Modal onClose={() => setIsOpen(false)}>

                        <Heading>Create an Account</Heading>
                     <form action='/register' method='POST' id='registerForm'>
                        <div>
                            <SubHeading>First name: </SubHeading>
                            <TextField>
                            <Textfield className="form-control" placeholder="First Name" type="text" name="firstName"/>
                            </TextField>
                        </div>
                         <div>
                             <SubHeading>Last name: </SubHeading>
                             <TextField>
                             <Textfield className="form-control" placeholder="Last Name" type="text" name="lastName"/>
                             </TextField>
                         </div>
                         <div>
                             <SubHeading>Email address: </SubHeading>
                             <TextField>
                             <Textfield className="form-control" placeholder="Email Address" type="email" name="email"/>
                             </TextField>
                         </div>
                         <div>
                             <SubHeading>Username: </SubHeading>
                             <TextField>
                             <Textfield class="form-control" placeholder="Username" type="text" name="userName"/>
                             </TextField>
                         </div>
                         <div>
                             <SubHeading>Password: </SubHeading>
                             <TextField>
                             <Textfield class="form-control" placeholder="Password" type="password" name="password"/>
                             </TextField>
                         </div>
                         <div>
                             <SubHeading>Confirm password: </SubHeading>
                             <TextField>
                             <Textfield class="form-control" placeholder="Password" type="password" name="password2"/>
                             </TextField>
                         </div>
                         <div>
                             <SubHeading>Reset question: </SubHeading>
                             <TextField>
                             <Textfield class="form-control" placeholder="Enter a question to reset your password." type="text" name="resetQuestion"/>
                             </TextField>
                         </div>
                         <div>
                             <SubHeading>Answer: </SubHeading>
                             <TextField>
                             <Textfield class="form-control" placeholder="Enter the answer to reset your password." type="text" name="resetAnswer"/>
                             </TextField>
                         </div>
                         <LoginButton>
                         <Button appearance="primary" className="button" type="submit" value="Register">Register</Button>
                         </LoginButton>
                     </form>
                </Modal>
              )}
            </ModalTransition>
        </div>
    )
}