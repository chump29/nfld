import { useEffect, useState, type ChangeEvent, type JSX } from "react"
import Form from "react-bootstrap/Form"

import axios, { AxiosError, type AxiosResponse } from "axios"

import { type ITeam } from "../../helpers/interfaces"
import { schedules } from "../../helpers/schedules"
import Display from "../display"

import "./index.css"

const api_url: string = import.meta.env.VITE_API_URL || ""

export default function Selector(): JSX.Element {
  const [teamList, setTeamList] = useState<ITeam[]>([])
  const [yearList, setYearList] = useState<number[]>([])
  const [teamSelected, setTeamSelected] = useState<string>("")
  const [yearSelected, setYearSelected] = useState<number>(0)
  const [seasonSelected, setSeasonSelected] = useState<string>("")

  const isValid = (): boolean => {
    return (
      teamSelected.length > 0 &&
      teamSelected !== "0" &&
      yearSelected > 0 &&
      seasonSelected.length > 0 &&
      seasonSelected !== "-1"
    )
  }

  const handleTeamChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    setTeamSelected(e.target.value)
    e.target.blur()
  }

  const handleYearChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    setYearSelected(+e.target.value)
    e.target.blur()
  }

  const handleSeasonChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    setSeasonSelected(e.target.value)
    e.target.blur()
  }

  useEffect(() => {
    axios
      .get(api_url + "/api/teams")
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
    const years: number[] = []
    for (let year = new Date().getFullYear(); year >= 2000; year--) {
      years.push(year)
    }
    setYearList(years)
  }, [teamSelected, yearSelected, seasonSelected])

  return (
    <>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label aria-label="title" className="fs-5 fw-bold">
            NFL Team
          </Form.Label>
          <Form.Select
            size="lg"
            value={teamSelected}
            onChange={handleTeamChange}>
            <option key="0" className="first-option" value="0">
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
          <Form.Label className="fs-5 fw-bold">Year</Form.Label>
          <Form.Select
            size="lg"
            value={yearSelected}
            onChange={handleYearChange}>
            <option key="0" className="first-option" value="0">
              Choose a year...
            </option>
            {yearList.map((year: number) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="fs-5 fw-bold">Schedule</Form.Label>
          <Form.Select
            size="lg"
            value={seasonSelected}
            onChange={handleSeasonChange}>
            <option key="-1" className="first-option" value="-1">
              Choose a schedule...
            </option>
            {schedules.map((schedule: string, i: number) => (
              <option key={i} value={i}>
                {schedule}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Form>
      {isValid() ? (
        <Display
          seasonSelected={Number(seasonSelected)}
          teamSelected={teamSelected}
          yearSelected={yearSelected.toString()}
        />
      ) : null}
    </>
  )
}
