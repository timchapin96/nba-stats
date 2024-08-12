import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import * as NBAIcons from 'react-nba-logos'

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
    <div className="teams-container">
      {teams.map(team => {
        // Access the logo component dynamically
        const LogoComponent = NBAIcons[team.abbreviation] || null

        return (
          <div key={team.id} className="team-card">
            <LogoComponent />
            <h2>
              <Link to={`/teams/${team.team_id}`}>{team.nickname}</Link>
            </h2>
            <h4>Founded:{team.year_founded}</h4>
          </div>
        )
      })}
    </div>
  )
}
