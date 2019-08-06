import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = (props) => (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
  
const Statistic = ({text, value}) => {

    if (text === "positive") {
        return (
            <tr>
                <td>{text}</td>
                <td>{value} %</td>            
            </tr>
        )
    } else {
        return (
            <tr>
                <td>{text}</td>
                <td>{value}</td>            
            </tr>
        )
    }
}

const Average = ({good,neutral,bad}) => {
    if ((good+neutral+bad) === 0) {
        return ("")
    }
    else {
        return (<Statistic text="average" value={(good-bad)/(good+neutral+bad)} />)
    }
}

const Positive = ({good,neutral,bad}) => {
    if ((good+neutral+bad) === 0) {
        return ("")
    }
    else {
        return (<Statistic text="positive" value={100*good/(good+neutral+bad)} />)
    }
}

const Statistics = ({good,neutral,bad}) => {

    if ((good+neutral+bad) === 0) {
        return (
            <>
            <h1>statistics</h1>
            <p>No feedback given</p>
            </>
        )
    } else {
        return (
        <>
        <h1>statistics</h1>
        <table><tbody>
            <Statistic text="good" value={good} />
            <Statistic text="neutral" value={neutral} />
            <Statistic text="bad" value={bad} />
            <Statistic text="all" value={good+neutral+bad} />
            <Average good={good} neutral={neutral} bad={bad} />
            <Positive good={good} neutral={neutral} bad={bad} />
        </tbody></table>
        </>
    )
    }
}

const App = () => {
    // save clicks of each button to own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    return (
    <div>
        <h1>give feedback</h1>
        <Button handleClick={() => setGood(good+1)} text="good" />
        <Button handleClick={() => setNeutral(neutral+1)} text="neutral" />
        <Button handleClick={() => setBad(bad+1)} text="bad" />
        <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
    )
}

ReactDOM.render(<App />, 
    document.getElementById('root')
);
