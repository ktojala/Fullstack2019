import React from 'react'
import Course from './components/Course'

const App = ( {courses} ) => {

  const allcourses = () => courses.map(course =>
    <Course key={course.id} 
        course={course} 
    /> )

    return (
        <div>
            {allcourses()}
        </div>
    )
}

export default App;
