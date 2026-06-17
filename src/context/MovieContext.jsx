import { createContext, useContext, useState } from 'react'

const MovieContext = createContext()

export function MovieProvider({ children }) {
  const [watchlist, setWatchlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('emmycinex_watchlist')) || []
    } catch {
      return []
    }
  })

  const addToWatchlist = (movie) => {
    const updated = [...watchlist, movie]
    setWatchlist(updated)
    localStorage.setItem('emmycinex_watchlist', JSON.stringify(updated))
  }

  const removeFromWatchlist = (id) => {
    const updated = watchlist.filter(m => m.id !== id)
    setWatchlist(updated)
    localStorage.setItem('emmycinex_watchlist', JSON.stringify(updated))
  }

  const isInWatchlist = (id) => watchlist.some(m => m.id === id)

  return (
    <MovieContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist }}>
      {children}
    </MovieContext.Provider>
  )
}

export function useMovieContext() {
  return useContext(MovieContext)
}