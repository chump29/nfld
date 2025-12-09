import { useEffect, useState } from "react"

import axios, { AxiosError, type AxiosResponse } from "axios"

import Bye from "../bye"
import Week from "../week"

import "./index.css"

export interface ISchedule {
  date: string
  week: string
  teams: ITeam[]
  venue: string
  status: string
  id: string
}

interface ITeam {
  record: string
  score: string
  name: string
  logo: string
}

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
]

/* eslint-disable  @typescript-eslint/no-explicit-any */
const schedules: any = {
  "1": "Preseason",
  "2": "Regular Season"
}

const getOrdinal = (number: number) => {
  return number > 0
    ? ["th", "st", "nd", "rd"][
        (number > 3 && number < 21) || number % 10 > 3 ? 0 : number % 10
      ]
    : ""
}

const api_url = import.meta.env.VITE_API_URL

export default function Display({
  teamSelected,
  seasonSelected
}: {
  teamSelected: string
  seasonSelected: string
}) {
  const [schedule, setSchedule] = useState([] as ISchedule[])
  const [season, setSeason] = useState<string>("N/A")
  const [scheduleType, setScheduleType] = useState<string>("N/A")
  const [isVisible, setIsVisible] = useState<boolean>(false)

  useEffect(() => {
    axios
      .get(api_url + "/api/schedule/" + teamSelected + "/" + seasonSelected)
      .then((response: AxiosResponse) => {
        const schedule: ISchedule[] = []
        let week = 0
        /* eslint-disable  @typescript-eslint/no-explicit-any */
        response.data.forEach((d: any) => {
          if (++week !== d.week.number && seasonSelected === "2") {
            schedule.push({
              date: "",
              week: `Week ${week++}`,
              teams: [],
              venue: "",
              status: "",
              id: `${d.id}.1`
            })
          }
          const teams = [] as ITeam[]
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
          setSeason(d.season.displayName)
          setScheduleType(schedules[seasonSelected])
        })
        setSchedule(schedule)
        setIsVisible(true)
      })
      .catch((error: AxiosError) => {
        console.error(error.message)
      })
  }, [teamSelected, seasonSelected, api_url])

  return (
    <div className="container">
      {isVisible && (
        <div className="card">
          <div className="card-body">
            <h2 className="card-title text-center">
              {season} {scheduleType} Schedule
            </h2>
            {schedule.map((data: ISchedule) => (
              <div className="card" key={data.id}>
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
