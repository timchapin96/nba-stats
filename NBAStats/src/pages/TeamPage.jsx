import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
export default function TeamPage () {
  let { teamId } = useParams()
  const [games, setGames] = useState([])
  // const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3000/team/${teamId}`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setGames(data)
      })
      .catch(error => console.log(error))
  }, [teamId])
  return (
    <div>
      <h1>Team Page</h1>
      {games.map(game => (
        <div key={game.id}>
          <p>{game.id}</p>
          <p>{game.game_date}</p>
        </div>
      ))}
    </div>
  )
}
