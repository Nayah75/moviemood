import React, { useEffect, useState } from 'react';
import { X, Star, Calendar, Clock, Download, Play, Users, Award } from 'lucide-react';
import { tmdbApi } from '../services/tmdbApi';
import '../styles/MovieDetails.css';

const MovieDetails = ({ movie, onClose }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      const movieDetails = await tmdbApi.getMovieDetails(movie.id);
      setDetails(movieDetails);
      setLoading(false);
    };

    fetchDetails();
  }, [movie.id]);

  if (loading) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content loading-modal" onClick={(e) => e.stopPropagation()}>
          <p>Loading movie details...</p>
        </div>
      </div>
    );
  }

  if (!details) return null;

  const imageUrl = details.poster_path 
    ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  const backdropUrl = details.backdrop_path
    ? `https://image.tmdb.org/t/p/original${details.backdrop_path}`
    : null;

  const year = details.release_date ? details.release_date.split('-')[0] : 'N/A';
  const runtime = details.runtime ? `${details.runtime} min` : 'N/A';
  const rating = details.vote_average ? details.vote_average.toFixed(1) : 'N/A';
  const genres = details.genres?.map(g => g.name).join(', ') || 'N/A';

  const director = details.credits?.crew?.find(person => person.job === 'Director')?.name || 'N/A';
  const writer = details.credits?.crew?.find(person => person.job === 'Writer' || person.job === 'Screenplay')?.name || 'N/A';
  const cast = details.credits?.cast?.slice(0, 5).map(actor => actor.name).join(', ') || 'N/A';

  const trailer = details.videos?.results?.find(video => video.type === 'Trailer' && video.site === 'YouTube');
  const trailerUrl = trailer ? `https://www.youtube.com/embed/${trailer.key}` : null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="modal-header" style={backdropUrl ? { backgroundImage: `url(${backdropUrl})` } : {}}>
          <div className="header-overlay">
            <button className="back-to-browse-btn" onClick={onClose}>
              Back to Browse
            </button>
          </div>
        </div>

        <div className="modal-body">
          <div className="movie-details-grid">
            <div className="poster-section">
              <img src={imageUrl} alt={details.title} className="details-poster" />
            </div>

            <div className="info-section">
              <h1 className="movie-details-title">{details.title}</h1>
              
              <div className="movie-meta-info">
                <span className="genre-text">{genres}</span>
                <span className="separator">•</span>
                <span className="year-text">
                  <Calendar size={16} />
                  {year}
                </span>
                <span className="separator">•</span>
                <span className="runtime-text">
                  <Clock size={16} />
                  {runtime}
                </span>
              </div>

              <div className="rating-section">
                <Star size={20} fill="var(--star-yellow)" color="var(--star-yellow)" />
                <span className="rating-value">{rating}</span>
                <span className="rating-count">({details.vote_count} ratings)</span>
              </div>

              <div className="overview-section">
                <p className="overview-text">{details.overview || 'No description available.'}</p>
              </div>

              <div className="credits-section">
                <div className="credit-item">
                  <strong>Director:</strong>
                  <span>{director}</span>
                </div>
                <div className="credit-item">
                  <strong>Writer:</strong>
                  <span>{writer}</span>
                </div>
                <div className="credit-item">
                  <strong>Stars:</strong>
                  <span>{cast}</span>
                </div>
              </div>

              {trailerUrl && (
                <div className="trailer-section">
                  <h3>Trailer:</h3>
                  <div className="trailer-wrapper">
                    <iframe
                      src={trailerUrl}
                      title="Movie Trailer"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              )}

              <div className="download-section">
                <h3>Download Options:</h3>
                <div className="download-buttons">
                  <button className="download-btn">
                    <Download size={18} />
                    Download 720p
                  </button>
                  <button className="download-btn">
                    <Download size={18} />
                    Download 1080p
                  </button>
                  <button className="download-btn">
                    <Download size={18} />
                    Download 4K
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
