import React, { useState, Component, useEffect } from "react";
import {ArticleSelect, Result} from "./styled";
import Select from '@atlaskit/select';
import { Bar, Pie } from 'react-chartjs-2';

import { RadioGroup } from '@atlaskit/radio';

export const IndividualArticlesCharts = props => {

	const [chartType, setChartType] = useState([]);
	const [userTypeNumbers, setUserTypeNumbers] = useState([]);
	const [barChartDist, setBarChartDist] = useState([]);
	const [barChartDistUser, setBarChartDistUser] = useState([]);
	const [selectedUser, setSelectedUser] = useState("");

	var barChartDataUser = [];

	useEffect(() => {
		// GET request
		fetch('/api/individual/getIndividualPieChartData/' + props.currentArticleTitle + '/' + props.fromYear + '/' + props.toYear).then(res => res.json()).then(list => setUserTypeNumbers(list));
		fetch('/api/individual/barChartDistYear/' + props.currentArticleTitle + '/' + props.fromYear + '/' + props.toYear).then(res => res.json()).then(list => setBarChartDist(list));

		if (selectedUser != "") {
			fetch('/api/individual/barChartDistYearUser/'+ props.currentArticleTitle + '/' + selectedUser + '/' + props.fromYear + '/' + props.toYear).then(res => res.json()).then(list => setBarChartDistUser(list));
		}
	}, [props.currentArticleTitle, selectedUser, props.fromYear, props.toYear])

	const radioValues = props.topFiveUsers.map(user => ({
		name: user._id.user, value: user._id.user, label: user._id.user
	}))

	var dataType = [];
	var dataCount = [];
	var pieChartData;

	const pieChartDisplay = userTypeNumbers.map(user => {
		dataType.push(user._id.usertype);
		dataCount.push(user.userCount);

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
	 *  BAR CHART
	 */
	const bar_years_user = [];
	const bar_registered_user = [];

	const barChartDistUserDisplay = barChartDistUser.map(article => {

		// X axis:
		bar_years_user.push(article._id.year);

		// Y axis:
		bar_registered_user.push(article.registered);

		barChartDataUser = {
				labels: bar_years_user,
				datasets: [
					{
						label: selectedUser,
						backgroundColor: '#FF6384',
						borderColor: '#FF6384',
						borderWidth: 5,
						hoverBackgroundColor: '#FF9BB0',
						hoverBorderColor: '#FF9BB0',
						data: bar_registered_user
					}
					]
		};
	})


	return (
			<div>

			<ArticleSelect>
			<Select 
			onChange = {e =>  setChartType(e.value)}
			options={[
				{ label: 'Revision number distributed by year and user type', value: '1' },
				{ label: 'Revision number distributed based on user type', value: '2' },
				{ label: 'Revision number distributed by year made by one of the top 5 regular users', value: '3' },
				]}
			placeholder = "Select a chart...">
			</Select>
			</ArticleSelect>
			<Result>

			{chartType==1
				? 
						<div><a><b>Bar Chart Showing Yearly Revision Number Distribution:</b></a>
						{barChartDistDisplay}
						<Bar
						data={barChartData}
						width={100}
						height={800}
						options={{
							maintainAspectRatio: false
						}}
						/>
						</div>

						: <a></a>}

			{/* BAR CHART */}

			{chartType==2
				?  <div> 
			<a><b>Pie Chart Showing User Type Distribution:</b></a>
			{pieChartDisplay}
			<Pie data={pieChartData} options={pieHoverOption}/>/>

			</div> : <br></br>}

			{chartType==3
				? <div><a><b>Bar Chart Showing Revision Number Distributed By Year Made By One of the Top 5 Regular Users:</b></a>
				<a>Select from top 5 users</a>
				<RadioGroup
				label="Pick a user"
					onChange={e => setSelectedUser(e.currentTarget.value)}
				options={radioValues}
				/>

				{barChartDistUserDisplay}
				<Bar
				data={barChartDataUser}
				width={100}
				height={800}
				options={{
					maintainAspectRatio: false
				}}
				/>
				</div> : <br></br>}
			</Result>

			</div>
	)

}