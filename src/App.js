import React, { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash.debounce';
import MovieCard from './MovieCard';
import SearchIcon from './search.svg';
import './App.css';
import { fetchMovies } from './api';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    searchMovies('Batman');
  }, []);

  const searchMovies = useCallback(
    debounce(async (title) => {
      setLoading(true);
      try {
        const data = await fetchMovies(title);
        setMovies(data.Search);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    }, 500),
    []
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    searchMovies(e.target.value);
  };

  return (
    <div className="app">
      <h1>MovieLand</h1>
      <div className="search">
        <input
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search for movies"
          aria-label="Search for movies"
        />
        <img
          src={SearchIcon}
          alt="search icon"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>
      {loading && <div className="loading">Loading...</div>}
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.imdbID} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;

