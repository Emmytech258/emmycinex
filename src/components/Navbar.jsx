import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useMovieContext } from '../context/MovieContext'

export default function Navbar() {
  const [query, setQuery] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { watchlist } = useMovieContext()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`)
      setQuery('')
      setMenuOpen(false)
    }
  }

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Popular', path: '/search?q=popular' },
    { label: 'Action', path: '/search?q=action' },
    { label: 'Comedy', path: '/search?q=comedy' },
  ]

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled
          ? 'bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/5'
          : 'bg-gradient-to-b from-black/80 to-transparent'
      }`}>
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 h-16 flex items-center justify-between gap-4">

          {/* Logo */}
          <a href="/" className="text-2xl font-black tracking-tight shrink-0"
            style={{
              background: 'linear-gradient(135deg, #E50914, #ff6b35)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
            EmmyCinex
          </a>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <a key={link.label} href={link.path}
                className={`text-sm font-medium transition-colors duration-200 ${
                  location.pathname === link.path
                    ? 'text-white'
                    : 'text-white/60 hover:text-white'
                }`}>
                {link.label}
              </a>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Search form */}
            <form onSubmit={handleSearch} className="hidden sm:flex items-center">
              <div className="flex items-center gap-2 bg-white/8 border border-white/10 rounded px-3 py-1.5 focus-within:bg-white/12 focus-within:border-white/25 transition-all duration-200">
                <span className="text-white/40 text-sm">🔍</span>
                <input
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search..."
                  className="bg-transparent outline-none text-white text-sm w-36 placeholder-white/30"
                />
              </div>
            </form>

            {/* Watchlist */}
            <a href="/watchlist"
              className="flex items-center gap-1.5 bg-white/8 hover:bg-white/14 border border-white/10 rounded px-3 py-1.5 text-sm font-medium text-white/80 hover:text-white transition-all duration-200">
              🔖 <span className="hidden sm:inline">Watchlist</span>
              {watchlist.length > 0 && (
                <span className="bg-[#E50914] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {watchlist.length}
                </span>
              )}
            </a>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex flex-col gap-1.5 p-1"
              aria-label="Menu"
            >
              {[0,1,2].map(i => (
                <span key={i} className="block w-6 h-0.5 bg-white rounded transition-all duration-300"
                  style={{
                    transform: menuOpen
                      ? i === 0 ? 'translateY(8px) rotate(45deg)'
                      : i === 2 ? 'translateY(-8px) rotate(-45deg)' : 'none'
                      : 'none',
                    opacity: menuOpen && i === 1 ? 0 : 1
                  }}
                />
              ))}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed top-16 left-0 right-0 z-40 bg-[#0a0a0a]/98 backdrop-blur-md border-b border-white/8 p-4 md:hidden">
          <form onSubmit={handleSearch} className="flex gap-2 mb-4">
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search movies..."
              className="flex-1 bg-white/8 border border-white/10 rounded px-3 py-2 text-sm text-white placeholder-white/30 outline-none"
            />
            <button type="submit"
              className="bg-[#E50914] text-white px-4 py-2 rounded text-sm font-semibold">
              Go
            </button>
          </form>
          <div className="flex flex-col gap-3">
            {navLinks.map(link => (
              <a key={link.label} href={link.path}
                onClick={() => setMenuOpen(false)}
                className="text-white/70 hover:text-white text-sm font-medium py-1 transition-colors">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  )
}