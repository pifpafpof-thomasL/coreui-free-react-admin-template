import React from 'react'
import useStore from 'use-store'

export default function ComponentA() {
  let [ value, setValue ] = useStore('myValue', 3)

  return (
    <div>
      ComponentA:value = { value }

      <button className="mx-2" onClick={() => setValue(value + 1)}>
        Increment
      </button>
    </div>
  )
}