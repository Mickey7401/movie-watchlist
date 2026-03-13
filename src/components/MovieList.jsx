import MovieCard from "./MovieCard";

function MovieList({ movies, setMovies }) {
  if (movies.length === 0) {
    return <p className="empty-text">No movies in your watchlist yet.</p>;
  }

  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} setMovies={setMovies} />
      ))}
    </div>
  );
}

export default MovieList;