import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

function MovieForm({ user, setMovies }) {
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter a movie title");
      return;
    }

    const newMovie = {
      title,
      rating,
      notes,
      watched: false,
      userId: user.uid,
      createdAt: Date.now()
    };

    try {
      const docRef = await addDoc(collection(db, "movies"), newMovie);

      setMovies((prevMovies) => [
        ...prevMovies,
        { id: docRef.id, ...newMovie }
      ]);

      setTitle("");
      setRating("");
      setNotes("");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form className="movie-form" onSubmit={handleSubmit}>
      <h2>Add a Movie</h2>

      <input
        type="text"
        placeholder="Movie title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="Rating"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      />

      <textarea
        placeholder="Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      <button type="submit">Add Movie</button>
    </form>
  );
}

export default MovieForm;