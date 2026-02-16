import { type ChangeEvent, type JSX, useEffect, useState } from "react"

import axios, { type AxiosError, type AxiosResponse } from "axios"
import Form from "react-bootstrap/Form"

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

  // biome-ignore lint/correctness/useExhaustiveDependencies: render for all
  useEffect(() => {
    axios
      .get(api_url + "/api/teams")
      .then((response: AxiosResponse) => {
        const teams: ITeam[] = []
        // biome-ignore lint/suspicious/noExplicitAny: multiple types
        response.data.forEach((d: any) => {
          if (d.team.isActive) {
            teams.push({
              abbreviation: d.team.abbreviation,
              displayName: d.team.displayName,
              id: d.team.id
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
            onChange={handleTeamChange}
            size="lg"
            value={teamSelected}
          >
            <option className="first-option" key="0" value="0">
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
            onChange={handleYearChange}
            size="lg"
            value={yearSelected}
          >
            <option className="first-option" key="0" value="0">
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
            onChange={handleSeasonChange}
            size="lg"
            value={seasonSelected}
          >
            <option className="first-option" key="-1" value="-1">
              Choose a schedule...
            </option>
            {schedules.map((schedule: string, i: number) => (
              <option key={schedule} value={i}>
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
