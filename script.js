const apiKey = '7caedddcc34def4819eea644fa0e55a2';
let favorites = [];

document.addEventListener('DOMContentLoaded', function() {
  const searchForm = document.getElementById('search-form');
  const favoritesButton = document.getElementById('favorites-button');
  const favoritesList = document.getElementById('favorites-list');
  const closeModalButton = document.getElementById('close-modal-button');

  if (searchForm) {
    searchForm.addEventListener('submit', handleSearch);
  }

  if (favoritesButton) {
    favoritesButton.addEventListener('click', toggleFavorites);
  }

  if (favoritesList) {
    favoritesList.addEventListener('click', handleFavoriteClick);
  }

  if (closeModalButton) {
    closeModalButton.addEventListener('click', closeModal);
  }
});

function handleSearch(event) {
  event.preventDefault();
  const searchTerm = document.getElementById('search-input').value;
  searchMovies(searchTerm);
}

function searchMovies(searchTerm) {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const movies = data.results;
      const movieResults = document.getElementById('movie-results');
      movieResults.innerHTML = '';

      movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');

        const movieImage = document.createElement('img');
        movieImage.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        movieImage.alt = movie.title;

        const favoriteButton = document.createElement('button');
        favoriteButton.innerHTML = '&#9734;';
        favoriteButton.classList.add('favorite-button');
        favoriteButton.addEventListener('click', () => addToFavorites(movie));

        movieCard.appendChild(movieImage);
        movieCard.appendChild(favoriteButton);
        movieResults.appendChild(movieCard);
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function toggleFavorites() {
  const favoritesList = document.getElementById('favorites-list');
  favoritesList.classList.toggle('show');
}

function addToFavorites(movie) {
  favorites.push(movie);
  renderFavorites();
}

function renderFavorites() {
  const favoritesList = document.getElementById('favorites-list');
  favoritesList.innerHTML = '';

  favorites.forEach(movie => {
    const favoriteItem = document.createElement('div');
    favoriteItem.classList.add('favorite-item');

    const movieImage = document.createElement('img');
    movieImage.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    movieImage.alt = movie.title;

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '&times;';
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', () => deleteFromFavorites(movie));

    favoriteItem.appendChild(movieImage);
    favoriteItem.appendChild(deleteButton);
    favoritesList.appendChild(favoriteItem);
  });
}

function deleteFromFavorites(movie) {
  favorites = favorites.filter(favorite => favorite.id !== movie.id);
  renderFavorites();
}

function handleFavoriteClick(event) {
  const target = event.target;
  if (target.classList.contains('favorite-item')) {
    const movie = favorites.find(favorite => favorite.id === movie.id);
    openModal(movie);
  }
}



function closeModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
}

// Rest of the code for fetching movie data, displaying results, etc.
