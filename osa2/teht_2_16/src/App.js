import React, { useState,useEffect } from 'react'
import personService from './services/personService'

const App = () => {
  const [persons, setPersons] = useState([])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    personService.getAll()      
    .then(response => {               
        setPersons(response.data)      
    })  
  }, [])  

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

  const rows = () => persons
                      .filter(person => person.name
                      .toLowerCase().includes(filter))
                      .map(person => 
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
//        id: persons.length + 1,
    }
    if (persons.some(person => person.name === newName)) {
      window.alert(`${newName} on jo luettelossa`)
    } else {

      personService.addPerson(personObject)

      .then(response => {  
        console.log('server vastas ',response)
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
      })

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