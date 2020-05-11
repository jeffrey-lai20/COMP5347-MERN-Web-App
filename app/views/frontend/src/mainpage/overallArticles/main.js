import React, { useState, Component, useEffect } from "react";
import { ArticleHeading, SubHeading, Result, ArticleSelect } from "./styled"
import Select from '@atlaskit/select';
import { Bar, Pie } from 'react-chartjs-2';


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

	// Select Statement States
	const [chartType, setChartType] = useState([]);
	const [selectedNumber, setSelectedNumber] = useState("2");



	// Retrieve list from Express App
	useEffect(() => {
		console.log(selectedNumber);
		// Overall: Data
		fetch('/api/topArticleRevisions/?topcount=' + selectedNumber).then(res => res.json()).then(list => setTopRevisions(list));
		fetch('/api/lowestArticleRevisions/?topcount=' + selectedNumber).then(res => res.json()).then(list => setLowestRevisions(list));
		fetch('/api/largestArticleGroup/?topcount=' + selectedNumber).then(res => res.json()).then(list => setLargestGroup(list));
		fetch('/api/smallestArticleGroup/?topcount=' + selectedNumber).then(res => res.json()).then(list => setSmallestGroup(list));
		fetch('/api/longesArticletHistory/?topcount=' + selectedNumber).then(res => res.json()).then(list => setLongestHistory(list));
		fetch('/api/shortestArticleHistory/?topcount=' + selectedNumber).then(res => res.json()).then(list => setShortestHistory(list));
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


	/*
	 *  BAR CHART
	 */
	const bar_years = [];
	const bar_registered = [];
	const bar_anonymous = [];
	const bar_admin = [];
	const bar_bot = [];

	var barChartData = [];

	const barChartDistDisplay = barChartDist.map(article => {

		// X axis:
		bar_years.push(article._id.year);

		// Y axis:
		bar_registered.push(article.registered);
		bar_anonymous.push(article.anonymous);
		bar_admin.push(article.admin);
		bar_bot.push(article.bot);

		barChartData = {
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
	})

	/*
	 *  PIE CHART
	 */
	const dataType = [];
	const dataCount = [];
	var pieChartData = [];
	var totalCount = 0;
	
	const pieSortIndex = [];
	const pieSortPercent = [];

	const pieChartDisplay = pieChartDist.map(article => {
		dataType.push(article._id.usertype);
		dataCount.push(article.count);
		pieSortPercent.push(article.count);
		totalCount = totalCount + article.count;

		pieChartData = {
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
	})

	// Display percentage on pie chart (when hovered)
	var pieHoverOption = {
		tooltips: {
			callbacks: {
				label: function(tooltipItem, pieChartData) {
					var dataset = pieChartData.datasets[tooltipItem.datasetIndex];
					var meta = dataset._meta[Object.keys(dataset._meta)[0]];
					var total = meta.total;
					var currentValue = dataset.data[tooltipItem.index];
					var percentage = parseFloat((currentValue/total*100).toFixed(1));
					return currentValue + ' (' + percentage + '%)';
				},
				title: function(tooltipItem, pieChartData) {
					return pieChartData.labels[tooltipItem[0].index];
				}
			}
		}
	}
	
	// Text information: summary of pie chart
	function calculateSummary() {
		pieSortPercent.sort(function(a,b){return b-a});;
		for (let i = 0; i < pieSortPercent.length; i++) {
			pieSortIndex.push(dataCount.indexOf(pieSortPercent[i]));
			pieSortPercent[i] = ((pieSortPercent[i]/totalCount)*100).toFixed(1);
		}
	}

	const NumberOfArticlesSelect = () => (
			<Select
			onChange = {e => setSelectedNumber(e.value)}
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

			<ArticleSelect>
			<Select
			onChange={e => setChartType(e.value)}
			options={[
				{ label: 'Bar Chart', value: '1' },
				{ label: 'Pie Chart', value: '2' },
				]}
			placeholder="Select a chart...">
			</Select>
			</ArticleSelect>

			{chartType == 1
				? <div><SubHeading> Bar chart of revision number distribution by year and by user types</SubHeading>
					{barChartDistDisplay}
					<div>
						<Bar
						data={barChartData}
						width={100}
						height={800}
						options={{
							maintainAspectRatio: false
						}}
						/>
					</div>
				</div>
				: <a></a>}

			{chartType == 2
				? <div> <SubHeading> Pie chart of revision number distribution by user types</SubHeading>
					{pieChartDisplay}
					<div>
						<Pie data={pieChartData} options={pieHoverOption}/>
					</div>
					
					{calculateSummary()}
					<div>The graph shows the revision number distribution by user type, in which {totalCount} number 
						of users are taken into consideration for this analysis. From the pie chart, 
						it is clear that the revisions were made mostly by {dataType[pieSortIndex[0]]} users that cover for {pieSortPercent[0]} percent, 
						followed by {dataType[pieSortIndex[1]]} users with {pieSortPercent[1]} percent. The {dataType[pieSortIndex[2]]} users stands at {pieSortPercent[2]} percent, which is larger 
						than revision made by {dataType[pieSortIndex[3]]} users ({pieSortPercent[3]} percent).
					</div>
				</div>
				: <a></a>}
			</div>
	);
}