import React, { useState, Component, useEffect } from "react";
import {ArticleSelect} from "./styled";
import Select from '@atlaskit/select';
import { Pie } from 'react-chartjs-2';

export const IndividualArticlesCharts = () => {
  
  const [chartType, setChartType] = useState([]);

  const renderChart = () => {
      if (chartType == '1') {
        return (
          <a><b>Bar Chart Showing Yearly Revision Number Distribution:</b></a>
        )
      }
      else if (chartType == '2') {
        return (
          <div>
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
          
          </div>
        )
      }
      else if (chartType == '3') {
        return (
          <a><b>Top 3 News Articles:</b></a>
        )
      }
      else {
        return (
          <a><b>No chart type selected</b></a>
        )
      }
  }

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

          {renderChart}
        
          </div>
    )

}