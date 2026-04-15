import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

import { auth, db } from "../firebase";
import Navbar from "../components/Navbar";
import MovieForm from "../components/MovieForm";
import MovieList from "../components/MovieList";
import FilterBar from "../components/FilterBar";

function Home({ user }) {
  const [movies, setMovies] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const q = query(
          collection(db, "movies"),
          where("userId", "==", user.uid)
        );

        const querySnapshot = await getDocs(q);
        const movieData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));

        setMovies(movieData);
      } catch (error) {
        alert(error.message);
      }
    };

    if (user) {
      fetchMovies();
    }
  }, [user]);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    setSearchLoading(true);
    setSearchError("");

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&query=${encodeURIComponent(searchTerm)}`
      );

      const data = await response.json();
      setSearchResults(data.results || []);
    } catch (error) {
      console.error(error);
      setSearchError("Failed to search movies.");
    } finally {
      setSearchLoading(false);
    }
  };

  const handleAddFromTMDb = async (movie) => {
    try {
      const newMovie = {
        title: movie.title,
        rating: movie.vote_average ? movie.vote_average.toString() : "",
        notes: movie.overview || "",
        watched: false,
        userId: user.uid,
        posterPath: movie.poster_path || "",
        releaseDate: movie.release_date || ""
      };

      const docRef = await addDoc(collection(db, "movies"), newMovie);

      setMovies((prevMovies) => [
        ...prevMovies,
        { id: docRef.id, ...newMovie }
      ]);
    } catch (error) {
      console.error(error);
      alert("Failed to add movie from TMDb.");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      alert(error.message);
    }
  };

  const filteredMovies = movies.filter((movie) => {
    if (filter === "watched") return movie.watched;
    if (filter === "unwatched") return !movie.watched;
    return true;
  });

  return (
    <div className="page">
      <Navbar />
      <div className="container">
        <h1>Movie Watchlist</h1>
        <p>Logged in as: {user.email}</p>
        <button onClick={handleLogout}>Logout</button>

        <div className="tmdb-search">
          <h2>Search Movies from TMDb</h2>

          <div className="tmdb-search-bar">
            <input
              type="text"
              placeholder="Search for a movie..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
          </div>

          {searchLoading && <p>Loading...</p>}
          {searchError && <p>{searchError}</p>}

          <div className="tmdb-results">
            {searchResults.map((movie) => (
              <div key={movie.id} className="tmdb-card">
                {movie.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.title}
                  />
                ) : (
                  <div className="tmdb-no-image">No Image</div>
                )}

                <h3>{movie.title}</h3>
                <p><strong>Release:</strong> {movie.release_date || "N/A"}</p>
                <p><strong>Rating:</strong> {movie.vote_average || "N/A"}</p>
                <p>{movie.overview || "No overview available."}</p>

                <button onClick={() => handleAddFromTMDb(movie)}>
                  Add to Watchlist
                </button>
              </div>
            ))}
          </div>
        </div>

        <MovieForm user={user} setMovies={setMovies} />
        <FilterBar filter={filter} setFilter={setFilter} />
        <MovieList movies={filteredMovies} setMovies={setMovies} />
      </div>
    </div>
  );
}

export default Home;