import React, { useState, Component, useEffect } from "react";
import { ArticleHeading, SubHeading, Result, ArticleSelect } from "./styled"
import Select from '@atlaskit/select';


export const OverallArticles = props => {

	const [topRevisions, setTopRevisions] = useState([]);
	const [lowestRevisions, setLowestRevisions] = useState([]);
	const [largestGroup, setLargestGroup] = useState([]);
	const [smallestGroup, setSmallestGroup] = useState([]);
	const [longestHistory, setLongestHistory] = useState([]);
	const [shortestHistory, setShortestHistory] = useState([]);


  // Retrieve list from Express App
  useEffect(() => {
    fetch('/api/topArticleRevisions').then(res => res.json()).then(list => setTopRevisions(list));
    fetch('/api/lowestArticleRevisions').then(res => res.json()).then(list => setLowestRevisions(list));
    fetch('/api/largestArticleGroup').then(res => res.json()).then(list => setLargestGroup(list));
    fetch('/api/smallestArticleGroup').then(res => res.json()).then(list => setSmallestGroup(list));
    fetch('/api/longesArticletHistory').then(res => res.json()).then(list => setLongestHistory(list));
    fetch('/api/shortestArticleHistory').then(res => res.json()).then(list => setShortestHistory(list));

  }, [])


  const topRevisionsDisplay = topRevisions.map(article => {
    return (<Result><b>Article:</b> {article._id.title} <br></br><b>Number of Revisions:</b> {article.count}
    </Result>)
  })

  const lowestRevisionsDisplay = lowestRevisions.map(article => {
    return (<Result><b>Article:</b> {article._id.title} <br></br><b>Number of Revisions:</b> {article.count}
    </Result>)
  })

  const largestGroupDisplay = largestGroup.map(article => {
    return (<Result><b>Article:</b> {article._id} <br></br><b>Number of Users:</b> {article.titleCount}
    </Result>)
  })

  const smallestGroupDisplay = smallestGroup.map(article => {
    return (<Result><b>Article:</b> {article._id} <br></br><b>Number of Users:</b> {article.titleCount}
    </Result>)
  })

  const longestHistoryDisplay = longestHistory.map(article => {
    return (<Result><b>Article:</b> {article._id} <br></br><b>Age:</b> {article.minTimestamp}
    </Result>)
  })

  const shortestHistoryDisplay = shortestHistory.map(article => {
    return (<Result><b>Article:</b> {article._id} <br></br><b>Age:</b> {article.minTimestamp}
    </Result>)
  })

  const NumberOfArticlesSelect = () => (
    <Select
      options={[
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
        { label: '5', value: '5' },
        { label: '6', value: '6' },
        { label: '7', value: '7' },
        { label: '8', value: '8' },
      ]}
      placeholder="Select number of articles"
    />
  );

  return (
      <div>

        <ArticleHeading>Overall Article Analytics</ArticleHeading>
       
        <ArticleSelect>
        <NumberOfArticlesSelect></NumberOfArticlesSelect>
        </ArticleSelect>
      
        <SubHeading>Top articles with the highest number of revisions</SubHeading>
       
        {topRevisionsDisplay}

        <SubHeading>Top articles with the lowest number of revisions</SubHeading>

        {lowestRevisionsDisplay}

        <SubHeading>Top articles edited by largest group of registered users</SubHeading>

        {largestGroupDisplay}

        <SubHeading>Top articles edited by smallest group of registered users</SubHeading>

        {smallestGroupDisplay}

        <SubHeading>Top articles with the longest history</SubHeading>

        {longestHistoryDisplay}

        <SubHeading>Top articles with the shortest history</SubHeading>

        {shortestHistoryDisplay}
      
        </div>
  );

}