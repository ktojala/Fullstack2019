import React, { useState,useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ filter, setFilter ] = useState('')

  useEffect (() =>  {

      axios      
        .get('https://restcountries.eu/rest/v2/all')      
        .then(response => {             
          setCountries(response.data)      
      })
    }, [])

return (
  <div>
    <Filtering filter={filter} setFilter={setFilter} />
    <Countries countries={countries} filter={filter} /> 
  </div>
  )
}

const Filtering = ({ filter, setFilter }) => {
  const handleFilter = (event) => {
    console.log('handling', event.target.value)
    setFilter(event.target.value)
  }
  return (
    <div>
      find countries: <input value={filter} onChange={handleFilter}/>
    </div>
  )
}

const Countries = ({ countries, filter }) => {
  const maxNumber = 10
  const nameFits = countries.filter(country => country.name.toUpperCase().includes(filter.toUpperCase()))
  
  if (nameFits.length > maxNumber) {
    return (<p>Too many results, please be more specific</p>) 
  } else if (nameFits.length > 1 && nameFits.length <= maxNumber) {
    return (
      <div>
        {nameFits.map(country => <p key={country.name}>{country.name}</p>)}
      </div>
    )
  } else if (nameFits.length === 1) {
    return (
      <div>
        {nameFits.map(country => <div key={country.name}><Country country={country} /></div>)}
     </div>
    )
  } else {
    return (
      <p>No results found</p>
    )
  }  
}

const Country = ({country}) => {
    return (
      <div>
        <h1>{country.name}</h1>
          <p>capital {country.capital}</p>
          <p>population {country.population}</p>
        <h2>languages</h2>
        <ul>    
          {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
        </ul>
        <img alt='flag' src={country.flag} width='200' />
      </div>
    )
}

export default App