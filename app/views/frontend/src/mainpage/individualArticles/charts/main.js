import React, { useState, Component, useEffect } from "react";
import {ArticleSelect, Result} from "./styled";
import Select from '@atlaskit/select';
import { Bar, Pie } from 'react-chartjs-2';

export const IndividualArticlesCharts = props => {
  
  const [chartType, setChartType] = useState([]);
  const [userTypeNumbers, setUserTypeNumbers] = useState([]);

  // var pieChartLabels = ['anon'];
  // var pieChartData = [1];

  useEffect(() => {
    // GET request
   fetch('/api/individual/getIndividualBarChartData/?title=Australia').then(res => res.json()).then(list => setUserTypeNumbers(list));
   console.log(props.currentArticleTitle);
 }, [])

//  var barChartLabelling = userTypeNumbers.map(userType => {
//    pieChartLabels.push(userType.userType);
//    pieChartData.push(userType.count)
//  })

var dataType = [];
var dataCount = [];
var pieSortPercent = [];
var pieChartData;

const pieChartDisplay = userTypeNumbers.map(user => {
  dataType.push(user._id.usertype);
  dataCount.push(user.userCount);
  pieSortPercent.push(user.userCount);

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

const barChartData = {
  labels: [1, 2, 3],
  datasets: [
    {
      label: 'Registered',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [1, 1, 1]
    },
    {
      label: 'Anonymous',
      backgroundColor: 'rgba(250,255,10,0.2)',
      borderColor: 'rgba(250,255,10,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(250,255,10,0.4)',
      hoverBorderColor: 'rgba(250,255,10,1)',
      data: [2, 2, 2]
    },
    {
      label: 'Administrator',
      backgroundColor: 'rgba(18,10,255,0.2)',
      borderColor: 'rgba(18,10,255,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(18,10,255,0.4)',
      hoverBorderColor: 'rgba(18,10,255,1)',
      data: [3, 3, 3]
    },
    {
      label: 'Bot',
      backgroundColor: 'rgba(22,255,10,0.2)',
      borderColor: 'rgba(22,255,10,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(22,255,10,0.4)',
      hoverBorderColor: 'rgba(22,255,10,1)',
      data: [4, 4, 4]
    }
    ]
};

    return (
        <div>
        <ArticleSelect>
        <Select 
          onChange = {e => setChartType(e.value)}
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
         <Bar
        data={barChartData}
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