import axios, { AxiosError, type AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'

export default function Display() {
  const [schedule, setSchedule] = useState([])

  const api_url = 'http://localhost:5000/api/schedule/' // TODO: http://backend/api/schedule/

  const getSchedule = async () => {
    const teamSelected = 'kc' // TODO

    await axios
      .get(api_url + teamSelected)
      .then((response: AxiosResponse) => {
        setSchedule(response.data)
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
          <h3 className="card-title fw-bold">Schedule</h3>
          TODO
        </div>
      </div>
    </div>
  )
}
