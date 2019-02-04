import React, { useState,useEffect } from 'react'
import axios from 'axios'

const App = () => {
    const [persons, setPersons] = useState([])
//        { name: 'Arto Hellas', number: '040-123456', id: 1 },
//        { name: 'Martti Tienari', number: '040-123456', id: 2 },
//        { name: 'Arto Järvinen', number: '040-123456', id: 3 },
//        { name: 'Lea Kutvonen', number: '040-123456', id: 4 }
//      ])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  useEffect(() => {    
    console.log('effect')    
    axios      
    .get('http://localhost:3001/persons')      
    .then(response => {        
        console.log('promise fulfilled')        
        setPersons(response.data)      
    })  
  }, [])  
  console.log('render', persons.length, 'persons')



  const handleFilter = (event) => {
    setFilter(event.target.value)
}

  return (
    <div>
      <h2>Puhelinluettelo</h2>
        <div>
                rajaa näytettäviä: <input
                value={filter}
                onChange={handleFilter}
        />
        </div>

      <h3>lisää uusi</h3>

        <PersonForm newName={newName} setNewName={setNewName}
                    newNumber={newNumber} setNewNumber={setNewNumber}
                    persons={persons} setPersons={setPersons} />

      <h3>Numerot</h3>
        <Rows persons={persons} filter={filter} setFilter={setFilter} />
    </div>
  )
}

const Rows = ({persons, filter,setFilter}) => {

  const rows = () => persons.filter(person => person.name.toLowerCase().includes(filter)).map(person => 
    <Person key={person.id} name={person.name} number={person.number} />
    )
    return (
        <div>
            {rows()}
        </div>
    )
}

const Person = ({name, number}) => {
    return (
      <div>{name} {number}</div>
    )
}

const PersonForm = ({newName, setNewName, newNumber, setNewNumber, persons, setPersons}) => {

const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
    }
    if (persons.some(person => person.name === newName)) {
      window.alert(`${newName} on jo luettelossa`)
    } else {

      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
}

const handleNameChange = (event) => {
  setNewName(event.target.value)
}

const handleNumberChange = (event) => {
  setNewNumber(event.target.value)
}

return (
    <div>
<form onSubmit={addPerson}>
<div>
  nimi: <input 
  value={newName}
  onChange={handleNameChange}
  />
</div>
<div>
numero: <input 
  value={newNumber}
  onChange={handleNumberChange}
  />
</div>
<div>
  <button type="submit">lisää</button>
</div>
</form>
</div>
)

}




export default App