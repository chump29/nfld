import { useEffect, useState } from 'react'

import axios, { AxiosError, type AxiosResponse } from 'axios'

import './Display.css'

interface ISchedule {
  date: string
  week: string
  teams: ITeam[]
  venue: string
  status: string
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

  const api_url = 'http://localhost:5000/api/schedule/' // TODO: http://backend/api/schedule/

  useEffect(() => {
    axios
      .get(api_url + teamSelected)
      .then((response: AxiosResponse) => {
        const schedule: ISchedule[] = []
        /* eslint-disable  @typescript-eslint/no-explicit-any */
        response.data.forEach((d: any) => {
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
            hour: '2-digit',
            minute: '2-digit'
          })
          const competitions = d.competitions[0]
          schedule.push({
            date: `${month} ${day}${getOrdinal(day)} @ ${time}`,
            week: d.week.text,
            teams: teams,
            venue: competitions.venue.fullName,
            status: competitions.status.type.shortDetail.includes('Final')
              ? competitions.status.type.shortDetail
              : competitions.status.type.description
          } as ISchedule)
          setSeason(d.season.displayName)
        })
        setSchedule(schedule)
      })
      .catch((error: AxiosError) => {
        console.error(error.message)
      })
  }, [teamSelected])

  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <h3 className="card-title fw-bold">Game Schedule</h3>
          <h6 className="card-subtitle text-muted"> &nbsp; {season} Season</h6>
          {schedule.map((data: ISchedule) => (
            <div className="card">
              <div className="card-body">
                <div className="row row-list">
                  <div className="col text-center">
                    <img src={data.teams[0].logo} width={75} />
                    <p className="fw-bold">{data.teams[0].name}</p>
                  </div>
                  <div className="row row-list col-6">
                    <div className="col text-start">
                      <sup>{data.teams[0].record}</sup>
                    </div>
                    <div className="col text-center">
                      <br />
                      <span className="h2 fw-bold">
                        {data.teams[0].score} - {data.teams[1].score}
                      </span>
                      <br />
                      <span className="small">{data.status}</span>
                    </div>
                    <div className="col text-end">
                      <sup>{data.teams[1].record}</sup>
                    </div>
                  </div>
                  <div className="col text-center">
                    <img src={data.teams[1].logo} width={75} />
                    <p className="fw-bold">{data.teams[1].name}</p>
                  </div>
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
