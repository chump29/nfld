import { useEffect, useState } from 'react'

import axios, { AxiosError, type AxiosResponse } from 'axios'

import Bye from './Bye.tsx'
import Week from './Week.tsx'

import './Display.css'

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

const getOrdinal = (number: number) => {
  return number > 0
    ? ['th', 'st', 'nd', 'rd'][
        (number > 3 && number < 21) || number % 10 > 3 ? 0 : number % 10
      ]
    : ''
}

export default function Display({ teamSelected }: { teamSelected: string }) {
  const [schedule, setSchedule] = useState([] as ISchedule[])
  const [season, setSeason] = useState<string>('N/A')

  const api_url = import.meta.env.VITE_API_SCHEDULE_URL

  useEffect(() => {
    axios
      .get(api_url + teamSelected)
      .then((response: AxiosResponse) => {
        const schedule: ISchedule[] = []
        let week = 0
        /* eslint-disable  @typescript-eslint/no-explicit-any */
        response.data.forEach((d: any) => {
          if (++week != d.week.number) {
            schedule.push({
              date: '',
              week: `Week ${week++}`,
              teams: [],
              venue: '',
              status: '',
              id: `${d.id}.1`
            })
          }
          const teams = [] as ITeam[]
          /* eslint-disable  @typescript-eslint/no-explicit-any */
          d.competitions[0].competitors.forEach((c: any) => {
            teams.push({
              record: c.record ? c.record[0].displayValue : 'TBD',
              score: c.score ? c.score.displayValue : 'TBD',
              name: c.team.displayName,
              logo: c.team.logos[3].href
            })
          })
          const date = new Date(d.date)
          const month = date.toLocaleString('en-US', { month: 'long' })
          const day = date.getDate()
          const time = date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit'
          })
          const tz =
            Intl.DateTimeFormat(undefined, { timeZoneName: 'short' })
              .formatToParts(date)
              .find((part) => part.type == 'timeZoneName')?.value ?? ''
          const competitions = d.competitions[0]
          schedule.push({
            date: `${month} ${day}${getOrdinal(day)} @ ${time} ${tz}`,
            week: d.week.text,
            teams: teams,
            venue: competitions.venue.fullName,
            status: competitions.status.type.shortDetail.includes('Final')
              ? competitions.status.type.shortDetail
              : competitions.status.type.description,
            id: d.id
          } as ISchedule)
          setSeason(d.season.displayName)
        })
        setSchedule(schedule)
      })
      .catch((error: AxiosError) => {
        console.error(error.message)
      })
  }, [teamSelected, api_url])

  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <h3 className="card-title fw-bold">Game Schedule</h3>
          <h6 className="card-subtitle text-muted"> &nbsp; {season} Season</h6>
          {schedule.map((data: ISchedule) => (
            <div className="card" key={data.id}>
              <div className="card-body">
                <div className="row row-list">
                  {!data.teams.length ? <Bye /> : <Week data={data} />}
                </div>
                <div className="row row-list">
                  <div className="col text-start ms-10 small">{data.week}</div>
                  <div className="col text-center small">{data.venue}</div>
                  <div className="col text-end me-10 small">{data.date}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
