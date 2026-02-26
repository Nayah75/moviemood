import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import MovieGrid from './components/MovieGrid'
import { tmdbApi } from './services/tmdbApi'
import './styles/App.css'

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchMode, setSearchMode] = useState(false);

  // Fetch popular movies on initial load
  useEffect(() => {
    loadPopularMovies();
  }, []);

  const loadPopularMovies = async () => {
    setLoading(true);
    const popularMovies = await tmdbApi.getPopularMovies();
    setMovies(popularMovies);
    setSearchMode(false);
    setLoading(false);
  };

  const handleSearch = async (query) => {
    if (!query.trim()) {
      loadPopularMovies();
      return;
    }
    
    setLoading(true);
    const searchResults = await tmdbApi.searchMovies(query);
    setMovies(searchResults);
    setSearchMode(true);
    setLoading(false);
  };

  const handleMovieClick = (movie) => {
    console.log('Movie clicked:', movie);
    // We'll implement the movie details modal later
    alert(`You clicked: ${movie.title}`);
  };

  return (
    <div className="App">
      <Header />
      <SearchBar onSearch={handleSearch} />
      
      <main>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              {searchMode ? 'Search Results' : 'Popular Movies'}
            </h2>
          </div>

          {loading ? (
            <div className="loading">
              <p>Loading movies...</p>
            </div>
          ) : (
            <MovieGrid movies={movies} onMovieClick={handleMovieClick} />
          )}
        </div>
      </main>
    </div>
  )
}

export default App
