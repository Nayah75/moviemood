import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import GenreFilter from './components/GenreFilter'
import MovieGrid from './components/MovieGrid'
import { tmdbApi } from './services/tmdbApi'
import './styles/App.css'

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchMode, setSearchMode] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState(null);

// Fetch popular movies on initial load
  useEffect(() => {
    loadPopularMovies();
  }, []);

  const loadPopularMovies = async () => {
    setLoading(true);
    const popularMovies = await tmdbApi.getPopularMovies();
    setMovies(popularMovies);
    setSearchMode(false);
    setSelectedGenre(null);
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
    setSelectedGenre(null);
    setLoading(false);
  };

  const handleGenreSelect = async (genreId) => {
    if (genreId === null) {
      loadPopularMovies();
      return;
    }

    setLoading(true);
    const genreMovies = await tmdbApi.getMoviesByGenre(genreId);
    setMovies(genreMovies);
    setSearchMode(false);
    setSelectedGenre(genreId);
    setLoading(false);
  };

  const handleMovieClick = (movie) => {
    console.log('Movie clicked:', movie);
    alert(`You clicked: ${movie.title}`);
  };

  const getSectionTitle = () => {
    if (searchMode) return 'Search Results';
    if (selectedGenre) return 'Filtered Movies';
    return 'Popular Movies';
  };

  return (
    <div className="App">
      <Header />
      <SearchBar onSearch={handleSearch} />
      
      <main>
        <div className="container">
          <GenreFilter 
            selectedGenre={selectedGenre} 
            onGenreSelect={handleGenreSelect} 
          />

          <div className="section-header">
            <h2 className="section-title">{getSectionTitle()}</h2>
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
