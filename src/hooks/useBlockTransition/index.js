import { useEffect, useState } from "react"

const paths = new Map()

paths.set("/main", "Grand Avenue/Main")

export const useBlockTransition = () => {
  const [url, setUrl] = useState(window.location.pathname)
  const [currentIndex, setCurrentIndex] = useState(paths.findIndex(url))

  useEffect((url) => {
    document.title = paths.get(url)
  }, [])
}