import React, { useState, Component, useEffect } from "react";
import { SubHeading, ArticleSelect, Result } from "./styled";
import Select from '@atlaskit/select';
import { Bar, Pie } from 'react-chartjs-2';

export const OverallArticlesCharts = props => {
	// Overall: Chart
	const [barChartDist, setBarChartDist] = useState([]);
	const [pieChartDist, setPieChartDist] = useState([]);
	const [chartType, setChartType] = useState([]);
	
	useEffect(() => {
		// Overall: Chart
		fetch('/api/barChartDistYear').then(res => res.json()).then(list => setBarChartDist(list));
		fetch('/api/pieChartDistUsertype').then(res => res.json()).then(list => setPieChartDist(list));
	}, []);
		
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
						backgroundColor: '#FF6384',
						borderColor: '#FF6384',
						borderWidth: 1,
						hoverBackgroundColor: '#FF9BB0',
						hoverBorderColor: '#FF9BB0',
						data: bar_registered
					},
					{
						label: 'Anonymous',
						backgroundColor: '#36A2EB',
						borderColor: '#36A2EB',
						borderWidth: 1,
						hoverBackgroundColor: '#70B8E8',
						hoverBorderColor: '#70B8E8',
						data: bar_anonymous
					},
					{
						label: 'Administrator',
						backgroundColor: '#FFCE56',
						borderColor: '#FFCE56',
						borderWidth: 1,
						hoverBackgroundColor: '#FFE4A1',
						hoverBorderColor: '#FFE4A1',
						data: bar_admin
					},
					{
						label: 'Bot',
						backgroundColor: '#00FF00',
						borderColor: '#00FF00',
						borderWidth: 1,
						hoverBackgroundColor: '#7EFF7E',
						hoverBorderColor: '#7EFF7E',
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
	
	
	return (
			<div>
			
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
			<Result>

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
					<Result>The graph shows the revision number distribution by user type, in which {totalCount} number 
						of users are taken into consideration for this analysis. From the pie chart, 
						it is clear that the revisions were made mostly by <b>{dataType[pieSortIndex[0]]}</b> users that cover for <b>{pieSortPercent[0]}</b> percent, 
						followed by <b>{dataType[pieSortIndex[1]]}</b> users with <b>{pieSortPercent[1]}</b> percent. 
						The <b>{dataType[pieSortIndex[2]]}</b> users stands at <b>{pieSortPercent[2]}</b> percent, which is larger 
						than revision made by <b>{dataType[pieSortIndex[3]]}</b> users (<b>{pieSortPercent[3]}</b> percent).
					</Result>
				</div>
				: <a></a>}
			</Result>
			</div>
	)
}