const express = require('express')
const { Pool } = require('pg')
const { PORT, NAME } = require('./dev-config.js')

const pool = new Pool({
  user: 'timchap96',
  password: '',
  host: 'localhost',
  port: 5432, // default Postgres port
  database: NAME //
})

//What does express specifically do?
const app = express()
var cors = require('cors')

app.use(express.json()) //What does this do?
app.use(
  cors({
    // origin: 'http://example.com', // Replace with the origin(s) allowed to access the server
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Specify allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Specify allowed headers
  })
)

pool.connect((err, client, release) => {
  if (err) {
    console.error('Error connecting to postgreSQL', err)
    return
  }
  console.log('Connected to postgreSQL database')

  release()
})

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})

app.get('/', (req, res) => {
  console.log('WE MADE IT');
  console.log(PORT);
})
