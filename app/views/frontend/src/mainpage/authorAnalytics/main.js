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

//
//      // Retrieve list from Express App
//    useEffect(() => {
//     // GET request
//    //fetch('/api/author/getAllAuthors').then(res => res.json()).then(list => setAllAuthors(list));
//  }, [])
//
//  const allAuthorsOptions = allAuthors.map(author => ({
//     label: author.user,
//     value: author
//   }))
//
//     return (
//         <div>
//             <ArticleHeading>Author Analytics</ArticleHeading>
//
//         <Result>
//
//         <a><b>Author:</b> </a>
//         <br></br>
//         <a><b>Articles:</b> </a>
//         <br></br>
//         <a><b>Top 5 Regular Users:</b></a>
//
//         </Result>
//
//           </div>
    //     )
    const [longestHistory, setLongestHistory] = useState([]);

    // Retrieve list from Express App
    useEffect(() => {
        // console.log();
        // Overall: Data
       fetch('/api/author/getAllAuthors').then(res => res.json()).then(list => setAllAuthors(list));

       fetch('/api/longesArticletHistory/?topcount=' + 3).then(res => res.json()).then(list => setLongestHistory(list));
    }, [])

    const longestHistoryDisplay = longestHistory.map(article => {
        return (<Result><b>Article:</b> {article._id} <br></br><b>Author:</b> {article.user}
        </Result>)
    })

    const authorArticlesDisplay = currentAuthor.map(article => {
        return (<Result><b>Article:</b> {article._id} <br/><b>Author:</b> {article.user}</Result>)
    })

    return (
        <div>
            <ArticleHeading>Author Article Analytics</ArticleHeading>
            <div>
                <Tag text="Author Search:" color="greyLight"/>
                <Textfield className="form-control" type="text" placeholder="Author's Name" name="authorName" required/>
                <Autocomplete
                    name="authorName"
                    placeholder="Author's Name"
                    options={allAuthors}
                    getOptionLabel={(option)=>option.title}
                    style={{ width: 300}}
                    renderInput={(params) => <Textfield {...params} label="Combo box" variant="outlined" />}
                    />
            </div>
            <Button appearance="primary" className="button" type="submit" value="Search">Search</Button>
            <Button appearance="primary" className="button" type="reset" value="Clear">Clear</Button>

            <SubHeading>Articles the author has written/edited</SubHeading>
            {authorArticlesDisplay}
            <SubHeading>Top articles with the longest history</SubHeading>

            {longestHistoryDisplay}
        </div>

    );
}