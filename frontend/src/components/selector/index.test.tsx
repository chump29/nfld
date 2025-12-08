import { render, screen } from "@testing-library/react"
import axios, { type AxiosResponse } from "axios"

import Selector from "."

vi.spyOn(console, "error").mockImplementation(() => undefined)

beforeEach(() => {
  const response = {
    data: [
      {
        team: {
          id: 12,
          abbreviation: "KC",
          displayName: "Kansas City Chiefs"
        }
      }
    ]
  } as AxiosResponse
  vi.spyOn(axios, "get").mockResolvedValue(response)

  render(<Selector />)
})

describe("Selector", () => {
  it("should display title", () => {
    expect(
      screen.queryByLabelText("title"),
      "Title not found"
    ).toBeInTheDocument()
  })

  it("should display team dropdown", () => {
    expect(
      screen.queryByRole("option", { name: /Choose a team/ }),
      "Team dropdown not found"
    ).toBeInTheDocument()
  })

  it("should display schedule dropdown", () => {
    expect(
      screen.queryByRole("option", { name: /Choose a schedule/ }),
      "Schedule dropdown not found"
    ).toBeInTheDocument()
  })
})
