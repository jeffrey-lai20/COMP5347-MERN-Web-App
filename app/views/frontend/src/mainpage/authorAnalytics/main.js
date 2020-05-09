import React, { useState, Component, useEffect } from "react";

import Select from '@atlaskit/select';

import { ArticleHeading, Result } from "./styled"


export const AuthorAnalytics = () => {
    const [allAuthors, setAllAuthors] = useState([]);
    const [currentAuthor, setCurrentAuthor] = useState([]);

     // Retrieve list from Express App
   useEffect(() => {
    // GET request
   //fetch('/api/author/getAllAuthors').then(res => res.json()).then(list => setAllAuthors(list));
 }, [])

 const allAuthorsOptions = allAuthors.map(author => ({
    label: author.user,
    value: author
  }))

    return (
        <div>
            <ArticleHeading>Author Analytics</ArticleHeading>
            {/* <AuthorSelect>
            <Select
             options = {allAuthorsOptions}
             placeholder = "Search for an author...">

            </Select>
            </AuthorSelect> */}

        <Result>

        <a><b>Author:</b> </a>
        <br></br>
        <a><b>Articles:</b> </a>
        <br></br>
        <a><b>Top 5 Regular Users:</b></a>

        </Result>

          </div>
    )

}