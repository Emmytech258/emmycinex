import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getMovieDetails, IMG_ORIGINAL, IMG_W300 } from '../api'
import { useMovieContext } from '../context/MovieContext'
import MovieCard from '../components/MovieCard'

export default function MovieDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useMovieContext()

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true)
        window.scrollTo(0, 0)
        const res = await getMovieDetails(id)
        setMovie(res.data)
      } catch (err) {
        console.error('Failed to load movie:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchMovie()
  }, [id])

  if (loading) return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div className="spinner" />
    </div>
  )

  if (!movie) return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white/40">
      Movie not found.
    </div>
  )

  const trailer = movie.videos?.results?.find(v => v.type === 'Trailer' && v.site === 'YouTube')
  const trailerWatchUrl = trailer ? 'https://www.youtube.com/watch?v=' + trailer.key : ''
  const trailerEmbedUrl = trailer ? 'https://www.youtube.com/embed/' + trailer.key : ''
  const cast = movie.credits?.cast?.slice(0, 10)
  const similar = movie.similar?.results?.slice(0, 12)
  const hours = movie.runtime ? Math.floor(movie.runtime / 60) : 0
  const mins = movie.runtime ? movie.runtime % 60 : 0
  const runtime = movie.runtime ? hours + 'h ' + mins + 'm' : 'N/A'
  const inList = isInWatchlist(movie.id)

  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      <div className="relative h-[60vh] md:h-[75vh] overflow-hidden">
        <img
          src={IMG_ORIGINAL + movie.backdrop_path}
          alt={movie.title}
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.55) 60%, transparent 100%)' }}
        />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, #0a0a0a 0%, transparent 40%)' }}
        />
        <button
          onClick={() => navigate(-1)}
          className="absolute top-20 left-4 md:left-8 bg-black/50 hover:bg-red-700 backdrop-blur-sm border border-white/10 text-white text-sm font-semibold px-4 py-2 rounded transition-all duration-200"
        >
          Back
        </button>
        <div className="absolute bottom-0 left-4 md:left-8 right-4 flex gap-6 items-end pb-8">
          <img
            src={IMG_W300 + movie.poster_path}
            alt={movie.title}
            className="hidden md:block w-40 lg:w-48 rounded-lg shadow-2xl shrink-0 border border-white/10"
          />
          <div className="flex-1">
            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight mb-3">
              {movie.title}
            </h1>
            <div className="flex items-center gap-3 flex-wrap mb-4">
              <span className="text-yellow-400 font-bold">
                {movie.vote_average?.toFixed(1)}/10
              </span>
              <span className="text-white/50 text-sm">
                {movie.release_date?.split('-')[0]}
              </span>
              <span className="text-white/50 text-sm">{runtime}</span>
              {movie.genres?.slice(0, 4).map(g => (
                <span key={g.id} className="bg-red-900/40 border border-red-700/40 text-red-400 text-xs font-bold px-2 py-0.5 rounded">
                  {g.name}
                </span>
              ))}
            </div>
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={() => inList ? removeFromWatchlist(movie.id) : addToWatchlist(movie)}
                className="font-bold px-5 py-2.5 rounded text-sm transition-all duration-200 hover:scale-105 bg-[#E50914] text-white hover:bg-red-500"
              >
                {inList ? 'In Watchlist' : 'Add to Watchlist'}
              </button>
              {trailer && (
                <a
                  href={trailerWatchUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white/10 hover:bg-white/20 border border-white/15 text-white font-semibold px-5 py-2.5 rounded text-sm transition-all duration-200"
                >
                  Watch Trailer
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-8">
        <div className="mb-10">
          <h2 className="text-white text-xl font-bold mb-3">Overview</h2>
          <p className="text-white/65 leading-relaxed text-base max-w-3xl">
            {movie.overview}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 bg-white/4 border border-white/8 rounded-xl p-5 mb-10">
          {[
            ['Status', movie.status],
            ['Language', movie.original_language?.toUpperCase()],
            ['Runtime', runtime],
            ['Budget', movie.budget ? '$' + (movie.budget / 1e6).toFixed(1) + 'M' : 'N/A'],
            ['Revenue', movie.revenue ? '$' + (movie.revenue / 1e6).toFixed(1) + 'M' : 'N/A'],
            ['Votes', movie.vote_count?.toLocaleString()],
          ].map(([label, value]) => (
            <div key={label}>
              <div className="text-[#E50914] text-xs font-black uppercase tracking-widest mb-1">{label}</div>
              <div className="text-white font-semibold text-sm">{value || 'N/A'}</div>
            </div>
          ))}
        </div>

        {trailer && (
          <div className="mb-10">
            <h2 className="text-white text-xl font-bold mb-4">Official Trailer</h2>
            <div className="relative rounded-xl overflow-hidden shadow-2xl" style={{ paddingBottom: '56.25%', height: 0 }}>
              <iframe
                src={trailerEmbedUrl}
                title="Official Trailer"
                className="absolute inset-0 w-full h-full"
                allowFullScreen
              />
            </div>
          </div>
        )}

        {cast && cast.length > 0 && (
          <div className="mb-10">
            <h2 className="text-white text-xl font-bold mb-4">Cast</h2>
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-3">
              {cast.map(person => (
                <div key={person.id} className="text-center group">
                  <div className="rounded-lg overflow-hidden mb-2 bg-[#1a1a1a]" style={{ aspectRatio: '2/3' }}>
                    <img
                      src={person.profile_path ? IMG_W300 + person.profile_path : 'https://via.placeholder.com/300x450/1a1a1a/333?text=?'}
                      alt={person.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={e => { e.target.src = 'https://via.placeholder.com/300x450/1a1a1a/333?text=?' }}
                    />
                  </div>
                  <p className="text-white text-xs font-semibold leading-tight">{person.name}</p>
                  <p className="text-white/35 text-xs mt-0.5 line-clamp-1">{person.character}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {similar && similar.length > 0 && (
          <div>
            <h2 className="text-white text-xl font-bold mb-4">You May Also Like</h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
              {similar.map(m => <MovieCard key={m.id} movie={m} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}