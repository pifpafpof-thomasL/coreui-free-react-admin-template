import React, {useEffect, useState } from 'react'
import useStore from 'use-store'
// import SaveTemp from './SaveTemp'

function FetchTemp(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [temp, setTemp] = useState(0);
  let [ tempArray, setTempArray ] = useStore('tempArray', [])

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    //console.log("FetchTemp useEffect props tempArray", props, tempArray)
    if (props.city.length) {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${props.city}&appid=6ac65692ee43e6cd36a695242cc7c988&units=metric`)
        .then(res => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            if (result.main) { 
              const temp = result.main.temp
              setTemp(temp);
              if (props.save) {
                tempArray.push(temp)
                setTempArray(tempArray)
                // console.log("Saving fetch temp / tempArray", tempArray)
              }
            }
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    }
  }, [props.city])   // useStore n'est pas très safe!


  //console.log("FetchTemp render loading props", isLoaded, temp, city, save)

  if (props.city.length === 0)
    return <label>{"<-- select a city "}</label>;
  else if (error) {
    return <label>Error: {error.message}</label>;
  } else if (!isLoaded) {
    return <label>Loading...</label>;
  } else {
    return (<>
        {/* <SaveTemp temp={temp} save={props.save} /> */}
        <label className="mx-2" >{temp}°c
        </label>
    </>)
  }
}


export default FetchTemp