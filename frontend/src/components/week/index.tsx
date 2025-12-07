import type { ISchedule } from "../display"

export default function Week({ data }: { data: ISchedule }) {
  return (
    <>
      <div className="col text-center">
        <img
          src={data.teams[0].logo}
          width={75}
          alt={data.teams[0].name + " logo"}
        />
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
        <img
          src={data.teams[1].logo}
          width={75}
          alt={data.teams[1].name + " logo"}
        />
        <p className="fw-bold">{data.teams[1].name}</p>
      </div>
    </>
  )
}
