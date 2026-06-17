import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  getTrendingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  IMG_ORIGINAL
} from '../api'
import MovieRow from '../components/MovieRow'
import useMovies from '../hooks/useMovies'

export default function Home() {
  const navigate = useNavigate()
  const [hero, setHero] = useState(null)
  const [heroLoaded, setHeroLoaded] = useState(false)

  const { data: trending, loading: trendingLoading } = useMovies(getTrendingMovies, [])
  const { data: popular } = useMovies(getPopularMovies, [])
  const { data: topRated } = useMovies(getTopRatedMovies, [])
  const { data: upcoming } = useMovies(getUpcomingMovies, [])

  useEffect(() => {
    if (trending.length > 0) {
      const randomIndex = Math.floor(Math.random() * 5)
      setHero(trending[randomIndex])
    }
  }, [trending])

  if (trendingLoading) return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center gap-4">
      <div className="spinner" />
      <p className="text-white/40 text-sm">Loading EmmyCinex...</p>
    </div>
  )

  return (
    <div className="bg-[#0a0a0a] min-h-screen">

      {/* Hero */}
      {hero && (
        <div className="relative h-[85vh] md:h-screen overflow-hidden">
          <img
            src={`${IMG_ORIGINAL}${hero.backdrop_path}`}
            alt={hero.title}
            onLoad={() => setHeroLoaded(true)}
            className={`w-full h-full object-cover object-top transition-opacity duration-700 ${heroLoaded ? 'opacity-100' : 'opacity-0'}`}
          />

          {/* Gradients */}
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.5) 55%, transparent 100%)' }} />
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, #0a0a0a 0%, transparent 45%)' }} />

          {/* Hero content */}
          <div className="absolute bottom-[18%] left-4 md:left-12 max-w-xl fade-in">
            <span className="inline-block bg-[#E50914] text-white text-xs font-black tracking-widest uppercase px-3 py-1 rounded mb-4">
              🔥 Trending Now
            </span>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight mb-3">
              {hero.title}
            </h1>

            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <span className="text-yellow-400 font-bold text-sm">
                ⭐ {hero.vote_average?.toFixed(1)}
              </span>
              <span className="text-white/50 text-sm">
                {hero.release_date?.split('-')[0]}
              </span>
              <span className="border border-white/30 text-white/60 text-xs px-2 py-0.5 rounded">
                HD
              </span>
            </div>

            <p className="text-white/70 text-sm md:text-base leading-relaxed mb-6 line-clamp-3">
              {hero.overview}
            </p>

            <div className="flex gap-3 flex-wrap">
              <button
                onClick={() => navigate(`/movie/${hero.id}`)}
                className="flex items-center gap-2 bg-[#E50914] hover:bg-red-500 text-white font-bold px-6 py-3 rounded transition-all duration-200 hover:scale-105 text-sm"
              >
                ▶ Watch Now
              </button>
              <button
                onClick={() => navigate(`/movie/${hero.id}`)}
                className="flex items-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/20 text-white font-semibold px-6 py-3 rounded transition-all duration-200 text-sm"
              >
                ℹ More Info
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Movie rows */}
      <div className="pb-10 -mt-16 relative z-10">
        <MovieRow title="🔥 Trending This Week" movies={trending} />
        <MovieRow title="🎬 Popular Movies" movies={popular} />
        <MovieRow title="⭐ Top Rated All Time" movies={topRated} />
        <MovieRow title="🆕 Coming Soon" movies={upcoming} />
      </div>
    </div>
  )
}