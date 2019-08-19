import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css';

const Filter = ({newMatcher,handleMatcherChange}) => {
  return (
    <div>
    find countries: <input 
      value={newMatcher}
      onChange={handleMatcherChange}
    />
  </div>
  )
}

const Weather = ({capital}) => {
  const [temperature, setTemperature] = useState('-')
  const [wImg, setWImg] = useState('')
  const [wind, setWind] = useState('-')
  const [windDir, setWindDir] = useState('')

  const myUrl = `https://api.apixu.com/v1/current.json?key=${process.env.REACT_APP_SECRET_NAME}`.concat(capital)
  useEffect( () => {
    axios
      .get(myUrl)
      .then(response => {
        setTemperature(response.data.current.temp_c)
        setWImg(response.data.current.condition.icon)
        setWind(response.data.current.wind_kph)
        setWindDir(response.data.current.wind_dir)
      })
  },[myUrl])
  
  return (
    <>
    <p><b>temperature: </b>{temperature} Celsius</p>
    <img alt='' src={wImg} height='80' />
    <p><b>wind:        </b>{wind} kph, direction {windDir}</p>
    </>
  )
}

const CountryData = ({showThis}) => {

  return (
    <div>
      <h1>{showThis.name}</h1>
      <p>capital {showThis.capital}</p>
      <p>population {showThis.population}</p>
      <h2>languages</h2>
      <ul>    
        {showThis.languages.map(lang => 
          <li key={lang.name}>{lang.name}</li>
        )}
      </ul>
      <img alt='flag' src={showThis.flag} height='150' />
      <h1>Weather in {showThis.capital}</h1>
      <Weather capital={showThis.capital} />
    </div>
  )
}

const Country = ({country,setNewMatcher}) => {

  const blancs = "  "
  return (
    <p>{country.name}{blancs}
      <button onClick={() => setNewMatcher(country.name)}>
        show
      </button>
    </p>
  )
}

const Listing = ({newMatcher, countries, setNewMatcher}) =>{

  const countriesToShow =  () => countries.filter(country =>
    country.name.toLowerCase().includes(newMatcher.toLowerCase())
  )

  const rows = () => countriesToShow().map(country =>
    <Country
      key = {country.name}
      country = {country}
      setNewMatcher={setNewMatcher}
    />
  )

  const howMany = countriesToShow().length

  if (howMany > 10) {
    return (
      <>Too many matches, specify another filter</>
    )
  } else if (howMany > 1) {
    return (
      <>
        {rows()}
      </>
    )
  } else if (howMany > 0) {

    return (
      <>
        <CountryData
          showThis={countriesToShow()[0]}
        />
      </>
    )
  } else {
    return (
      <></>
    )
  }
}

function App() {
  const [ countries, setCountries] = useState([])
  const [ newMatcher, setNewMatcher] = useState('')

  useEffect( () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])  

  const handleMatcherChange = (event) => {
    setNewMatcher(event.target.value)
  }

  return (
      <div>
      < Filter 
        newMatcher={newMatcher}
        handleMatcherChange={handleMatcherChange}
      />
      < Listing
          newMatcher={newMatcher}
          countries={countries}
          setNewMatcher={setNewMatcher}
      />
      </div>
  )}

export default App;
