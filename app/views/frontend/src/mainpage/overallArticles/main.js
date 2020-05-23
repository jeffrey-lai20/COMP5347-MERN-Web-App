import React, { useState, Component, useEffect } from "react";
import { ArticleHeading, SubHeading, Result, ArticleSelect } from "./styled"
import Select from '@atlaskit/select';
import { Bar, Pie } from 'react-chartjs-2';

import { OverallArticlesCharts } from "./charts/main";

var defaultArticleNum = 2;

export const OverallArticles = props => {

	// Overall: Data
	const [topRevisions, setTopRevisions] = useState([]);
	const [lowestRevisions, setLowestRevisions] = useState([]);
	const [largestGroup, setLargestGroup] = useState([]);
	const [smallestGroup, setSmallestGroup] = useState([]);
	const [longestHistory, setLongestHistory] = useState([]);
	const [shortestHistory, setShortestHistory] = useState([]);
	// Overall: Chart
//	const [barChartDist, setBarChartDist] = useState([]);
//	const [pieChartDist, setPieChartDist] = useState([]);

	// Select Statement States
	const [chartType, setChartType] = useState([]);
	const [selectedNumber, setSelectedNumber] = useState([defaultArticleNum]);


	// Retrieve list from Express App
	useEffect(() => {
		// Overall: Data
		fetch('/api/topArticleRevisions/?topcount=' + selectedNumber).then(res => res.json()).then(list => setTopRevisions(list));
		fetch('/api/lowestArticleRevisions/?topcount=' + selectedNumber).then(res => res.json()).then(list => setLowestRevisions(list));
		fetch('/api/largestArticleGroup/?topcount=' + selectedNumber).then(res => res.json()).then(list => setLargestGroup(list));
		fetch('/api/smallestArticleGroup/?topcount=' + selectedNumber).then(res => res.json()).then(list => setSmallestGroup(list));
		fetch('/api/longesArticletHistory/?topcount=' + selectedNumber).then(res => res.json()).then(list => setLongestHistory(list));
		fetch('/api/shortestArticleHistory/?topcount=' + selectedNumber).then(res => res.json()).then(list => setShortestHistory(list));
	}, [selectedNumber])

	const topRevisionsDisplay = topRevisions.map(article => {
		return (<li><i>{article._id.title}</i> - <b>Number of Revisions:</b> {article.count}
		</li>)
	})

	const lowestRevisionsDisplay = lowestRevisions.map(article => {
		return (<li><i>{article._id.title}</i> - <b>Number of Revisions:</b> {article.count}
		</li>)
	})

	const largestGroupDisplay = largestGroup.map(article => {
		return (<li><i>{article._id}</i> - <b>Number of Users:</b> {article.titleCount}
		</li>)
	})

	const smallestGroupDisplay = smallestGroup.map(article => {
		return (<li><i>{article._id}</i> - <b>Number of Users:</b> {article.titleCount}
		</li>)
	})

	const longestHistoryDisplay = longestHistory.map(article => {
		return (<li><i>{article._id}</i> - <b>Age:</b> {article.minTimestamp}
		</li>)
	})

	const shortestHistoryDisplay = shortestHistory.map(article => {
		return (<li><i>{article._id}</i> - <b>Age:</b> {article.minTimestamp}
		</li>)
	})
	
	const articlesSelect = (e) => {
		setSelectedNumber([e.value]);
		console.log(selectedNumber);
	}

	return (
			<div>

			<ArticleHeading>Overall Article Analytics</ArticleHeading>

			<ArticleSelect>
			
			<Select
				onChange = {articlesSelect}
				options={[
					{ label: '1', value: 1 },
					{ label: '2', value: 2 },
					{ label: '3', value: 3 },
					{ label: '4', value: 4 },
					{ label: '5', value: 5 },
					{ label: '6', value: 6 },
					{ label: '7', value: 7 },
					{ label: '8', value: 8 },
					]}
				placeholder="Select number of articles"
			/>

			</ArticleSelect>

			<SubHeading>Top articles with the highest number of revisions</SubHeading>
			<Result>{topRevisionsDisplay}</Result>

			<SubHeading>Top articles with the lowest number of revisions</SubHeading>

			<Result>{lowestRevisionsDisplay}</Result>

			<SubHeading>Top articles edited by largest group of registered users</SubHeading>

			<Result>{largestGroupDisplay}</Result>

			<SubHeading>Top articles edited by smallest group of registered users</SubHeading>

			<Result>{smallestGroupDisplay}</Result>

			<SubHeading>Top articles with the longest history</SubHeading>

			<Result>{longestHistoryDisplay}</Result>

			<SubHeading>Top articles with the shortest history</SubHeading>

			<Result>{shortestHistoryDisplay}</Result>

			<OverallArticlesCharts></OverallArticlesCharts>
			
			</div>
	);
}