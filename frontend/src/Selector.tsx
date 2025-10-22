import { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'

import axios, { AxiosError, type AxiosResponse } from 'axios'

import Display from './Display.tsx'

import './Selector.css'

interface ITeam {
  id: string
  abbreviation: string
  displayName: string
  logo: string
  color: string
  alternateColor: string
  logos: any // NOTE: makes TS happy, flattening
}

export default function Selector() {
  const [teamList, setTeamList] = useState([] as ITeam[])
  const [teamSelected, setTeamSelected] = useState<string>('')
  const [isVisible, setIsVisible] = useState(false)
  const [logo, setLogo] = useState<string>("")
  const [color, setColor] = useState<string>("")
  const [alternateColor, setAlternateColor] = useState<string>("")

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
          setLogo(d.team.logos[3].href)
          setColor(d.team.color)
          setAlternateColor(d.team.alternateColor)
        })
        setTeamList(teams)
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
          <Form.Label className='fs-5 fw-bold'>NFL Team</Form.Label>
          <Form.Select onChange={handleChange} value={teamSelected} size="lg">
            <option className="firstOption" value="">
              Choose a team...
            </option>
            {teamList.map((data: ITeam) => (
              <option key={data.id} value={data.abbreviation}>
                {data.displayName}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Form>
      {isVisible ? <Display team={teamSelected} logo={logo} color={color} alternateColor={alternateColor} /> : null}
    </>
  )
}
