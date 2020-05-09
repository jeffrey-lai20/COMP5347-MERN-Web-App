import React, { useState, Component, useEffect } from "react";


export const RedditArticles = () => {

    const Snoowrap = require('snoowrap');
    var topThreeNews = [];

    // Build Snoowrap and Snoostorm clients
    const r = new Snoowrap({
        userAgent: 'reddit-bot-example-node',
        clientId: 'QO4LJaIJYqoScQ',
        clientSecret: 'n5iwkKIRcAnpW_a0Q9x9j9oGUtw',
        username: 'ritacheung9',
        password: 'comp5347'
    });

    var newsArticlesList = r.getTop('Australia', {limit: 3}).map(post => {
    //console.log(post.title);
    topThreeNews.push(post.title);
    console.log(topThreeNews)
    })

    return (
        <div>
            <a>(From Reddit)</a> <br></br>
            {newsArticlesList}
            {topThreeNews}

        </div>
    )

}