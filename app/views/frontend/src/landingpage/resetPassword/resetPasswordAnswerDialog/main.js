import React, { useState, Component, useEffect } from "react";

import Button, { ButtonAppearances } from '@atlaskit/button';
import Textfield from '@atlaskit/textfield';
import Tag from '@atlaskit/tag';
import { ResetPasswordNew } from '../resetPasswordNewDialog/main.js'


import Modal, { ModalTransition } from '@atlaskit/modal-dialog';

export const ResetPasswordAnswer = ({ResetPasswordAnswer}) => {
    const [isOpen, setIsOpen] = useState("");
    // useEffect(() => {
    //     // GET request
    //     fetch('/api/individual/getIndividualBarChartData/?title=Australia').then(res => res.json()).then(list => setUserTypeNumbers(list));
    // }, [])

    return (
        <div>
            <Button onClick={() => setIsOpen(true)} >Continue</Button>
            <ModalTransition>
                {isOpen && (
                    <Modal onClose={() => setIsOpen(false)} heading="Reset Password">
                        <form action='/resetPasswordAnswer' method='GET' id='resetPasswordAnswerForm'>
                            <div>

                                <Tag text="Answer:" color="greyLight"/>
                                <Textfield className="form-control" type="text" placeholder="Answer" name="resetAnswer" required/>
                            </div>
                            <ResetPasswordNew/>
                            <Button appearance="primary" className="button" type="reset" value="Clear">Clear</Button>
                        </form>
                    </Modal>
                )}
            </ModalTransition>
        </div>
    )
}