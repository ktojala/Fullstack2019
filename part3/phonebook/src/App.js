import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/personService'
import Notification from './components/Notification'
import ErrorNotification from './components/ErrorNotification'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newMatcher, setNewMatcher] = useState('')
  const [ infoMessage, setInfoMessage] = useState(null)
  const [ errorMessage, setErrorMessage] = useState(null)

  const Rows = ({persons, newMatcher, setPersons}) => {

    const rows = () => persons
      .filter(person => person.name
      .toLowerCase().includes(newMatcher.toLowerCase()))
      .map(person => 
        <Person key={person.id}  
                name={person.name} 
                number={person.number} 
                persons={persons} 
                setPersons={setPersons}/> 
        )
    return (
      <div>
        {rows()}
      </div>
    )
  }

const Person = ({name, number,persons,setPersons}) => {

    const removeThisPerson = () => {

      if (window.confirm('Delete '+ name + '?')) { 
          personService
          .getAll()
          .then(response => {
              let deleteThisId  = 0
              for (let ind = 0; ind<response.length; ind++ ) {
                if (response[ind].name === name) {
                  deleteThisId = response[ind].id
                }
              }
              personService
              .deletePerson(deleteThisId )
              .then(() => {
                setPersons(persons.filter(p => p.id !== deleteThisId ))
              })
          }
        )
      }
    }

    return (
      <div>
        {name} {number} <button onClick={() => {
          removeThisPerson()
          setInfoMessage(`Deleted ${name}`)        
          setTimeout(() => {
            setInfoMessage(null)
          }, 2200)
        }
        }>delete</button>
      </div>
    )
}

  useEffect(() => {
    personService.getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    if (persons.some(person => person.name === newName)) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one`)) {
        const personToBeUpdated = {...persons.find(p => p.name === newName), number: newNumber};
        personService.updatePerson(personToBeUpdated)
        .then(newData => {
          setPersons(persons.map(p => p.name !== newData.name ? p : newData))
          setInfoMessage(`Changed number for ${newName}`)        
          setTimeout(() => {
            setInfoMessage(null)
          }, 2200)
        })
        .catch(error => {
          setErrorMessage(`Information of '${newName}' has already been removed from server`)        
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          personService.getAll()    // removing name from the local browser, too
          .then(response => {
            setPersons(response)
          })
        })
      }
    } else {
      personService.addPerson(personObject)
      .then(response => {
        setPersons(persons.concat(response))
        setNewName('')
        setNewNumber('')
        setInfoMessage(`Added ${newName}`)        
        setTimeout(() => {
          setInfoMessage(null)
        }, 2200)

      })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleMatcherChange = (event) => {
    setNewMatcher(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      < Notification message={infoMessage}/>
      < ErrorNotification message={errorMessage}/>
      < Filter 
          newMatcher={newMatcher}
          handleMatcherChange={handleMatcherChange}
      />
      <h2>Add a new</h2>
      < PersonForm
          addPerson={addPerson}
          newName={newName}
          handleNameChange={handleNameChange}
          newNumber={newNumber}
          handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
        <Rows
          persons={persons}
          newMatcher={newMatcher}
          setPersons={setPersons}
          personService={personService}/>
    </div>
  )
}

export default App;
