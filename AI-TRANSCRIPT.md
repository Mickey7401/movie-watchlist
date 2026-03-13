# AI Development Transcript
Movie Watchlist Project

This document summarizes the key prompts I used while developing my Movie Watchlist application. I used AI as a coding assistant to help plan features, debug errors, and understand how to implement certain functionality with React and Firebase.

---

## Planning the Project Structure

Prompt:
I am building a Movie Watchlist web application using React. What components would make sense to organize the project?

AI Response Summary:
The AI suggested splitting the project into reusable components such as:
- MovieForm
- MovieList
- MovieCard
- Navbar
- FilterBar
and using pages like Home, Login, and Signup.

Outcome:
I used this structure to organize my React project so that each part of the UI had a clear responsibility.

---

## Planning Firestore Data Structure

Prompt:
I want to store movie watchlist items in Firebase Firestore. What fields should each movie document contain?

AI Response Summary:
The AI suggested storing movies as objects with fields such as:
- title
- rating
- notes
- watched
- userId
- createdAt

Outcome:
This structure allowed me to store user-specific movie lists and made it easier to filter and update movies later.

---

## Implementing Firebase Authentication

Prompt:
How do I add login and signup functionality to a React app using Firebase Authentication?

AI Response Summary:
The AI explained how to use Firebase Auth functions like:
- createUserWithEmailAndPassword
- signInWithEmailAndPassword
- signOut
and how to initialize Firebase in a separate config file.

Outcome:
I implemented Signup.jsx and Login.jsx pages and connected them to Firebase authentication.

---

## Creating Protected Routes

Prompt:
How can I prevent users from accessing my Home page if they are not logged in?

AI Response Summary:
The AI suggested creating a ProtectedRoute component that checks whether a user is authenticated and redirects them to the login page if not.

Outcome:
I implemented a ProtectedRoute component that wraps my Home page route so only authenticated users can access the watchlist.

---

## Debugging Firestore Data Loading

Prompt:
My Firestore query is returning data but React is throwing an error when I try to map over the results. What might be causing this?

AI Response Summary:
The AI explained that when returning an object from an arrow function inside `.map()`, the object needs to be wrapped in parentheses.

Outcome:
I fixed my code by changing:

querySnapshot.docs.map((doc) => {
  id: doc.id,
  ...doc.data()
})

to:

querySnapshot.docs.map((doc) => ({
  id: doc.id,
  ...doc.data()
}))

After this fix, my movies loaded correctly from Firestore.

---

## Implementing CRUD Operations

Prompt:
What is the best way to implement CRUD operations with Firebase Firestore in a React app?

AI Response Summary:
The AI explained the basic functions needed:
- addDoc() to create movies
- getDocs() to read movies
- updateDoc() to edit movies
- deleteDoc() to remove movies

Outcome:
I implemented these operations in the MovieForm and MovieCard components so users could add, edit, delete, and update movies.

---

## Implementing a Watched Toggle

Prompt:
How can I toggle a boolean field like "watched" in Firestore and update the React UI at the same time?

AI Response Summary:
The AI suggested updating the Firestore document with updateDoc() and then updating the local React state to keep the UI synchronized.

Outcome:
I implemented a "Mark as Watched / Unwatched" button in MovieCard.jsx.

---

## Adding Filtering Functionality

Prompt:
What is the best way to filter a list of movies in React based on watched or unwatched status?

AI Response Summary:
The AI suggested storing a filter state variable and using Array.filter() before rendering the movie list.

Outcome:
I added filter buttons (All, Watched, Unwatched) and filtered the movies before passing them to MovieList.

---

## Improving Layout and Styling

Prompt:
My React page layout looks very narrow and centered after creating the app with Vite. What could be causing this?

AI Response Summary:
The AI explained that the default Vite index.css uses flexbox to center the root element, which can cause layout issues.

Outcome:
I removed the default styles in index.css and created a simpler reset so my own App.css layout would work correctly.

---

## Final Testing

Prompt:
What things should I test before deploying a React + Firebase app?

AI Response Summary:
The AI recommended testing:
- signup/login/logout
- protected routes
- adding movies
- editing movies
- deleting movies
- filtering movies
- refreshing the page to ensure data persists

Outcome:
I tested each of these features locally before deploying the app to Netlify.