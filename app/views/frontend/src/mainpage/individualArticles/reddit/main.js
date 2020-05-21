import React, { useState, Component, useEffect } from "react";


export const RedditArticles = props => {

    const Snoowrap = require('snoowrap');
    var topThreeNews = [];
    const [newsLinks, setNewsLinks] = useState([]);
    const [news1, setNews1] = useState([]);

    // Build Snoowrap and Snoostorm clients
    const r = new Snoowrap({
        userAgent: 'reddit-bot-example-node',
        clientId: 'QO4LJaIJYqoScQ',
        clientSecret: 'n5iwkKIRcAnpW_a0Q9x9j9oGUtw',
        username: 'ritacheung9',
        password: 'comp5347'
    });

    useEffect(() => {
          var input = "news/?q=" + props.currentArticleTitle;
          r.getTop(input, {time: "all", limit: 3}).map(post => {
            var news = { title: post.title, url: post.url };
            topThreeNews.push(news);
            setNews1(news);
          });
          setNewsLinks(topThreeNews);
    }, [props.currentArticleTitle]);
   
    const news = newsLinks.map(item => {
      return (
        <li><a href={item.url} target="_blank">{item.title}</a></li>
      )
    }
    );

    return (
        <div>
            <a>(From Reddit)</a> <br></br>
            {news}

        </div>
    )

}