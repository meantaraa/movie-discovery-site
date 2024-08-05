const API_URL = "http://www.omdbapi.com?apikey=b6003d8a";

export const fetchMovies = async (title) => {
  const response = await fetch(`${API_URL}&s=${title}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};
