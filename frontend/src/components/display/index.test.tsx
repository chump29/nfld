import { render, screen } from "@testing-library/react"

import Display from "."

describe("Display", () => {
  beforeEach(() => {
    render(<Display teamSelected="KC" seasonSelected="2" />)
  })

  it("should display title", () => {
    expect(
      screen.queryByRole("heading", { name: /Schedule/ }),
      "Title not found"
    ).toBeInTheDocument()
  })
})
