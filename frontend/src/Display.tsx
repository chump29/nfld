import { useEffect, useState } from 'react'

import axios, { AxiosError, type AxiosResponse } from 'axios'

import "./Display.css"

//interface ISchedule {
//}

interface Props {
  team: string
  logo: string
  color: string
  alternateColor: string
}

export default function Display(props: Props) {
  const [schedule, setSchedule] = useState([] as ISchedule)
  const [season, setSeason] = useState<string>("N/A")

  const api_url = 'http://localhost:5000/api/schedule/' // TODO: http://backend/api/schedule/

  const getSchedule = async () => {

    await axios
      .get(api_url + props.team)
      .then((response: AxiosResponse) => {
        const schedule: ISchedule[] = []
        response.data.forEach((d) => {
          schedule.push({
            // TODO
          } as ISchedule)
        })
        setSchedule(schedule)
      })
      .catch((error: AxiosError) => {
        console.error(error.message)
      })
  }

  useEffect(() => {
    getSchedule()
  }, [])

  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <h3 className="card-title fw-bold">Game Schedule</h3>
          <h6 className='card-subtitle text-muted'> &nbsp; {season} Season</h6>

          <div className='row'>
            <div className="col">
              <div className="card">
                <div className='card-body'>
                  <div className='row row-list'>
                    <div className='col text-center bg' style={{backgroundColor: "#e31837"}}>
                      <img src="https://a.espncdn.com/i/teamlogos/nfl/500-dark/scoreboard/kc.png" width={100} />
                      <p className='fw-bold' style={{color: "#ffb612"}}>Kansas City Chiefs</p>
                    </div>
                    <div className='row row-list col-6'>
                      <div className='col text-start'>
                        <sup>0-0</sup>
                      </div>
                      <div className='col text-center h2 fw-bold' id="score">
                        0 - 0
                      </div>
                      <div className='col text-end'>
                        <sup>0-0</sup>
                      </div>
                    </div>
                    <div className='col text-center bg' style={{backgroundColor: "#000000"}}>
                      <img src="https://a.espncdn.com/i/teamlogos/nfl/500-dark/scoreboard/lv.png" width={100} />
                      <p className='fw-bold' style={{color: "#a5acaf"}}>Las Vegas Raiders</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card">
                <div className='card-body'>
                  <div className='row row-list'>
                    <div className='col text-center'>
                      <img src="https://a.espncdn.com/i/teamlogos/nfl/500-dark/kc.png" width="100" />
                    </div>
                    <div className='row row-list col-6'>
                      <div className='col text-start'>
                        TEST1-1
                      </div>
                      <div className='col text-center'>
                        <br/><br/>
                        XXX
                      </div>
                      <div className='col text-end'>
                        TEST1-2
                      </div>
                    </div>
                    <div className='col text-center'>
                      <img src="https://a.espncdn.com/i/teamlogos/nfl/500-dark/kc.png" width="100" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='row'>
            <div className="col">
              <div className="card">
                <div className='card-body'>
                  <div className='row row-list'>
                    <div className='col text-center'>
                      <img src="https://a.espncdn.com/i/teamlogos/nfl/500-dark/kc.png" width="100" />
                    </div>
                    <div className='row row-list col-6'>
                      <div className='col text-start'>
                        TEST1-1
                      </div>
                      <div className='col text-center'>
                        <br/><br/>
                        XXX
                      </div>
                      <div className='col text-end'>
                        TEST1-2
                      </div>
                    </div>
                    <div className='col text-center'>
                      <img src="https://a.espncdn.com/i/teamlogos/nfl/500-dark/kc.png" width="100" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card">
                <div className='card-body'>
                  <div className='row row-list'>
                    <div className='col text-center'>
                      <img src="https://a.espncdn.com/i/teamlogos/nfl/500-dark/kc.png" width="100" />
                    </div>
                    <div className='row row-list col-6'>
                      <div className='col text-start'>
                        TEST1-1
                      </div>
                      <div className='col text-center'>
                        <br/><br/>
                        XXX
                      </div>
                      <div className='col text-end'>
                        TEST1-2
                      </div>
                    </div>
                    <div className='col text-center'>
                      <img src="https://a.espncdn.com/i/teamlogos/nfl/500-dark/kc.png" width="100" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='row'>
            <div className="col">
              <div className="card">
                <div className='card-body'>
                  <div className='row row-list'>
                    <div className='col text-center'>
                      <img src="https://a.espncdn.com/i/teamlogos/nfl/500-dark/kc.png" width="100" />
                    </div>
                    <div className='row row-list col-6'>
                      <div className='col text-start'>
                        TEST1-1
                      </div>
                      <div className='col text-center'>
                        <br/><br/>
                        XXX
                      </div>
                      <div className='col text-end'>
                        TEST1-2
                      </div>
                    </div>
                    <div className='col text-center'>
                      <img src="https://a.espncdn.com/i/teamlogos/nfl/500-dark/kc.png" width="100" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card">
                <div className='card-body'>
                  <div className='row row-list'>
                    <div className='col text-center'>
                      <img src="https://a.espncdn.com/i/teamlogos/nfl/500-dark/kc.png" width="100" />
                    </div>
                    <div className='row row-list col-6'>
                      <div className='col text-start'>
                        TEST1-1
                      </div>
                      <div className='col text-center'>
                        <br/><br/>
                        XXX
                      </div>
                      <div className='col text-end'>
                        TEST1-2
                      </div>
                    </div>
                    <div className='col text-center'>
                      <img src="https://a.espncdn.com/i/teamlogos/nfl/500-dark/kc.png" width="100" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='row'>
            <div className="col">
              <div className="card">
                <div className='card-body'>
                  <div className='row row-list'>
                    <div className='col text-center'>
                      <img src="https://a.espncdn.com/i/teamlogos/nfl/500-dark/kc.png" width="100" />
                    </div>
                    <div className='row row-list col-6'>
                      <div className='col text-start'>
                        TEST1-1
                      </div>
                      <div className='col text-center'>
                        <br/><br/>
                        XXX
                      </div>
                      <div className='col text-end'>
                        TEST1-2
                      </div>
                    </div>
                    <div className='col text-center'>
                      <img src="https://a.espncdn.com/i/teamlogos/nfl/500-dark/kc.png" width="100" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card">
                <div className='card-body'>
                  <div className='row row-list'>
                    <div className='col text-center'>
                      <img src="https://a.espncdn.com/i/teamlogos/nfl/500-dark/kc.png" width="100" />
                    </div>
                    <div className='row row-list col-6'>
                      <div className='col text-start'>
                        TEST1-1
                      </div>
                      <div className='col text-center'>
                        <br/><br/>
                        XXX
                      </div>
                      <div className='col text-end'>
                        TEST1-2
                      </div>
                    </div>
                    <div className='col text-center'>
                      <img src="https://a.espncdn.com/i/teamlogos/nfl/500-dark/kc.png" width="100" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
