import React from 'react'
import useStore from 'use-store'

export default function SumTemp(props) {
  let [ tempArray ] = useStore('tempArray',[])

  return (
    <div>
      Average destination temperature = { tempArray.reduce( ( p, c ) => p + c, 0 ) / tempArray.length }
      <br/>Décalage de la mise à jour, rien ne remplace le store Redux !
    </div>
  )
}