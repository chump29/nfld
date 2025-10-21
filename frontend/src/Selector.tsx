import axios, { AxiosError, type AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'

import Display from './Display.tsx'

import './Selector.css'

export default function Selector() {
  const [teamsList, setTeamsList] = useState([])
  const [teamSelected, setTeamSelected] = useState<string>('')
  const [isVisible, setIsVisible] = useState(false)

  const api_url = 'http://localhost:5000/api/teams' // TODO: http://backend/api/teams

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTeamSelected(e.target.value)

    // TODO
    if (e.target.value.length > 0) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
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
    <>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>NFL Team</Form.Label>
          <Form.Select
            onChange={handleChange}
            value={teamSelected}
            size="lg"
            id="sTeams">
            <option className="firstOption" value="">
              Choose a team...
            </option>
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
      {isVisible ? <Display /> : null}
    </>
  )
}
