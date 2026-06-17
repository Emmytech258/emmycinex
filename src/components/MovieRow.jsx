import { useRef } from 'react'
import MovieCard from './MovieCard'

export default function MovieRow({ title, movies }) {
  const rowRef = useRef(null)

  const scroll = (dir) => {
    rowRef.current?.scrollBy({ left: dir * 900, behavior: 'smooth' })
  }

  if (!movies || movies.length === 0) return null

  return (
    <section className="mb-10">
      <h2 className="text-white text-lg md:text-xl font-bold mb-3 px-4 md:px-8">
        {title}
      </h2>
      <div className="relative group">
        {/* Left arrow */}
        <button
          onClick={() => scroll(-1)}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-full px-2 bg-gradient-to-r from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-white text-2xl font-bold hover:text-[#E50914]"
        >‹</button>

        {/* Row */}
        <div
          ref={rowRef}
          className="flex gap-2 overflow-x-auto px-4 md:px-8 pb-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {movies.map(movie => (
            <div key={movie.id} className="shrink-0" style={{ width: 'clamp(120px, 14vw, 185px)' }}>
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>

        {/* Right arrow */}
        <button
          onClick={() => scroll(1)}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-full px-2 bg-gradient-to-l from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-white text-2xl font-bold hover:text-[#E50914]"
        >›</button>
      </div>
    </section>
  )
}