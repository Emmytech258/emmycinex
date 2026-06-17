import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMovieContext } from '../context/MovieContext'
import { IMG_W500 } from '../api'

export default function MovieCard({ movie }) {
  const navigate = useNavigate()
  const [hovered, setHovered] = useState(false)
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useMovieContext()
  const inList = isInWatchlist(movie.id)

  const poster = movie.poster_path
    ? `${IMG_W500}${movie.poster_path}`
    : null

  const rating = movie.vote_average?.toFixed(1)
  const year = movie.release_date?.split('-')[0]

  const handleWatchlist = (e) => {
    e.stopPropagation()
    inList ? removeFromWatchlist(movie.id) : addToWatchlist(movie)
  }

  return (
    <div
      onClick={() => navigate(`/movie/${movie.id}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-md overflow-hidden cursor-pointer bg-[#1a1a1a] group"
      style={{
        transform: hovered ? 'scale(1.05)' : 'scale(1)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        boxShadow: hovered ? '0 25px 50px rgba(0,0,0,0.8)' : '0 4px 15px rgba(0,0,0,0.3)',
      }}
    >
      {/* Poster */}
      {poster ? (
        <img
          src={poster}
          alt={movie.title}
          className="w-full object-cover"
          style={{
            aspectRatio: '2/3',
            opacity: hovered ? 0.5 : 1,
            transition: 'opacity 0.3s ease'
          }}
          onError={e => { e.target.style.display = 'none' }}
        />
      ) : (
        <div className="w-full bg-[#2a2a2a] flex items-center justify-center text-white/20 text-sm"
          style={{ aspectRatio: '2/3' }}>
          No Image
        </div>
      )}

      {/* Rating badge */}
      <div className="absolute top-2 left-2 bg-black/75 backdrop-blur-sm rounded px-1.5 py-0.5 flex items-center gap-1">
        <span className="text-yellow-400 text-xs">⭐</span>
        <span className="text-white text-xs font-bold">{rating}</span>
      </div>

      {/* Watchlist button */}
      <button
        onClick={handleWatchlist}
        className={`absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center text-xs transition-all duration-200 ${
          inList
            ? 'bg-[#E50914] text-white'
            : 'bg-black/60 text-white/60 hover:bg-white/20 hover:text-white'
        }`}
      >
        {inList ? '✓' : '+'}
      </button>

      {/* Hover overlay */}
      <div className={`absolute inset-0 flex flex-col justify-end p-3 transition-opacity duration-300 ${
        hovered ? 'opacity-100' : 'opacity-0'
      }`}
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, transparent 60%)' }}>
        <h3 className="text-white text-sm font-bold leading-tight mb-1 line-clamp-2">
          {movie.title}
        </h3>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-yellow-400 text-xs font-bold">⭐ {rating}</span>
          <span className="text-white/50 text-xs">{year}</span>
        </div>
        <div className="bg-[#E50914] text-white text-xs font-bold py-1.5 rounded text-center tracking-wide">
          ▶ View Details
        </div>
      </div>
    </div>
  )
}