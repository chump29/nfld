import type { ISchedule } from "../display"

import "./index.css"

export default function Week({ data }: { data: ISchedule }) {
  return (
    <>
      <div className="col text-center">
        <span className="recordL">
          <sup>{data.teams[0].record}</sup>
        </span>
        <img src={data.teams[0].logo} alt={data.teams[0].name + " logo"} />
        <p className="team">{data.teams[0].name}</p>
      </div>
      <div className="row row-list col-4">
        <div className="col text-center">
          <br />
          {data.teams[0].score !== "TBD" &&
          <span className="score">
            {data.teams[0].score} - {data.teams[1].score}
          </span>}
          {data.teams[0].score !== "TBD" &&
          <br />}
          {data.teams[0].score !== "TBD" &&
          <span className="small">{data.status}</span>}
          {data.teams[0].score === "TBD" &&
          <span className="score">
            TBD
          </span>}
        </div>
      </div>
      <div className="col text-center">
        <span className="recordR">
          <sup>{data.teams[1].record}</sup>
        </span>
        <img
          src={data.teams[1].logo}
          width={75}
          alt={data.teams[1].name + " logo"}
        />
        <p className="team">{data.teams[1].name}</p>
      </div>
    </>
  )
}
