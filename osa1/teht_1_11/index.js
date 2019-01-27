import React, {useState} from 'react';
import ReactDOM from 'react-dom';



const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistics = ({value0, value1, value2}) => {

  if ((value0 + value1 + value2) === 0 ) {
    return (
      <>
      <p>Ei yhtään palautetta annettu</p>
    </>
    )
  } else {
    return (
      <>
      <table>
        <tbody>
      <Statistic text={'hyvä'} value={value0}/>
      <Statistic text={'neutraali'} value={value1}/>
      <Statistic text={'huono'} value={value2}/>
      <Statistic text={'yhteensä'} value={value0 + value1 + value2}/>
      <Statistic text={'keskiarvo'} value={(value0 - value2)/(value0 + value1 + value2)}/>
      <Statistic text={'positiivisia'} value={100*value0/(value0 + value1 + value2)}/>
        </tbody>
      </table>
    </>
    )
  }
}

const Statistic = ({text, value}) => {

  if (text === 'positiivisia' ) {
    return (
      <>
      <tr>
        <td>{text}</td>
        <td>{value} %</td>
      </tr>
      </>
    )
  } else {}
  return (
    <>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </>
    )
}

const App = (props) => {

  const [value0, setValue0] = useState(0)
  const [value1, setValue1] = useState(0)
  const [value2, setValue2] = useState(0)

  const setToValue0 = (newValue) => {
    setValue0(newValue)
  }
  const setToValue1 = (newValue) => {
    setValue1(newValue)
  }
  const setToValue2 = (newValue) => {
    setValue2(newValue)
  }

    return (
      <div>
        <h2>anna palautetta</h2>
        <Button handleClick={() => setToValue0(value0 + 1)} text='hyvä' />
        <Button handleClick={() => setToValue1(value1 + 1)} text='neutraali' />
        <Button handleClick={() => setToValue2(value2 + 1)} text='huono' />

        <p></p>
        <h2>statistiikka</h2>

        <Statistics value0={value0} value1={value1} value2={value2} />

      </div>
    )
  }

ReactDOM.render(
    <App  />, 
    document.getElementById('root')
)