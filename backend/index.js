const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

morgan.token('person', req => {
  return JSON.stringify(req.body)
})

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person'))
app.use(cors())

let persons = [
    {
      id: 1,
      name: "Arto H",
      number: "01230123",
    },
    {
      id: 2,
      name: "Sini kakka",
      number: "123",
    },
    {
      id: 3,
      name: "Kakka pussi",
      number: "12345",
    }
  ]

  const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => n.id))
      : 0
    return maxId + 1
  }

  app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })

  app.get('/info', (request, response) => {
    const date = new Date()
    const l = persons.length
    response.send(`Phonebook has info ${l} for people\n\n <p>${date} </p>`)
  })

  app.get('/api/persons', (request, response) => {
    response.json(persons)
  })

  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log(id)
    const person= persons.find(person => person.id === id)
    if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(note => note.id !== id)
  
    response.status(204).end()
  })

  app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (!body.name) {
      return response.status(400).json({ 
        error: 'name missing' 
      })
    }
    if(!body.number) {
      return response.status(400).json({
        error: 'number missing'
      })
    }
    if(persons.find(x => body.name === x.name)) {
      return response.status(400).json({
        error: 'name must be unique'
      })
    }
  
    const person = {
      id: generateId(),
      name: body.name,
      number: body.number

    }
  
    persons = persons.concat(person)
  
    response.json(person)
  })


  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })