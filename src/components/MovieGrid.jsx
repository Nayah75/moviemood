import React from 'react';
import MovieCard from './MovieCard';
import '../styles/MovieGrid.css';

const MovieGrid = ({ movies, onMovieClick }) => {
  if (movies.length === 0) {
    return (
      <div className="no-movies">
        <p>No movies found. Try a different search!</p>
      </div>
    );
  }

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard 
          key={movie.id} 
          movie={movie} 
          onClick={onMovieClick}
        />
      ))}
    </div>
  );
};

export default MovieGrid;
