import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";

import { auth, db } from "../firebase";
import Navbar from "../components/Navbar";
import MovieForm from "../components/MovieForm";
import MovieList from "../components/MovieList";
import FilterBar from "../components/FilterBar";

function Home({ user }) {
  const [movies, setMovies] = useState([]);
  const [filter, setFilter] = useState("all");

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

        <MovieForm user={user} setMovies={setMovies} />
        <FilterBar filter={filter} setFilter={setFilter} />
        <MovieList movies={filteredMovies} setMovies={setMovies} />
      </div>
    </div>
  );
}

export default Home;