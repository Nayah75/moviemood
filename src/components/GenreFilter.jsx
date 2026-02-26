import React from 'react';
import '../styles/GenreFilter.css';

const GenreFilter = ({ selectedGenre, onGenreSelect }) => {
  const genres = [
    { id: 28, name: 'Action' },
    { id: 35, name: 'Comedy' },
    { id: 18, name: 'Drama' },
    { id: 878, name: 'Sci-Fi' },
    { id: 53, name: 'Thriller' },
    { id: 27, name: 'Horror' },
    { id: 10749, name: 'Romance' },
    { id: 16, name: 'Animation' }
  ];

  return (
    <div className="genre-filter">
      <button
        className={`genre-btn ${selectedGenre === null ? 'active' : ''}`}
        onClick={() => onGenreSelect(null)}
      >
        All
      </button>
      {genres.map((genre) => (
        <button
          key={genre.id}
          className={`genre-btn ${selectedGenre === genre.id ? 'active' : ''}`}
          onClick={() => onGenreSelect(genre.id)}
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
};

export default GenreFilter;
