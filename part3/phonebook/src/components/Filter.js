import React from 'react'

const Filter = ({newMatcher,handleMatcherChange}) => {
    return (
      <div>
      name: <input 
        value={newMatcher}
        onChange={handleMatcherChange}
      />
    </div>
    )
  }

export default Filter
