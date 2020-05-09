import React, { useState, Component, useEffect } from "react";
import {ArticleSelect} from "./styled";
import Select from '@atlaskit/select';
import { Pie } from 'react-chartjs-2';

export const IndividualArticlesCharts = () => {
  
  const [chartType, setChartType] = useState([]);
  const [userTypeNumbers, setUserTypeNumbers] = useState([]);

  var pieChartLabels = ['anon'];
  var pieChartData = [1];

  useEffect(() => {
    // GET request
   fetch('/api/individual/getIndividualBarChartData/?title=Australia').then(res => res.json()).then(list => setUserTypeNumbers(list));
 }, [])

//  var barChartLabelling = userTypeNumbers.map(userType => {
//    pieChartLabels.push(userType.userType);
//    pieChartData.push(userType.count)
//  })

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

          {chartType==1
        ? <a><b>Bar Chart Showing Yearly Revision Number Distribution:</b></a> : <br></br>}

        {chartType==2
        ?  <div>
        <a><b>Pie Chart Showing User Type Distribution:</b></a>
        <Pie
        data={{
          labels: ['User Type 1', 'User Type 2', 'UserType 3'],
          datasets: [{
            data: [2000, 4000, 2450],
            backgroundColor: ['red', 'blue', 'green']
          }]
        }}
        height='75%'/>
        
        </div> : <br></br>}

        {chartType==3
        ? <a><b>Bar Chart Showing Revision Number Distributed By Year Made By One of the Top 5 Regular Users:</b></a> : <br></br>}

          </div>
    )

}