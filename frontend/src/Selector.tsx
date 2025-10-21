import axios, { AxiosError, type AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'

import Display from './Display.tsx'

import './Selector.css'

interface ITeam {
  id: string
  abbreviation: string
  displayName: string
}

export default function Selector() {
  const [teamsList, setTeamsList] = useState([] as ITeam[])
  const [teamSelected, setTeamSelected] = useState<string>('')
  const [isVisible, setIsVisible] = useState(false)

  const api_url = 'http://localhost:5000/api/teams' // TODO: http://backend/api/teams

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTeamSelected(e.target.value)

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
        const teams: ITeam[] = []
        response.data.forEach((d: { team: ITeam }) => {
          teams.push({
            id: d.team.id,
            abbreviation: d.team.abbreviation,
            displayName: d.team.displayName
          } as ITeam)
        })
        setTeamsList(teams)
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
          <Form.Select onChange={handleChange} value={teamSelected} size="lg">
            <option className="firstOption" value="">
              Choose a team...
            </option>
            {teamsList.map((data) => (
              <option key={data.id} value={data.abbreviation}>
                {data.displayName}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Form>
      {isVisible ? <Display /> : null}
    </>
  )
}
