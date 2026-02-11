import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import axios, { AxiosError, type AxiosResponse } from "axios"

import Dashboard from "./components/dashboard"

import "bootstrap/dist/css/bootstrap.min.css"

const api_url = import.meta.env.VITE_API_URL || ""

function getVersion(version: string): string {
  return version.length ? `v${version}` : "N/A"
}

document.getElementById("frontend")!.innerText = getVersion(
  import.meta.env.PACKAGE_VERSION
)

const obj = document.getElementById("backend")
axios
  .get(api_url + "/api/version", { timeout: 3000 })
  .then((response: AxiosResponse) => {
    if (!response.data.length) {
      throw new AxiosError("Invalid response")
    }
    obj!.innerText = getVersion(response.data)
  })
  .catch((error: AxiosError) => {
    console.error(error.message)
    obj!.innerText = "N/A"
  })

if (import.meta.env.DEV) {
  createRoot(document.getElementById("root")!).render(<Dashboard />)
} else {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <Dashboard />
    </StrictMode>
  )
}
