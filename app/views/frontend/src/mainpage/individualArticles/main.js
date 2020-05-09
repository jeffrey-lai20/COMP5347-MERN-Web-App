import React, { useState, Component, useEffect } from "react";
import {ArticleHeading, SubHeading, Result, Chart, UserTable, ArticleSelect} from "./styled";
import Select from '@atlaskit/select';
import { Pie } from 'react-chartjs-2';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { IndividualArticlesCharts } from "./charts/main";
import { RedditArticles } from "./reddit/main"


export const IndividualArticles = () => {
  const [allArticles, setAllArticles] = useState([]);
  const [currentArticle, setCurrentArticle] = useState([]);
  const [currentArticleTitle, setCurrentArticleTitle] = useState("");
  const [topFiveUsers, setTopFiveUsers] = useState([]);
  var topThreeNews;
   // Retrieve list from Express App
   useEffect(() => {
     // GET request
    fetch('/api/individual/getAllArticles').then(res => res.json()).then(list => setAllArticles(list));
  }, [])

  const Snoowrap = require('snoowrap');
    var topThreeNews = [];

    // Build Snoowrap and Snoostorm clients
    const r = new Snoowrap({
        userAgent: 'reddit-bot-example-node',
        clientId: 'QO4LJaIJYqoScQ',
        clientSecret: 'n5iwkKIRcAnpW_a0Q9x9j9oGUtw',
        username: 'ritacheung9',
        password: 'comp5347'
    });

  const allArticlesOptions = allArticles.map(article => ({
    label: "Title: " + article._id.title + " " + "Number of Revisions: " + article.count,
    value: article
  }))

  const articleSelected = (value) => {
      setCurrentArticleTitle(value._id.title);
      setCurrentArticle(value);
      // GET request
      fetch('/api/individual/getTopFiveUsers/?title=' + value._id.title).then(res => res.json()).then(list => setTopFiveUsers(list)); 

      // r.getTop(currentArticleTitle, {limit: 3}).map(post => {
      //   var news = {title:post.title, url:post.url};
      //   topThreeNews.push(news);
      // })
      
  }

  var news = topThreeNews.map((item, key) =>
    <li>{item.title}</li>
  );

  var topFiveUsersTable = topFiveUsers.map(user => {
  
    return (
      <TableBody>
      <TableRow>
        <TableCell align="right">1</TableCell>
        <TableCell align="right">{user._id.user}</TableCell>
        <TableCell align="right">{user.userCount}</TableCell>
      </TableRow>
  </TableBody>
    )
  })
    return (
        <div>
        <ArticleHeading>Individual Articles</ArticleHeading>
        <ArticleSelect>
        <Select 
          onChange = {e => articleSelected(e.value)}
          options = {allArticlesOptions}
          placeholder = "Select an article...">
          </Select>
          </ArticleSelect>

          <SubHeading>Summary Information</SubHeading>
        <Result>
       
        <a><b>Title:</b> {currentArticleTitle}</a>
        <br></br>
        <a><b>Total Number of Revisions:</b> {currentArticle.count}</a>
        <br></br>
        <a><b>Top 5 Regular Users:</b></a>

        <UserTable>
        <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right"><b>Rank</b></TableCell>
            <TableCell align="right"><b>User</b></TableCell>
            <TableCell align="right"><b>Revision Count</b></TableCell>
          </TableRow>
        </TableHead>
        {topFiveUsersTable}

      </Table>
      </UserTable>

      <br></br>
        <a><b>News:</b></a>
        <ul>{news}</ul>

        </Result>

        <IndividualArticlesCharts></IndividualArticlesCharts>
        
    </div>

    )

}