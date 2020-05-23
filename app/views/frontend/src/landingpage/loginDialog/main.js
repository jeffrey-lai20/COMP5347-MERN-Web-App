import React, { useState, Component, useEffect } from "react";

import Button, { ButtonAppearances } from '@atlaskit/button';
import Textfield from '@atlaskit/textfield';
import Tag from '@atlaskit/tag';
import Modal, { ModalTransition } from '@atlaskit/modal-dialog';

import {SubHeading, Heading, TextField, LoginButton } from './styled';

export const Login = ({loginFunction}) => {
    const [isLoginOpen, setIsLoginOpen] = useState("");
    const [isResetUsernameOpen, setIsResetUsernameOpen] = useState("");
    const [isResetPasswordOpen, setIsResetPasswordOpen] = useState("");
    const [question, setQuestion] = useState([]);
    const [user, setUser] = useState([]);

    const userData = user.map(data => ({
        label: data.userName,
        value: data
    }))

    const getQuestion = (user) => {
        setUser(user);
        fetch('/resetPassword?user=' + user.userName).then(res => res.json()).then(list => setQuestion(list));
    }

    const questionDisplay = question.map(data => {
        return (<h3>Question: {data}</h3> )
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
                                <TextField>
                                    <Textfield className="form-control" type="text" placeholder="Username" name="userName" required/>
                                </TextField>
                            </div>
                            <div>
                                <SubHeading>Password:</SubHeading>
                                <TextField>
                                    <Textfield className="form-control" type="password" placeholder="Password" name="password" required/>
                                </TextField>
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
                                <TextField>
                                    <Textfield className="form-control" type="text" placeholder="Username" name="userName" required/>
                                </TextField>
                            </div>
                            <LoginButton>
                                <Button appearance="primary" className="button" type="submit" value="Continue"
                                        onClick={() => {setIsResetUsernameOpen(false); setIsResetPasswordOpen(true); getQuestion("getElementByName('userName').innerHTML")}} >Continue</Button>
                                {/**/}
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
                                <TextField>
                                    <Textfield className="form-control" type="text" placeholder="Username" name="userName" required/>
                                </TextField>
                            </div>
                            {questionDisplay}
                            <div>
                                <SubHeading>Answer: </SubHeading>
                                <TextField>
                                    <Textfield className="form-control" type="text" placeholder="Answer" name="resetAnswer" required/>
                                </TextField>
                            </div>
                            <div>
                                <SubHeading>New password: </SubHeading>
                                <TextField>
                                    <Textfield class="form-control" placeholder="Password" type="password" name="password"/>
                                </TextField>
                            </div>
                            <div>
                                <SubHeading>Confirm new password: </SubHeading>
                                <TextField>
                                    <Textfield class="form-control" placeholder="Password" type="password" name="password2"/>
                                </TextField>
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