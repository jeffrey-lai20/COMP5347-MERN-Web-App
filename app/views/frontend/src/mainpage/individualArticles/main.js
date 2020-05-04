import React, { useState, Component, useEffect } from "react";
import {ArticleHeading, SubHeading, Result} from "./styled";
import Select from '@atlaskit/select';


export const IndividualArticles = () => {
  const [allArticles, setAllArticles] = useState([]);
  const [currentArticle, setCurrentArticle] = useState([]);
  const [currentArticleTitle, setCurrentArticleTitle] = useState([]);
   // Retrieve list from Express App
   useEffect(() => {
    fetch('/api/individual/getAllArticles').then(res => res.json()).then(list => setAllArticles(list));
  }, [])

  const allArticlesOptions = allArticles.map(article => ({
    label: "Title: " + article._id.title + "               " + "Number of Revisions: " + article.count,
    value: article
  }))

  const articleSelected = (value) => {
      setCurrentArticleTitle(value._id.title);
      setCurrentArticle(value);
  }

    return (
        <div>
        <ArticleHeading>Individual Articles</ArticleHeading>

        <Select 
          onChange = {e => articleSelected(e.value)}
          options = {allArticlesOptions}
          placeholder = "Select an article...">
          </Select>

         <SubHeading>Summary Information</SubHeading>
        <Result>
       
        <a><b>Title:</b> {currentArticleTitle}</a>
        <br></br>
        <a><b>Total Number of Revisions:</b> {currentArticle.count}</a>
        <br></br>
        </Result>

    </div>

    )

}