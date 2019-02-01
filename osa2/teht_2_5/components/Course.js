import React from 'react'

const Header = (props) => {
  return (
      <h1>{props.course}</h1>
  )
}
const Part = (props) => {
  return (
      <div>
      <p>{props.name} {props.exercises}</p>
      </div>
  )
}

const Content = (props) => {
  const rows = () => props.parts.map(part => 
    <Part key={part.id} name={part.name} exercises={part.exercises} />
  )

// Seuraava toimii
//  console.log(props.parts[0].name);

  return (
    <div>
        {rows()}
    </div>
  )
}

const Total = (props) => {
  const total = props.parts.reduce(function(sum, exx) {
//    console.log('Wtf is goin on', sum, exx)
    return sum + exx.exercises}, 0)
  
  return (
    <p>Yhteensä {total} tehtävää</p>
  )

// This works too:
//  const total = props.parts.reduce((sum, exx) =>  sum + exx.exercises, 0)
//  return (
//    <p>Yhteensä {total} tehtävää</p>
//  )

}

const Course = (props) => {  
  const { course } = props

// Seuraava toimii
//  console.log(course.parts[0]);

  return (
    <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} /> 
    </div>
  )
}

export default Course