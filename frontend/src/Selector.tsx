import { useEffect, useState, type ChangeEvent } from "react"
import Form from "react-bootstrap/Form"

import axios, { AxiosError, type AxiosResponse } from "axios"

import Display from "./Display.tsx"

import "./Selector.css"

export interface ITeam {
  id: string
  abbreviation: string
  displayName: string
}

const api_url = import.meta.env.VITE_API_URL

export default function Selector() {
  const [teamList, setTeamList] = useState([] as ITeam[])
  const [teamSelected, setTeamSelected] = useState<string>("")
  const [seasonSelected, setSeasonSelected] = useState<string>("")

  const isValid = (): boolean => {
    return (
      teamSelected.length > 0 &&
      teamSelected !== "0" &&
      seasonSelected.length > 0 &&
      seasonSelected !== "0"
    )
  }

  const handleTeamChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setTeamSelected(e.target.value)
    e.target.blur()
  }

  const handleSeasonChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSeasonSelected(e.target.value)
    e.target.blur()
  }

  useEffect(() => {
    axios
      .get(api_url + "/teams")
      .then((response: AxiosResponse) => {
        const teams: ITeam[] = []
        /* eslint-disable  @typescript-eslint/no-explicit-any */
        response.data.forEach((d: any) => {
          if (d.team.isActive) {
            teams.push({
              id: d.team.id,
              abbreviation: d.team.abbreviation,
              displayName: d.team.displayName
            } as ITeam)
          }
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
          <Form.Select
            onChange={handleTeamChange}
            value={teamSelected}
            size="lg">
            <option className="firstOption" key="0" value="0">
              Choose a team...
            </option>
            {teamList.map((data: ITeam) => (
              <option key={data.id} value={data.abbreviation}>
                {data.displayName}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="fs-5 fw-bold">Schedule</Form.Label>
          <Form.Select
            onChange={handleSeasonChange}
            value={seasonSelected}
            size="lg">
            <option className="firstOption" key="0" value="0">
              Choose a schedule...
            </option>
            <option key="1" value="1">
              Preseason
            </option>
            <option key="2" value="2">
              Regular Season
            </option>
          </Form.Select>
        </Form.Group>
      </Form>
      {isValid() ? (
        <Display teamSelected={teamSelected} seasonSelected={seasonSelected} />
      ) : null}
    </>
  )
}
