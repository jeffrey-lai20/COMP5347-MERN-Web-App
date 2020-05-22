import React, { useState, Component, useEffect } from "react";
import Button, { ButtonAppearances } from '@atlaskit/button';
import Textfield from '@atlaskit/textfield';
import Tag from '@atlaskit/tag';
import Modal, { ModalTransition } from '@atlaskit/modal-dialog';
import {Result} from "../../../mainpage/authorAnalytics/styled";
export const ResetPasswordAnswer = ({ResetPasswordAnswer}) => {
    const [isOpen, setIsOpen] = useState("");

    // const [question, setQuestion] = useState([]);
    // const [userSelected, setUser] = useState([]);
    // const [allUsers, setAllUsers] = useState([]);

    // useEffect(() => {
    //     // GET request
    //     fetch('/api/user/getQuestion').then(res => res.json()).then(list => setQuestion(list));
    //     fetch('/api/user/setUser').then(res => res.json()).then(list => setUser(list));
    //
    // }, [])
    //
    // const userSelect = (value) => {
    //     setUser(value._id.user);
    //     fetch('/api/user/setUser/?user=' + value._id.user).then(res => res.json()).then(list => setUser(list));
    // }
    // const questionDisplay = userSelected.map(userData => {
    //     return (<Result><b>Question:</b>{question}</Result>)
    // })

    return (
        <div>
            <Button appearance="primary" className="button" type="submit" value="Continue" onClick={() => setIsOpen(true)} >Continue</Button>
            <ModalTransition>
                {isOpen && (
                    <Modal onClose={() => setIsOpen(false)} heading="resetPasswordAnswer">
                        <form action='/getResetPasswordAnswer' method='POST' id='resetPasswordAnswerForm'>
                            <div>
                                <Tag text="Username:" color="greyLight"/>
                                <Textfield className="form-control" type="text" placeholder="Username" name="userName" required/>
                            </div>
                            {/*{questionDisplay}*/}
                            <div>
                                <Tag text="Answer:" color="greyLight"/>
                                <Textfield className="form-control" type="text" placeholder="Answer" name="resetAnswer" required/>
                            </div>
                            <div>
                                <Tag text="New Password:" color="greyLight"/>
                                <Textfield class="form-control" placeholder="Password" type="password" name="password"/>
                            </div>
                            <div>
                                <Tag text="Confirm Password:" color="greyLight"/>
                                <Textfield class="form-control" placeholder="Password" type="password" name="password2"/>
                            </div>
                            <Button appearance="primary" className="button" type="submit" value="ResetPassword">Reset Password</Button>
                            <Button appearance="primary" className="button" type="reset" value="Clear">Clear</Button>
                        </form>
                    </Modal>
                )}
            </ModalTransition>
        </div>
    )
}