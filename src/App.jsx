import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import MovieDetail from './pages/MovieDetail'
import Search from './pages/Search'
import Watchlist from './pages/Watchlist'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="min-h-screen bg-[#0a0a0a]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/search" element={<Search />} />
          <Route path="/watchlist" element={<Watchlist />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App