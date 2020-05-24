import React, { useState, Component, useEffect } from "react";

import Button, { ButtonAppearances } from '@atlaskit/button';
import Textfield from '@atlaskit/textfield';
import Tag from '@atlaskit/tag';
import Modal, { ModalTransition } from '@atlaskit/modal-dialog';

import {SubHeading, Heading, TextFieldStyle, LoginButton } from './styled';
import Select from "@atlaskit/select/Select";
import Autocomplete from "@material-ui/lab/Autocomplete/Autocomplete";
import {TextField} from "@material-ui/core";


export const Login = ({loginFunction}) => {
    const [isLoginOpen, setIsLoginOpen] = useState("");
    const [isResetUsernameOpen, setIsResetUsernameOpen] = useState("");
    const [isResetPasswordOpen, setIsResetPasswordOpen] = useState("");
    const [question, setQuestion] = useState([]);
    const [user, setUser] = useState([]);

    // const userData = user.map(data => ({
    //     label: data.userName,
    //     value: data
    // }))

    const userSelected = (value) => {
        console.log(value);
        console.log(value.userName);
        setUser(value.userName);
        fetch('/resetPassword?user=' + user.userName).then(res => res.json()).then(list => setQuestion(list));
    }
    // const getQuestion = (user) => {
    //     setUser(user);
    //     fetch('/resetPassword?user=' + user.userName).then(res => res.json()).then(list => setQuestion(list));
    // }

    const questionDisplay = question.map(data => {
        console.log("quinrwgs");
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
                                    <Textfield className="form-control" type="text" placeholder="Username" name="userName" required/>
                                </TextFieldStyle>
                            </div>
                            <LoginButton>
                                <Button appearance="primary" className="button" type="submit" value="Continue" onChange={(event, valueSelected) => {
                                    userSelected(valueSelected.value)
                                }}
                                        onClick={() => {setIsResetUsernameOpen(false); setIsResetPasswordOpen(true)}} >Continue</Button>
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
                                {/*<TextFieldStyle>*/}
                                {/*    <Textfield className="form-control" type="text" placeholder="Username"*/}
                                {/*               name="userName" required/>*/}
                                {/*</TextFieldStyle>*/}
                                {/*<Button onClick={setYearRange}>Enter Username for Question</Button>*/}

                                <Autocomplete
                                    onChange={(event, valueSelected) => {
                                        userSelected(valueSelected.value)
                                    }}
                                    options={"Enter your username"}
                                    getOptionLabel={(option) => option.label}
                                    style={{ width: 500 }}
                                    renderInput={(params) => <TextField {...params} label="Enter Username" variant="outlined" />}
                                />


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