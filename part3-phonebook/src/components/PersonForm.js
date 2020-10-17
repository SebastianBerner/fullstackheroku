import react from 'react'

const PersonForm = (props) => {
    return(
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
        </form>
        )
}