export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/5 py-8 px-4 mt-10">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-xl font-black tracking-tight mb-1"
            style={{
              background: 'linear-gradient(135deg, #E50914, #ff6b35)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block'
            }}>EmmyCinex</div>
          <p className="text-white/30 text-xs">
            Built with React JS + TMDB API
          </p>
        </div>

        <div className="flex gap-6">
          {['Home', 'Popular', 'Action', 'Watchlist'].map(link => (
            <a key={link}
              href={link === 'Home' ? '/' : link === 'Watchlist' ? '/watchlist' : `/search?q=${link.toLowerCase()}`}
              className="text-white/30 hover:text-white text-xs font-medium transition-colors duration-200 uppercase tracking-wider">
              {link}
            </a>
          ))}
        </div>

        <p className="text-white/20 text-xs text-center">
          © 2026 Emmanuel Ibitayo.
        </p>
      </div>
    </footer>
  )
}