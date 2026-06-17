import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { searchMovies } from '../api'
import MovieCard from '../components/MovieCard'

export default function Search() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [totalResults, setTotalResults] = useState(0)

  useEffect(() => {
    setMovies([])
    setPage(1)
  }, [query])

  useEffect(() => {
    if (!query) return
    const fetchMovies = async () => {
      try {
        setLoading(true)
        const res = await searchMovies(query, page)
        setTotalPages(res.data.total_pages)
        setTotalResults(res.data.total_results)
        if (page === 1) {
          setMovies(res.data.results)
          window.scrollTo(0, 0)
        } else {
          setMovies(prev => [...prev, ...res.data.results])
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchMovies()
  }, [query, page])

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-12 px-4 md:px-8">
      <div className="max-w-[1400px] mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-black text-white mb-1">
            {query ? `Results for "${query}"` : 'Search Movies'}
          </h1>
          {totalResults > 0 && (
            <p className="text-white/35 text-sm">
              {totalResults.toLocaleString()} movies found
            </p>
          )}
        </div>

        {/* Loading first page */}
        {loading && page === 1 && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="spinner" />
            <p className="text-white/40 text-sm">Searching...</p>
          </div>
        )}

        {/* No results */}
        {!loading && movies.length === 0 && query && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="text-5xl mb-4">🎬</div>
            <h2 className="text-white text-xl font-bold mb-2">No movies found</h2>
            <p className="text-white/40 text-sm">Try searching for something else</p>
          </div>
        )}

        {/* Results */}
        {movies.length > 0 && (
          <>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3 mb-8 fade-in">
              {movies.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>

            {/* Load more */}
            {page < totalPages && (
              <div className="flex justify-center mt-6">
                <button
                  onClick={() => setPage(p => p + 1)}
                  disabled={loading}
                  className="bg-[#E50914] hover:bg-red-500 disabled:opacity-60 text-white font-bold px-8 py-3 rounded transition-all duration-200 hover:scale-105 text-sm tracking-wide"
                >
                  {loading ? 'Loading...' : 'Load More'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}