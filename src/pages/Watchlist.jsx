import { useMovieContext } from '../context/MovieContext'
import MovieCard from '../components/MovieCard'

export default function Watchlist() {
  const { watchlist } = useMovieContext()

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-12 px-4 md:px-8">
      <div className="max-w-[1400px] mx-auto">

        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-black text-white mb-1">
            🔖 My Watchlist
          </h1>
          <p className="text-white/35 text-sm">
            {watchlist.length === 0
              ? 'No movies saved yet'
              : `${watchlist.length} movie${watchlist.length > 1 ? 's' : ''} saved`
            }
          </p>
        </div>

        {watchlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="text-6xl mb-4">🎬</div>
            <h2 className="text-white text-xl font-bold mb-2">Your watchlist is empty</h2>
            <p className="text-white/40 text-sm mb-6">
              Browse movies and click + to add them here
            </p>
            <a href="/"
              className="bg-[#E50914] hover:bg-red-500 text-white font-bold px-6 py-3 rounded transition-all duration-200 text-sm">
              Browse Movies
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3 fade-in">
            {watchlist.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}