import React, { useState, Component, useEffect } from "react";
import { ArticleHeading, SubHeading, Result} from "./styled"
import Select from '@atlaskit/select';
import Button, { ButtonAppearances } from '@atlaskit/button';
import Textfield from '@atlaskit/textfield';
import Tag from '@atlaskit/tag';
import Autocomplete from '@material-ui/lab/Autocomplete';


export const AuthorAnalytics = () => {
    const [allAuthors, setAllAuthors] = useState([]);
    const [currentAuthor, setCurrentAuthor] = useState([]);

    useEffect(() => {
        // GET request
        fetch('/api/author/getAllAuthors').then(res => res.json()).then(list => setAllAuthors(list));
        fetch('/api/author/getAuthor').then(res => res.json()).then(list => setCurrentAuthor(list));

    }, [])

    const authorCurrentDisplay = currentAuthor.map(article => {
        return (<Result><b>Author:</b>{article._id.user}<b><br/>Article:</b> {article._id.title} <br></br><b>Number of Revisions:</b> {article.count} </Result>)
    })

    const allAuthorOptions = allAuthors.map(article => ({
        label: "Author: " + article._id.user + " " + "Number of Revisions: " + article.count,
        value: article
    }))

    const authorSelected = (value) => {
        setCurrentAuthor(value._id.user);
        // GET request
    }


    return (
        <div>
            <ArticleHeading>Author Article Analytics</ArticleHeading>
            <div>
                <Tag text="Author Search:" color="greyLight"/>
                <Textfield className="form-control" type="text" placeholder="Author's Name" name="authorName" required/>
                <Select
                    onChange={e => authorSelected(e.value)}
                    options={allAuthorOptions}
                    placeholder="Select an author...">
                </Select>

                {/*<Autocomplete*/}
                {/*    name="authorName"*/}
                {/*    placeholder="Author's Name"*/}
                {/*    options={allAuthorsOptions}*/}
                {/*    getOptionLabel={(option)=>option.title}*/}
                {/*    style={{ width: 300}}*/}
                {/*    renderInput={(params) => <Textfield {...params} label="Combo box" variant="outlined" />}*/}
                {/*    />*/}
            </div>
            <Button appearance="primary" className="button" type="submit" value="Search">Search</Button>
            <Button appearance="primary" className="button" type="reset" value="Clear">Clear</Button>

            <SubHeading>Articles the author has written/edited</SubHeading>
            {/*{allAuthorsOptions}*/}
            {authorCurrentDisplay}

        </div>
    );
}