import React, {useEffect, useState } from 'react'
import Goto from './Goto'

function GotoFetchHooks(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch("https://restcountries.eu/rest/v2/all?fields=capital;timezones")
      .then(res => res.json())
      .then(
        (result) => {
          //const uniqueCapitals = [...new Set(result.map(country=> country.capital))] 
          const nonEmptyCapitals = result.filter(country=> country.capital)

          setIsLoaded(true);
          setItems(nonEmptyCapitals);
          //console.log("useEffect props", props)
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [props])


  //console.log("render loading props", isLoaded, items, props)

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return <Goto options={items} />
  }
}



export default GotoFetchHooks