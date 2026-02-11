import type { JSX } from "react"

import Selector from "../selector"

export default function Dashboard(): JSX.Element {
  return (
    <div className="container">
      <Selector />
    </div>
  )
}
