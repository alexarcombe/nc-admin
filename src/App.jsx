import { useState, useEffect } from "react"
import { Header, Sidebar, Page } from "./components"
import { getPages } from "./api/pages"
import { getTemplates } from "./api/templates"

function App() {
  const [activePage, setActivePage] = useState()
  const [pages, setPages] = useState([])
  const [templates, setTemplates] = useState([])

  useEffect(() => {
    getPages(setPages)
    getTemplates(setTemplates)
  }, [setPages, setTemplates])

  return (
    <>
      <Header />
      <Sidebar {...{ pages, setPages, activePage, setActivePage }} />
      {activePage && (
        <Page {...{ activePage, setActivePage, templates, setPages }} />
      )}
    </>
  )
}

export default App
