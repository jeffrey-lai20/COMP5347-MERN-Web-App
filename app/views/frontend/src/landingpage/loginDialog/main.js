import React, { useState, Component, useEffect } from "react";
import Button, { ButtonAppearances } from '@atlaskit/button';
import Textfield from '@atlaskit/textfield';
import Modal, { ModalTransition } from '@atlaskit/modal-dialog';
import {SubHeading, Heading, TextFieldStyle, LoginButton } from './styled';

export const Login = ({loginFunction}) => {
    const [isLoginOpen, setIsLoginOpen] = useState("");
    const [isResetUsernameOpen, setIsResetUsernameOpen] = useState("");
    const [isResetPasswordOpen, setIsResetPasswordOpen] = useState("");
    const [username, setUsername] = useState([]);
    const [inputValue, setInputValue] = React.useState("");
    const [question, setQuestion] = useState([]);

    function handleInputChange(event) {
        setInputValue(event.target.value);
        userSelected(event.target.value)
    }

    const userSelected = (data) => {
        setUsername(data);
        console.log("USERNAME IS" + username);
        fetch('/resetPassword/' + data).then(res => res.json()).then(list => setQuestion(list));
        console.log("QUESTION IS " + question);
    }

    const questionDisplay = question.map(data => {
        console.log("DATA IS "+data._id.resetQuestion);
        return (<SubHeading><div>Reset Password Question: {data._id.resetQuestion}</div></SubHeading>)
    })

    return (
        <div>
            <Button onClick={() => setIsLoginOpen(true)}>Login</Button>
            <ModalTransition>
                {isLoginOpen && (
                    <Modal onClose={() => setIsLoginOpen(false)}>
                        <Heading>Login</Heading>
                        <form action='/login' method='POST' id='loginForm'>
                            <div>
                                <SubHeading>Username:</SubHeading>
                                <TextFieldStyle>
                                    <Textfield className="form-control" type="text" placeholder="Username" name="userName" required/>
                                </TextFieldStyle>
                            </div>
                            <div>
                                <SubHeading>Password:</SubHeading>
                                <TextFieldStyle>
                                    <Textfield className="form-control" type="password" placeholder="Password" name="password" required/>
                                </TextFieldStyle>
                            </div>
                            <LoginButton>
                                <Button appearance="primary" className="button" type="submit" value="Login">Login</Button>
                            </LoginButton>
                            <LoginButton>
                                <Button onClick={() => {setIsLoginOpen(false); setIsResetUsernameOpen(true);}}>Reset Password</Button>
                            </LoginButton>
                        </form>
                    </Modal>
                )}
            </ModalTransition>
            <ModalTransition>
                {isResetUsernameOpen && (
                    <Modal onClose={() => setIsResetUsernameOpen(false)}>
                        <Heading>Reset password</Heading>
                        <form action='/resetPasswordUsername' method='POST' id='resetPasswordUsernameForm'>
                            <div>
                                <SubHeading>Enter username: </SubHeading>
                                <TextFieldStyle>
                                    <input type="text" name="userName" value={ inputValue } onChange={ handleInputChange } />
                                    {console.log("Username is  " + username)}
                                </TextFieldStyle>
                            </div>
                            <LoginButton>
                                <Button appearance="primary" className="button" type="submit" value="Continue"
                                        onClick={() => {setIsResetUsernameOpen(false); setIsResetPasswordOpen(true)}} >Continue</Button>
                            </LoginButton>
                        </form>
                    </Modal>
                )}
            </ModalTransition>
            <ModalTransition>
                {isResetPasswordOpen && (
                    <Modal onClose={() => setIsResetPasswordOpen(false)}>
                        <Heading>Reset password</Heading>
                        <form action='/getResetPasswordAnswer' method='POST' id='resetPasswordAnswerForm'>
                            <div>
                                <SubHeading>Username: </SubHeading>
                                <TextFieldStyle>
                                    <Textfield className="form-control" type="text" placeholder="Username" name="userName" required/>
                                </TextFieldStyle>
                            </div>
                            {questionDisplay}
                            <div>
                                <SubHeading>Answer: </SubHeading>
                                <TextFieldStyle>
                                    <Textfield className="form-control" type="text" placeholder="Answer" name="resetAnswer" required/>
                                </TextFieldStyle>
                            </div>
                            <div>
                                <SubHeading>New password: </SubHeading>
                                <TextFieldStyle>
                                    <Textfield class="form-control" placeholder="Password" type="password" name="password"/>
                                </TextFieldStyle>
                            </div>
                            <div>
                                <SubHeading>Confirm new password: </SubHeading>
                                <TextFieldStyle>
                                    <Textfield class="form-control" placeholder="Password" type="password" name="password2"/>
                                </TextFieldStyle>
                            </div>
                            <LoginButton>
                                <Button appearance="primary" className="button" type="submit" value="ResetPassword">Reset Password</Button>
                            </LoginButton>

                        </form>
                    </Modal>
                )}
            </ModalTransition>
        </div>
    )
}