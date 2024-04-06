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
  console.log('Connected to postgreSQL database' + ' ' + NAME)

  release()
})

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})

app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM team')
    if (result.rows.length !== 0) {
      console.log(result.rows)
      res.json(result.rows)
    } else {
      console.log(`data not found`)
      res.status(404).send('Team not found')
    }
  } catch (err) {
    console.error('Error executing query', err)
    res.status(500).send('Error executing query')
  }
})

app.get('/team/:teamId', async (req,res) => {
  const { teamId } = req.params;
  try {
    const result = await pool.query(`SELECT * FROM game WHERE home_team_id = ${teamId} OR visitor_team_id = ${teamId}`)
    console.log(result.rows.length);
    if (result.rows.length !== 0) {
      res.json(result.rows)
    } else {
      console.log(`Team with ${teamId} ID was not found in the database`)
      res.status(404).send('Team not found')
    }
  } catch (err) {
    console.error('Error executing query', err)
    res.status(500).send('Error executing query')
  }
})
