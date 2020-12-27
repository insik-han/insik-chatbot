import React from 'react'
import { Answer } from './index'

const AnswersList = (props) => {
  return (
    <div className='c-grid__answer'>
      {props.answers.map((value, index) => (
        <Answer
          key={index.toString()}
          content={value.content}
        />
      ))}
    </div>
  )
}

export default AnswersList;