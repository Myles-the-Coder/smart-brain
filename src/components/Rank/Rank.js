import React from 'react'
import './Rank.css'

const Rank = ({name, entries}) => {
    return (
      <div className="center">
        <div className="title">
          {`${name}, Your current entry count is...`}
        </div>
        <div className="title sub">
          {entries}
        </div>
      </div>
    )
}

export default Rank