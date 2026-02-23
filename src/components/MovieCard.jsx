import React from 'react';
import { Star, Calendar } from 'lucide-react';
import '../styles/MovieCard.css';

const MovieCard = ({ movie, onClick }) => {
  const imageUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';
  
  const year = movie.release_date ? movie.release_date.split('-')[0] : 'N/A';
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';

  return (
    <div className="movie-card" onClick={() => onClick(movie)}>
      <div className="movie-poster">
        <img src={imageUrl} alt={movie.title} />
        <div className="movie-overlay">
          <button className="view-details-btn">View Details</button>
        </div>
      </div>
      
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        
        <div className="movie-meta">
          <div className="movie-rating">
            <Star size={16} fill="var(--star-yellow)" color="var(--star-yellow)" />
            <span>{rating}</span>
          </div>
          
          <div className="movie-year">
            <Calendar size={16} />
            <span>{year}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
