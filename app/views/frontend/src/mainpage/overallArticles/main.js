import React, { useState, Component, useEffect } from "react";
import { ArticleHeading, SubHeading, Result } from "./styled"
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
	const [pieChartDist, setPieChartDist] = useState([]);
	const [barChartDist, setBarChartDist] = useState([]);	


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
    fetch('/api/barChartDistYear').then(res => res.json()).then(list => setPieChartDist(list));
    fetch('/api/pieChartDistUsertype').then(res => res.json()).then(list => setBarChartDist(list));
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
  
//  const pieChartDisplay = pieChartDist.map(article => {
//	  return (
//			  <div>
//				  <canvas id="chart"></canvas>
//				  <script>
//				  	const context = document.getElementById('chart').getContext();
//				  	const xlabels = [article._id.usertype];
//				  	const ylabels = [article.count];
//				  	const myChart = new Chart(context, {
//				  		type: 'pie',
//				  		data: [{ 
//				  			labels: xlabels,
//				  			datasets: [{
//				  				label: 'Revision number distribution',
//				  				data: ylabels,
//				  				backgroundColour: [
//				  					'rgba(255,105,145,0.6)',
//				  					'rgba(155,100,210,0.6)',
//				  					'rgba(90,178,255,0.6)',
//				  					'rgba(240,134,67,0.6)'
//				  				]
//				  			}]
//				  		}]
//				  	});
//				  	</script>
//			  	</div>)
//  })
  
  return (
      <div>

        <ArticleHeading>Overall Article Analytics</ArticleHeading>
       
        <NumberOfArticlesSelect></NumberOfArticlesSelect>
      
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
        
        <SubHeading> Pie chart of revision number distribution by user types</SubHeading>
                
        </div>
  );

}