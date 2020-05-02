import React, { useState, Component, useEffect } from "react";

export const MainPage = props => {
    const [list, setList] = useState([]);

    // Retrieve list from Express App
    useEffect(() => {
      fetch('/api/getList')
      .then(res => res.json())
      .then(list => setList(list))
    }, [])


    return (
        <div>
          <h1>Wikipedia Analytics</h1>
        
          <a>Testing getting list from api</a>
          <br></br>
          <a>{list}</a>
        
          </div>
    );

}