import axios from 'axios'

const BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = '99c49495e5c886954725ac00f250414f'

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US',
  },
})

export const getPopularMovies = () => api.get('/movie/popular')
export const getTrendingMovies = () => api.get('/trending/movie/week')
export const getTopRatedMovies = () => api.get('/movie/top_rated')
export const getUpcomingMovies = () => api.get('/movie/upcoming')
export const getMovieDetails = (id) =>
  api.get(`/movie/${id}`, {
    params: { append_to_response: 'credits,videos,similar' },
  })
export const searchMovies = (query, page = 1) =>
  api.get('/search/movie', { params: { query, page } })

export const IMG_BASE = 'https://image.tmdb.org/t/p/'
export const IMG_W500 = `${IMG_BASE}w500`
export const IMG_ORIGINAL = `${IMG_BASE}original`
export const IMG_W300 = `${IMG_BASE}w300`