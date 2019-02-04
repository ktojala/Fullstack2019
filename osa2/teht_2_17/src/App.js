import React, { useState, useEffect } from 'react'
import personService from './services/personService'

const App = () => {
  const [persons, setPersons] = useState([])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    personService.getAll()      
    .then(response => {               
        setPersons(response)            
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
        <Rows persons={persons} filter={filter} setPersons={setPersons} />
    </div>
  )
}

const Rows = ({persons, filter, setPersons}) => {

  const rows = () => persons
                      .filter(person => person.name
                      .toLowerCase().includes(filter.toLowerCase()))
                      .map(person => 
                      <Person key={person.id}  name={person.name} number={person.number} persons={persons} setPersons={setPersons}/>
                      )
    return (
        <div>
            {rows()}
        </div>
    )
}

const Person = ({name, number,persons,setPersons}) => {

  const removeThisPerson = () => {
    if (window.confirm('Remove '+ name + '?')) { 

        personService.getAll().then(response => {
//            console.log('poistoon', name)
            var etsitty = 0
            for (var ind = 0; ind<response.length; ind++ ) {
              if (response[ind].name === name) {
                etsitty = response[ind].id
//                console.log('etsitty id: ', etsitty)
              }
            }
            personService.removePerson(etsitty)
            setPersons(persons.filter(p => p.id !== etsitty))
        }
      )
    }
  }

    return (
      <div>
        {name} {number} <button onClick={() => removeThisPerson() }>remove</button>
      </div>
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