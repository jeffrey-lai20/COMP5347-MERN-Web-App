import React, { useState, Component, useEffect } from "react";
import { ArticleHeading, SubHeading, Result} from "./styled"
import Autocomplete from '@material-ui/lab/Autocomplete';
import {TextField} from "@material-ui/core";


export const AuthorAnalytics = () => {
    const [allAuthors, setAllAuthors] = useState([]);
    const [currentAuthor, setCurrentAuthor] = useState([]);
    const [currentAuthorUser, setCurrentAuthorUser] = useState([]);

    useEffect(() => {
        // GET request
        fetch('/api/author/getAllAuthors').then(res => res.json()).then(list => setAllAuthors(list));
        fetch('/api/author/getAuthor').then(res => res.json()).then(list => setCurrentAuthor(list));
    }, [])

    const allAuthorOptions = allAuthors.map(article => ({
        label: article._id.user,
        value: article
    }))

    const authorSelected = (value) => {
        setCurrentAuthorUser(value._id.user);
        fetch('/api/author/getAuthor/?user=' + value._id.user).then(res => res.json()).then(list => setCurrentAuthor(list));
    }

    const authorCurrentDisplay = currentAuthor.map(article => {
        return (<Result><b>Author:</b>{article._id.user}<b><br/>Article:</b> {article._id.title} <br></br><b>Number of Revisions:</b> {article.count} </Result>)
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
                    <SubHeading>Articles the author has written/edited</SubHeading>
                    {authorCurrentDisplay}
                </div>: <div></div>

            }
        </div>
    );
}