import { useEffect, useState, type JSX } from "react"

import axios, { AxiosError, type AxiosResponse } from "axios"

import { type ITeamDTO } from "../../helpers/interfaces"
import { schedules } from "../../helpers/schedules"
import Bye from "../bye"
import Week from "../week"

import "bootstrap-icons/font/bootstrap-icons.css"
import "./index.css"

export interface ISchedule {
  date: string
  week: string
  teams: ITeamDTO[]
  venue: string
  status: string
  id: string
}

const days: string[] = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
] as const

function getOrdinal(number: number): string {
  return number > 0
    ? ["th", "st", "nd", "rd"][
        (number > 3 && number < 21) || number % 10 > 3 ? 0 : number % 10
      ]
    : ""
}

const api_url: string = import.meta.env.VITE_API_URL || ""

export default function Display({
  teamSelected,
  yearSelected,
  seasonSelected
}: {
  teamSelected: string
  yearSelected: string
  seasonSelected: number
}): JSX.Element {
  const [schedule, setSchedule] = useState([] as ISchedule[])
  const [scheduleType, setScheduleType] = useState<string>("N/A")
  const [isVisible, setIsVisible] = useState<boolean>(true)
  const [noData, setNoData] = useState<boolean>(false)

  useEffect(() => {
    axios
      .get(
        api_url +
          "/api/schedule/" +
          teamSelected +
          "/" +
          yearSelected +
          "/" +
          (seasonSelected + 1)
      )
      .then((response: AxiosResponse) => {
        setScheduleType(schedules[seasonSelected])
        setNoData(!response.data.length)
        const schedule: ISchedule[] = []
        let week = 0
        /* eslint-disable  @typescript-eslint/no-explicit-any */
        response.data.forEach((d: any) => {
          if (++week !== d.week.number && seasonSelected === 2) {
            schedule.push({
              date: "",
              week: `${seasonSelected === 2 ? "Round" : "Week"} ${week++}`,
              teams: [],
              venue: "",
              status: "",
              id: `${d.id}.1`
            })
          }
          const teams = [] as ITeamDTO[]
          /* eslint-disable  @typescript-eslint/no-explicit-any */
          d.competitions[0].competitors.forEach((c: any) => {
            teams.push({
              record: c.record ? c.record[0].displayValue : "TBD",
              score: c.score ? c.score.displayValue : "TBD",
              name: c.team.displayName,
              logo: c.team.logos[3].href
            })
          })
          const date = new Date(d.date)
          const dow = days[date.getDay()]
          const month = date.toLocaleString("en-US", { month: "long" })
          const day = date.getDate()
          const time = date.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit"
          })
          const tz =
            Intl.DateTimeFormat(undefined, { timeZoneName: "short" })
              .formatToParts(date)
              .find((part) => part.type === "timeZoneName")?.value ?? ""
          const competitions = d.competitions[0]
          schedule.push({
            date: `${dow}, ${month} ${day}${getOrdinal(day)} @ ${time} ${tz}`,
            week: d.week.text,
            teams: teams,
            venue:
              competitions.venue.fullName +
              (competitions.notes.length > 0
                ? " - " + competitions.notes[0].headline
                : ""),
            status: competitions.status.type.shortDetail.includes("Final")
              ? competitions.status.type.shortDetail
              : competitions.status.type.description,
            id: d.id
          } as ISchedule)
        })
        setSchedule(schedule)
        setIsVisible(true)
      })
      .catch((error: AxiosError) => {
        console.error(error.message)
      })
  }, [teamSelected, yearSelected, seasonSelected])

  return (
    <div className="container">
      {isVisible && (
        <div className="card">
          <div className="card-body">
            <h2 className="card-title text-center">
              {yearSelected} {scheduleType} Schedule
            </h2>
            {noData ? (
              <div className="text-center fs-3 fw-bold mt-5">
                <i className="bi bi-exclamation-diamond h4 nodata"></i> &nbsp;
                No {scheduleType} data for {yearSelected}
              </div>
            ) : null}
            {schedule.map((data: ISchedule) => (
              <div key={data.id} className="card">
                <div className="card-body">
                  <div className="row row-list">
                    {!data.teams.length ? <Bye /> : <Week data={data} />}
                  </div>
                  <div className="row row-list footer">
                    <div className="col text-start ms-10 small">
                      {data.week}
                    </div>
                    <div className="col text-center small">{data.venue}</div>
                    <div className="col text-end me-10 small">{data.date}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
