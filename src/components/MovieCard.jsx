import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

function MovieCard({ movie, setMovies }) {
  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "movies", movie.id));
      setMovies((prevMovies) =>
        prevMovies.filter((item) => item.id !== movie.id)
      );
    } catch (error) {
      alert(error.message);
    }
  };

  const handleToggleWatched = async () => {
    try {
      const movieRef = doc(db, "movies", movie.id);

      await updateDoc(movieRef, {
        watched: !movie.watched
      });

      setMovies((prevMovies) =>
        prevMovies.map((item) =>
          item.id === movie.id
            ? { ...item, watched: !item.watched }
            : item
        )
      );
    } catch (error) {
      alert(error.message);
    }
  };

  const handleEdit = async () => {
    const newTitle = prompt("Edit movie title:", movie.title);
    const newRating = prompt("Edit rating:", movie.rating);
    const newNotes = prompt("Edit notes:", movie.notes);

    if (!newTitle) return;

    try {
      const movieRef = doc(db, "movies", movie.id);

      await updateDoc(movieRef, {
        title: newTitle,
        rating: newRating,
        notes: newNotes
      });

      setMovies((prevMovies) =>
        prevMovies.map((item) =>
          item.id === movie.id
            ? {
                ...item,
                title: newTitle,
                rating: newRating,
                notes: newNotes
              }
            : item
        )
      );
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="movie-card">
      <h3>{movie.title}</h3>
      <p><strong>Rating:</strong> {movie.rating || "No rating"}</p>
      <p><strong>Notes:</strong> {movie.notes || "No notes"}</p>
      <p>
        <strong>Status:</strong> {movie.watched ? "Watched" : "Not Watched"}
      </p>

      <div className="movie-actions">
        <button onClick={handleToggleWatched}>
          Mark as {movie.watched ? "Unwatched" : "Watched"}
        </button>
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}

export default MovieCard;