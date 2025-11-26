import { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'

import axios, { AxiosError, type AxiosResponse } from 'axios'

import Display from './Display.tsx'

import './Selector.css'

export interface ITeam {
  id: string
  abbreviation: string
  displayName: string
}

const api_url = import.meta.env.VITE_API_URL

export default function Selector() {
  const [teamList, setTeamList] = useState([] as ITeam[])
  const [teamSelected, setTeamSelected] = useState<string>('')
  const [isVisible, setIsVisible] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTeamSelected(e.target.value)

    if (e.target.value.length > 0) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }

    e.target.blur()
  }

  useEffect(() => {
    axios
      .get(api_url + '/teams')
      .then((response: AxiosResponse) => {
        const teams: ITeam[] = []
        /* eslint-disable  @typescript-eslint/no-explicit-any */
        response.data.forEach((d: any) => {
          teams.push({
            id: d.team.id,
            abbreviation: d.team.abbreviation,
            displayName: d.team.displayName
          } as ITeam)
        })
        setTeamList(teams)
      })
      .catch((error: AxiosError) => {
        console.error(error.message)
      })
  }, [api_url])

  return (
    <>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label className="fs-5 fw-bold">NFL Team</Form.Label>
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
      {isVisible ? <Display teamSelected={teamSelected} /> : null}
    </>
  )
}
