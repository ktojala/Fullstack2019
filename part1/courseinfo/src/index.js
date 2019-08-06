import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    return ( 
        <>
            <h1>
                {props.courseName}
            </h1>
        </>
    )
}

const Part = (props) => {
    return ( 
        <>
            <p>{props.part} {props.exes}</p>         
        </>
    )
}

const Content = (props) => {
    return ( 
        <>
            <Part part={props.courseParts[0].name} exes={props.courseParts[0].exercises}/>
            <Part part={props.courseParts[1].name} exes={props.courseParts[1].exercises}/>           
            <Part part={props.courseParts[2].name} exes={props.courseParts[2].exercises}/>      
        </>
    )
}

const Total = (props) => {
    return ( 
        <>
            <p>
                Number of exercises {props.courseParts[0].exercises 
                    + props.courseParts[1].exercises 
                    + props.courseParts[2].exercises}
            </p>
        </>
    )
}

const App = () => {

    const course = {
        name: 'Half Stack application development',
        parts: [
          {
            name: 'Fundamentals of React',
            exercises: 10
          },
          {
            name: 'Using props to pass data',
            exercises: 7
          },
          {
            name: 'State of a component',
            exercises: 14
          }
        ]
      }
  
    return (
        <div>
            <Header courseName={course.name}/>
            <Content courseParts = {course.parts}/>
            <Total courseParts = {course.parts}/>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))