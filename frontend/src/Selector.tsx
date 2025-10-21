import { useEffect, useState } from 'react'
import './Selector.css'

import axios, { type AxiosResponse, AxiosError } from 'axios'
import Form from 'react-bootstrap/Form'

export default function Selector() {
  const [teamsList, setTeamsList] = useState([])
  const [teamSelected, setTeamSelected] = useState<string>('')

  const api_url = 'http://localhost:5000/api/teams' // TODO: http://backend:5000/api/teams

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTeamSelected(e.target.value)
  }

  const getTeams = async () => {
    await axios
      .get(api_url)
      .then((response: AxiosResponse) => {
        setTeamsList(response.data)
      })
      .catch((error: AxiosError) => {
        console.error(error.message)
      })
  }

  useEffect(() => {
    getTeams()
  }, [])

  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Select
          onChange={handleChange}
          value={teamSelected}
          size="lg"
          id="sTeams">
          <option>Choose a team</option>
          {teamsList.map((data) => (
            <option
              key={data['team']['id']}
              value={data['team']['abbreviation']}>
              {data['team']['displayName']}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
    </Form>
  )
}
