import React, { useState, useEffect } from 'react'
import Rows from './components/Rows'
import SubmitButton from './components/SubmitButton'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState(null)


  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
      })
  }, [])

  const handleName = (event) => {
    setNewName(event.target.value)
  }

  const handleNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const names = Object.values(persons).map(x => x.name)
    if (names.includes(newName)) {
      return window.alert(newName + ' is already added to phonebook!')
    }
    else {
    const newPerson = {
      name: newName,
      number: newNumber
    }
    personService
      .create(newPerson)
      .then(person => {
        setPersons(persons.concat(person))
        setErrorMessage(
          `Added ${person.name}`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNewName('')
        setNewNumber('')
      })
  }
}

  const removePerson = (name) => {
    const findPers = persons.find(person => person.name === name)
    if(window.confirm("Are you sure you want to delete ", name)) {
      personService
        .remove(findPers)
        .then(() => personService.getAll().then(x => {
          console.log("x is: ", x)
          setPersons(x)
          setErrorMessage(
            `Deleted ${name}`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        }))
      }
  }


  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={errorMessage} />

      <form onSubmit={addPerson}>
        <div>
          name: <input 
            value={newName}
            onChange={handleName}
          />
        </div>
        <div>
          number: <input
            value={newNumber}
            onChange={handleNumber}
          />
        </div>
        <div>
          <SubmitButton />
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        <Rows persons={persons} onRemove={removePerson}/>
      </ul>
    </div>
  )
}

export default App
