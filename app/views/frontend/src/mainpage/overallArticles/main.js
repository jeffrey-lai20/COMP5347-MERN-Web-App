import React, { useState, Component, useEffect } from "react";
import { ArticleHeading, SubHeading, Result, ArticleSelect } from "./styled"
import Select from '@atlaskit/select';
import {Bar, Pie} from 'react-chartjs-2';


export const OverallArticles = props => {

	// Overall: Data
	const [topRevisions, setTopRevisions] = useState([]);
	const [lowestRevisions, setLowestRevisions] = useState([]);
	const [largestGroup, setLargestGroup] = useState([]);
	const [smallestGroup, setSmallestGroup] = useState([]);
	const [longestHistory, setLongestHistory] = useState([]);
	const [shortestHistory, setShortestHistory] = useState([]);
	// Overall: Chart
	const [barChartDist, setBarChartDist] = useState([]);	
	const [pieChartDist, setPieChartDist] = useState([]);


  // Retrieve list from Express App
  useEffect(() => {
	// Overall: Data
    fetch('/api/topArticleRevisions').then(res => res.json()).then(list => setTopRevisions(list));
    fetch('/api/lowestArticleRevisions').then(res => res.json()).then(list => setLowestRevisions(list));
    fetch('/api/largestArticleGroup').then(res => res.json()).then(list => setLargestGroup(list));
    fetch('/api/smallestArticleGroup').then(res => res.json()).then(list => setSmallestGroup(list));
    fetch('/api/longesArticletHistory').then(res => res.json()).then(list => setLongestHistory(list));
    fetch('/api/shortestArticleHistory').then(res => res.json()).then(list => setShortestHistory(list));
	// Overall: Chart
    fetch('/api/barChartDistYear').then(res => res.json()).then(list => setBarChartDist(list));
    fetch('/api/pieChartDistUsertype').then(res => res.json()).then(list => setPieChartDist(list));
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
  
  
  const bar_years = [];
  const bar_registered = [];
  const bar_anonymous = [];
  const bar_admin = [];
  const bar_bot = [];
  
  const barChartDistDisplay = barChartDist.map(article => {
	  
	  // X axis:
	  bar_years.push(article._id.year);
	  
	  // Y axis:
	  bar_registered.push(article.registered);
	  bar_anonymous.push(article.anonymous);
	  bar_admin.push(article.admin);
	  bar_bot.push(article.bot);
	  
	  const data = {
			  labels: bar_years,
			  datasets: [
			    {
				      label: 'Registered',
				      backgroundColor: 'rgba(255,99,132,0.2)',
				      borderColor: 'rgba(255,99,132,1)',
				      borderWidth: 1,
				      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
				      hoverBorderColor: 'rgba(255,99,132,1)',
				      data: bar_registered
			    },
			    {
				      label: 'Anonymous',
				      backgroundColor: 'rgba(250,255,10,0.2)',
				      borderColor: 'rgba(250,255,10,1)',
				      borderWidth: 1,
				      hoverBackgroundColor: 'rgba(250,255,10,0.4)',
				      hoverBorderColor: 'rgba(250,255,10,1)',
				      data: bar_anonymous
				},
				{
				      label: 'Administrator',
				      backgroundColor: 'rgba(18,10,255,0.2)',
				      borderColor: 'rgba(18,10,255,1)',
				      borderWidth: 1,
				      hoverBackgroundColor: 'rgba(18,10,255,0.4)',
				      hoverBorderColor: 'rgba(18,10,255,1)',
				      data: bar_admin
				},
				{
				      label: 'Bot',
				      backgroundColor: 'rgba(22,255,10,0.2)',
				      borderColor: 'rgba(22,255,10,1)',
				      borderWidth: 1,
				      hoverBackgroundColor: 'rgba(22,255,10,0.4)',
				      hoverBorderColor: 'rgba(22,255,10,1)',
				      data: bar_bot
				}
			  ]
	  };
	  return (
		      <div>
		        <Bar
		          data={data}
		          width={100}
		          height={800}
		          options={{
		            maintainAspectRatio: false
		          }}
		        />
		      </div>
	  )
  })
 
  const dataType = [];
  const dataCount = [];
  
  const pieChartDisplay = pieChartDist.map(article => {
	  dataType.push(article._id.usertype);
	  dataCount.push(article.count);
	  
	  const data = {
				labels: dataType,
				datasets: [{
					data: dataCount,
					backgroundColor: [
					'#FF6384',
					'#36A2EB',
					'#FFCE56',
					'#00FF00'
					],
					hoverBackgroundColor: [
					'#FF6384',
					'#36A2EB',
					'#FFCE56',
					'#00FF00'
					]
				}]
		};
	  
	  return (
		      <div>
		        <Pie data={data} />
		      </div>
	  )
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
        
        <SubHeading> Bar chart of revision number distribution by year and by user types</SubHeading>
        
        {barChartDistDisplay}
        
        <SubHeading> Pie chart of revision number distribution by user types</SubHeading>
        
        {pieChartDisplay}
                
        </div>
  );

}