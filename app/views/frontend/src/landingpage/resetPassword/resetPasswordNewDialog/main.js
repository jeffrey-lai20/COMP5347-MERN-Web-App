import React, { useState, Component, useEffect } from "react";

import Button, { ButtonAppearances } from '@atlaskit/button';
import Textfield from '@atlaskit/textfield';
import Tag from '@atlaskit/tag';

import Modal, { ModalTransition } from '@atlaskit/modal-dialog';

export const ResetPasswordNew = ({ResetPasswordNew}) => {
    const [isOpen, setIsOpen] = useState("");
    // useEffect(() => {
    //     // GET request
    //     fetch('/api/individual/getIndividualBarChartData/?title=Australia').then(res => res.json()).then(list => setUserTypeNumbers(list));
    // }, [])

    return (
        <div>
            <Button onClick={() => setIsOpen(true)}>Continue</Button>
            <ModalTransition>
                {isOpen && (
                    <Modal onClose={() => setIsOpen(false)} heading="Reset Password">
                        <form action='/resetPasswordNew' method='POST' id='resetPasswordNewForm'>
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