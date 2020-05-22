import React, { useState, Component, useEffect } from "react";
import { ArticleHeading, SubHeading, Result, ModalResult} from "./styled"
import Autocomplete from '@material-ui/lab/Autocomplete';
import {TextField} from "@material-ui/core";
import Modal, { ModalTransition } from '@atlaskit/modal-dialog';


export const AuthorAnalytics = () => {
    const [allAuthors, setAllAuthors] = useState([]);
    const [currentAuthor, setCurrentAuthor] = useState([]);
    const [currentAuthorUser, setCurrentAuthorUser] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [currentArticle, setCurrentArticle] = useState([]);
    const [revisions, setRevisions] = useState([]);

    useEffect(() => {
        // GET request
        fetch('/api/author/getAllAuthors').then(res => res.json()).then(list => setAllAuthors(list));
       // fetch('/api/author/getAuthor').then(res => res.json()).then(list => setCurrentAuthor(list));
    }, [])

    useEffect(() => {
        fetch('/api/author/getRevisionTimestamps/' + currentAuthorUser + '/' + currentArticle).then(res => res.json()).then(list => setRevisions(list));
    }, [currentArticle, currentAuthorUser])

    const allAuthorOptions = allAuthors.map(article => ({
        label: article._id.user,
        value: article
    }))

    const authorSelected = (value) => {
        setCurrentAuthorUser(value._id.user);
        fetch('/api/author/getAuthor/?user=' + value._id.user).then(res => res.json()).then(list => setCurrentAuthor(list));
    }

    const timestampsDisplay = revisions.map(revision => {
        return (<li>{revision.timestamp}</li>)
    })

    const getArticleTimestamps = (value) => {
        setCurrentArticle(value);
        setIsOpen(true);
    }

    const authorCurrentDisplay = currentAuthor.map(article => {
        return (<li><a onClick={() => getArticleTimestamps(article._id.title)}>{article._id.title}</a> - <b>Number of Revisions:</b> {article.count} </li>)
    })

    return (
        <div>
            <ArticleHeading>Author Article Analytics</ArticleHeading>
            <div>
                <Autocomplete
                    onChange={(event, valueSelected) => {
                        authorSelected(valueSelected.value)
                    }}
                    options={allAuthorOptions}
                    getOptionLabel={(option) => option.label}
                    style={{ width: 500 }}
                    renderInput={(params) => <TextField {...params} label="Search for an Author" variant="outlined" />}
                />
            </div>
            {currentAuthorUser != ""
                ? <div>
                    <SubHeading>Articles {currentAuthorUser} has written/edited</SubHeading>
                    <Result>
                        <ul>
                    {authorCurrentDisplay}
                    </ul>
                    </Result>
                </div>: <div></div>

            }

        {/* <Button onClick={() => setIsOpen(true)}>Login</Button> */}
        <ModalTransition>
          {isOpen && (
            <Modal onClose={() => setIsOpen(false)}>
                <SubHeading>Revisions made to {currentArticle} by {currentAuthorUser}</SubHeading>

                <ModalResult>
                <ul>
                {timestampsDisplay}
                </ul>
                </ModalResult>
            </Modal>
          )}
        </ModalTransition>
        </div>

    );
}