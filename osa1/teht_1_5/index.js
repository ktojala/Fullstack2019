import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
    return (
        <h1>{props.course}</h1>
    )
}

const Part = (props) => {
    return (
        <div>
        <p>{props.content.name} {props.content.exercises}</p>
        </div>
    )
}

const Content = (props) => {
    return (
      <div>
          <Part content={props.parts[0]}/>
          <Part content={props.parts[1]}/>
          <Part content={props.parts[2]}/>
      </div>
    )
}

const Total = (props) => {
    return (
      <div>
        <p>yhteensä {props.parts[0].exercises + 
                     props.parts[1].exercises + 
                     props.parts[2].exercises} tehtävää</p>
      </div>
    )
}

const App = () => {
    const course = {
        name: 'Half Stack -sovelluskehitys',
        parts: [
        {
          name: 'Reactin perusteet',
          exercises: 10
        },
        {
          name: 'Tiedonvälitys propseilla',
          exercises: 7
        },
        {
          name: 'Komponenttien tila',
          exercises: 14
        }
      ]
    }
    return (
      <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));

