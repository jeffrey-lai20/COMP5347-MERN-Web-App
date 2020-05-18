import React, { useState, Component, useEffect } from "react";
import { OverallArticles } from "./overallArticles/main";
import { IndividualArticles } from "./individualArticles/main";
import { AuthorAnalytics } from "./authorAnalytics/main"
import { Heading, SearchSelect } from "./styled";
import Select from '@atlaskit/select';

export const MainPage = props => {

  const [analyticsType, setAnalyticsType] = useState([]);

  return (
    <div>
      <Heading>Wikipedia Analytics</Heading>
      <SearchSelect>
      <Select
        onChange={e => setAnalyticsType(e.value)}
        options={[
          { label: 'Overall Analytics', value: '1' },
          { label: 'Individual Article Analytics', value: '2' },
          { label: 'Author Analytics', value: '3' },
        ]}
      >
      </Select>
      </SearchSelect>
      {analyticsType == 1
        ? <OverallArticles></OverallArticles> : <br></br>}
      {analyticsType == 2
        ? <IndividualArticles></IndividualArticles> : <br></br>}

      {analyticsType == 3
        ? <AuthorAnalytics></AuthorAnalytics> : <br></br>}


    </div>
  )
}

