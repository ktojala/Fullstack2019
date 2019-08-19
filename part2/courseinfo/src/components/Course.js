import React from 'react'

const Header = (props) => {
    return ( 
        <h1>{props.courseName}</h1>
    )
}

const Part = (props) => {
    return ( 
        <p>{props.name} {props.exercises}</p>
    )
}

const Course = (props) => {
    const {course} = props  
    const rows = () => course.parts.map(part => 
    <Part key={part.id} 
        name={part.name} 
        exercises={part.exercises} 
    /> )

    const totals = () => course.parts.reduce((sum, current) => {
        return sum+current.exercises}, 0
    )

    return (
        <>
            <Header courseName={course.name}/>
            {rows()}
            <b>total of {totals()} exercises</b>
        </>
    )
}

export default Course
