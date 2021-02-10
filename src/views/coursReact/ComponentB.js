import React from 'react'
import useStore from 'use-store'

export default function ComponentB() {
  let [ value, setValue ] = useStore('myValue', 3)

  return (
    <div>{"ComponentB:value ="} { value } {`
      // this will increment as ComponentA clicks are registered
    `}
    <button className="mx-2" onClick={() => setValue(value + 1)}>
        Increment
    </button>
    </div>
  )
}