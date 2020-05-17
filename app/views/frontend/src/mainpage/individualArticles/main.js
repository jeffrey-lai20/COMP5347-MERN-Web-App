import React, { useState, Component, useEffect } from "react";
import {ArticleHeading, SubHeading, Result, Chart, UserTable, ArticleSelect, DateSelect} from "./styled";
import Select from '@atlaskit/select';
import Button from '@atlaskit/button';

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
  const [currentRevisions, setCurrentRevisions] = useState([]);
  const [topFiveUsers, setTopFiveUsers] = useState([]);
  const [latestRevision, setLatestRevision] = useState([]);
  const [fromYear, setFromYear] = useState("");
  const [toYear, setToYear] = useState("");
  const [validatedFromYear, setValidatedFromYear] = useState("1990");
  const [validatedToYear, setValidatedToYear] = useState("2020");

  var topThreeNews;
   // Retrieve list from Express App
   useEffect(() => {
     // GET request
    fetch('/api/individual/getAllArticles').then(res => res.json()).then(list => setAllArticles(list));
    fetch('/api/individual/getTopFiveUsers/'+ currentArticleTitle + '/' + validatedFromYear + '/' + validatedToYear).then(res => res.json()).then(list => setTopFiveUsers(list)); 
  }, [currentArticleTitle, validatedFromYear, validatedToYear])

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

  const setYearRange = () => {
    // some year validation

    setValidatedFromYear(fromYear);
    setValidatedToYear(toYear);
  }

  const allArticlesOptions = allArticles.map(article => ({
    label: "Title: " + article._id.title + " " + "Number of Revisions: " + article.count,
    value: article
  }))

  const articleSelected = (value) => {
      setCurrentArticleTitle(value._id.title);
      setCurrentArticle(value);
      // GET request
      //fetch('/api/individual/getTopFiveUsers/'+ value._id.title + '/' + fromYear + '/' + toYear).then(res => res.json()).then(list => setTopFiveUsers(list)); 

      //fetch('/api/individual/getLatestRevision/?title=' + value._id.title).then(res => res.json()).then(list => setLatestRevision(list)); 

      topThreeNews = [];

      // r.getTop(currentArticleTitle, {limit: 3}).map(post => {
      //   var news = {title:post.title, url:post.url};
      //   topThreeNews.push(news);
      // })
  }

  const updateSummaryInfo = (value) => {

      //fetch('/api/individual/getTopFiveUsers/'+ value._id.title + '/' + fromYear + '/' + toYear).then(res => res.json()).then(list => setTopFiveUsers(list)); 

  }

  // var news = topThreeNews.map(item => {
  //   return (
  //     <li>{item.title}</li>
  //   )
  // }
  // );

  var num = 0;

  var topFiveUsersTable = topFiveUsers.map(user => {
    num = num + 1;
    return (
      <TableBody>
      <TableRow>
        <TableCell align="right">{num}</TableCell>
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


         {currentArticle != "" 
				? <div>
          <SubHeading>Summary Information - {currentArticleTitle} </SubHeading>

          <DateSelect>
          <Select 
          onChange = {e => setFromYear(e.value)}
          options = {[
          {label: "2010", value: "2010"},
          {label: "2011", value: "2011"},
          {label: "2012", value: "2012"},
          {label: "2013", value: "2013"},
          {label: "2014", value: "2014"},
          {label: "2015", value: "2015"},
          {label: "2016", value: "2016"},
          {label: "2017", value: "2017"},
          {label: "2018", value: "2018"},
          {label: "2019", value: "2019"},
          {label: "2020", value: "2020"}
        ]}
          placeholder = "From: ">
          </Select>

          <br></br>

          <Select 
           onChange = {e => setToYear(e.value)}
           options = {[
            {label: "2010", value: "2010"},
            {label: "2011", value: "2011"},
            {label: "2012", value: "2012"},
            {label: "2013", value: "2013"},
            {label: "2014", value: "2014"},
            {label: "2015", value: "2015"},
            {label: "2016", value: "2016"},
            {label: "2017", value: "2017"},
            {label: "2018", value: "2018"},
            {label: "2019", value: "2019"},
            {label: "2020", value: "2020"}
          ]}
          placeholder = "To: ">
          </Select>
          </DateSelect>

          <Button onClick = {setYearRange}>Update</Button>

        <Result>
       
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
        {/* <ul>{news}</ul> */}

        </Result>

        <IndividualArticlesCharts currentArticleTitle={currentArticleTitle} fromYear={validatedFromYear} toYear={validatedToYear} topFiveUsers = {topFiveUsers}></IndividualArticlesCharts>
        </div>

        : <div></div>}
        
    </div>

    )

}