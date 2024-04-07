import { useEffect, useState } from 'react'
import { Link } from "react-router-dom";

export default function TeamsPage () {
  const [teams, setTeams] = useState([])

  useEffect(() => {
    fetch(`http://localhost:3000`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setTeams(data)
      })
      .catch(error => console.log(error))
  }, [])

  return (
    <div>
      {teams.map(team => (
        <h2 key={team.id}><Link to = {`/teams/${team.team_id}`}>{team.nickname}</Link></h2>
      ))}
    </div>
  )
}
