import React from 'react'
import './TagCard.css'

const TagCard = (props : { color: string, text: string }) => {

    const { color, text } = props;  

    return (
    <div className='tag-body'>
        <div className='tag-color' style={{ backgroundColor: color }}/>
        <div className='tag-text'>
            {text}
        </div>
    </div>
  )
}

export default TagCard