import React, { useState, Component, useEffect } from "react";
import {ArticleHeading} from "./styled";
import Select from '@atlaskit/select';

const IndividualArticlesSelect = () => (
    <Select
      options={[
        { label: 'article', value: '1' },
        { label: 'article', value: '2' },
        { label: 'article', value: '3' },
      ]}
      placeholder="Select an article"
    />
  );

export const IndividualArticles = () => {

    return (
        <div>
        <ArticleHeading>Individual Articles</ArticleHeading>
        <IndividualArticlesSelect></IndividualArticlesSelect>
        </div>
    )

}