import React, { useState, Component, useEffect } from "react";
import { ArticleHeading, SubHeading, Result, UserTable, ArticleSelect, DateSelect } from "./styled";
import Select from '@atlaskit/select';
import Button from '@atlaskit/button';
import Modal, { ModalTransition } from '@atlaskit/modal-dialog';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { IndividualArticlesCharts } from "./charts/main";
import { RedditArticles } from "./reddit/main"

export const IndividualArticles = props => {
  const [allArticles, setAllArticles] = useState([]);
  const [currentArticle, setCurrentArticle] = useState([]);
  const [currentArticleTitle, setCurrentArticleTitle] = useState("");
  const [currentRevisions, setCurrentRevisions] = useState([]);
  const [topFiveUsers, setTopFiveUsers] = useState([]);
  const [latestRevision, setLatestRevision] = useState([]);
  const [fromYear, setFromYear] = useState("");
  const [toYear, setToYear] = useState("");
  const [validatedFromYear, setValidatedFromYear] = useState("1800");
  const [validatedToYear, setValidatedToYear] = useState("2020");

  const [isOpen, setIsOpen] = useState(false);

  const [yearOptions, setYearOptions] = useState([]);

  // Retrieve list from Express App
  useEffect(() => {
    fetch('/api/individual/getAllArticles').then(res => res.json()).then(list => setAllArticles(list));
  }, [])

  useEffect(() => {
    // GET request
    if (currentArticleTitle != "") {
      fetch('/api/individual/getTopFiveUsers/' + currentArticleTitle + '/' + validatedFromYear + '/' + validatedToYear).then(res => res.json()).then(list => setTopFiveUsers(list));
      fetch('/api/individual/getNumberOfRevisions/' + currentArticleTitle + '/' + validatedFromYear + '/' + validatedToYear).then(res => res.json()).then(list => setCurrentRevisions(list))
    }
  }, [currentArticleTitle, validatedFromYear, validatedToYear])

  useEffect(() => {
    if (currentArticleTitle != "") {
      fetch('/api/individual/getMinYear/' + currentArticleTitle).then(res => res.json())
        .then(list => {
          var min = new Date(list[0].timestamp);
          fetch('/api/individual/getMaxYear/' + currentArticleTitle).then(res => res.json())
            .then(list => {
              var max = new Date(list[0].timestamp);
              var temp = []
              for (var i = min.getFullYear(); i <= max.getFullYear(); i++) {
                temp.push({ label: i, value: i });
              }
              setYearOptions(temp);
            });
        });
    }
  }, [currentArticleTitle])

  const setYearRange = () => {
    // some year validation

    if (fromYear > toYear) {
      setIsOpen(true);
    } else {
      setValidatedFromYear(fromYear);
      setValidatedToYear(toYear);
    }
  }

  const allArticlesOptions = allArticles.map(article => ({
    label: "Title: " + article._id.title + " " + "Number of Revisions: " + article.count,
    value: article
  }))

  const articleSelected = (value) => {
    setCurrentArticleTitle(value._id.title);
    setCurrentArticle(value);
    // GET request
    fetch('/api/individual/getLatestRevision/' + value._id.title).then(res => res.json()).then(list => setLatestRevision(list));
  }

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
          onChange={e => articleSelected(e.value)}
          options={allArticlesOptions}
          placeholder="Select an article...">
        </Select>

      </ArticleSelect>


      {currentArticle != ""
        ? <div>
          <SubHeading>Summary Information - {currentArticleTitle} </SubHeading>
          <DateSelect>
            <Select
              onChange={e => setFromYear(e.value)}
              options={yearOptions}
              placeholder="From: ">
            </Select>

            <br></br>

            <Select
              onChange={e => setToYear(e.value)}
              options={yearOptions}
              placeholder="To: ">
            </Select>
          </DateSelect>

          <Button onClick={setYearRange}>Update</Button>

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
            <RedditArticles currentArticleTitle={currentArticleTitle}></RedditArticles>

          </Result>

          <IndividualArticlesCharts currentArticleTitle={currentArticleTitle} fromYear={validatedFromYear} toYear={validatedToYear} topFiveUsers={topFiveUsers}></IndividualArticlesCharts>
        </div>

        : <div></div>}

      <ModalTransition>
        {isOpen && (
          <Modal onClose={() => setIsOpen(false)} heading="Error">
            <a>Invalid year range entered! Please try again. </a>
            <br></br>
          </Modal>
        )}
      </ModalTransition>

    </div>

  )

}