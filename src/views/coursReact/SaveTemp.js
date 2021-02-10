import React, { useEffect } from 'react'
import useStore from 'use-store'


// not used
export default function SaveTemp({temp, save}) {
  let [ tempArray, setTempArray ] = useStore('tempArray',[])

  useEffect(()=>{
    //console.log("Saving fetch temp / tempArray", tempArray, save, temp)
    if (save) {
      tempArray.push(temp)
      setTempArray(tempArray)
      //console.log("Saved tempArray", tempArray, save)
    }
  }, [])

  return null
}