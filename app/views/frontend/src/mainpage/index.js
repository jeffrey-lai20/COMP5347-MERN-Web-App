import React, { useState, Component, useEffect } from "react";
import { OverallArticles } from "./overallArticles/main";
import { IndividualArticles } from "./individualArticles/main";
import { AuthorAnalytics } from "./authorAnalytics/main"
import { Heading } from "./styled";

export const MainPage = props => {

  return (
    <div>
      <Heading>Wikipedia Analytics</Heading>
      <OverallArticles></OverallArticles>
      <IndividualArticles></IndividualArticles>
      <AuthorAnalytics></AuthorAnalytics>
    </div>
  )
}

