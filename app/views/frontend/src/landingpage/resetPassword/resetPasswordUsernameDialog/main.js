import React, { useState, Component, useEffect } from "react";
import Button, { ButtonAppearances } from '@atlaskit/button';
import Textfield from '@atlaskit/textfield';
import Tag from '@atlaskit/tag';
import Popup from '@atlaskit/popup';

import { ResetPasswordAnswer } from '../resetPasswordAnswerDialog/main.js'
import Modal, { ModalTransition } from '@atlaskit/modal-dialog';
import {Result} from "../../../mainpage/authorAnalytics/styled";



export const ResetPasswordUsername = ({ResetPasswordUsername}) => {
    const [isOpen, setIsOpen] = useState("");

    return (
        <div>
            <Button onClick={() => setIsOpen(true)}>Reset Password</Button>
            <ModalTransition>
                {isOpen && (
                    <Modal onClose={() => setIsOpen(false)} heading="resetPasswordUsername">
                        <form action='/resetPasswordUsername' method='POST' id='resetPasswordUsernameForm'>
                            <div>
                                <Tag text="Username:" color="greyLight"/>
                                <Textfield className="form-control" type="text" placeholder="Username" name="userName" required/>
                            </div>
                            <ResetPasswordAnswer/>
                            <Button appearance="primary" className="button" type="reset" value="Clear">Clear</Button>
                        </form>
                    </Modal>
                )}
            </ModalTransition>
            {/*<Popup*/}
            {/*    isOpen={isOpen2}*/}
            {/*    onClose={() => setIsOpen2(false)}*/}
            {/*    placement="bottom-start"*/}
            {/*    content={() => (*/}
            {/*        <div*/}
            {/*            css={{*/}
            {/*                width: 175,*/}
            {/*                height: 250,*/}
            {/*            }}*/}
            {/*        > HELLO </div>*/}
            {/*    )}*/}
            {/*    trigger={triggerProps => (*/}
            {/*        <Button*/}
            {/*            {...triggerProps}*/}
            {/*            isSelected={isOpen}*/}
            {/*            onClick={() => setIsOpen2(!isOpen2)}*/}
            {/*            iconBefore={<MediaServicesAddCommentIcon label="Add" />}*/}
            {/*        />*/}
            {/*    )}*/}
            {/*/>*/}
        </div>
    )
}