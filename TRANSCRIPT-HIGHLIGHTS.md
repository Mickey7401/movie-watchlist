# Transcript Highlights

### 1. Planning the data model
Early in the project I used AI to help plan how movie data should be stored in Firestore. We discussed what fields should exist for each movie, such as title, rating, notes, watched status, and userId so that each user only sees their own data.

### 2. Debugging Firestore data loading
When I first tried loading movies from Firestore, I had an issue with the `.map()` function when converting the query results into movie objects. After discussing the error with AI, I corrected the syntax by wrapping the returned object in parentheses.

### 3. Implementing authentication
AI helped guide the setup of Firebase authentication. I implemented signup, login, logout, and protected routes so that only logged-in users can access the movie watchlist page.

### 4. Adding CRUD functionality
The core functionality of the project involved creating, reading, updating, and deleting movie records. AI helped structure the Firestore queries and update functions to keep the UI synchronized with the database.

### 5. Improving UI and filtering
Later in the project I added filtering options to show watched and unwatched movies. AI helped plan how to store filter state and apply the filtering logic before rendering the movie list.