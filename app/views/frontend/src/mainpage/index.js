import React, { useState, Component, useEffect } from "react";

export const MainPage = props => {

    const [topRevisions, setTopRevisions] = useState([]);

    // Retrieve list from Express App
    useEffect(() => {
      //fetch('/api/topArticleRevisions').then(res => res.json()).then(list => setTopRevisions(list));
      fetch('/api/topArticleRevisions').then(res => setTopRevisions(res.data));
    }, [])

    // const topRevisionsDisplay = topRevisions.map(article => ({
    //   title: article.title
    // }))


    return (
        <div>
          <h1>Wikipedia Analytics</h1>
        
          <br></br>
          <h3>Top articles with the highest number of revisions</h3>
         


          <a>{topRevisions}</a>
          <h3>Top articles with the lowest number of revisions</h3>
  
          <h3>Top articles edited by largest group of registered users</h3>

          <h3>Top articles edited by smallest group of registered users</h3>

          <h3>Top articles with the longest history</h3>

          <h3>Top articles with the shortest history</h3>

        
          </div>
    );

}