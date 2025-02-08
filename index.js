document.addEventListener('DOMContentLoaded',()=>
  {

  
// ------------------- Search Button Toggle  starts -------------------

const searchIcon = document.querySelector('#searchIcon');
const searchContainer = document.querySelector('#searchContainer');
const searchInput = document.querySelector('#search-input');

searchIcon.addEventListener('click', () => {
  if (window.innerWidth >= 600 && searchContainer.style.display === "none") {
      searchContainer.style.display = "block";
  } else if(window.innerWidth <= 599 ) {
      searchIcon.style.display='none'
      searchContainer.style.display='block'
      setTimeout(()=>
          {   
              searchIcon.style.display='block'
              searchContainer.style.display='none'
  
          },10000)
  }else
  {
      searchContainer.style.display='none'
  }
});


// ------------------- Search Button Toggle  Ends -------------------
// ------------------- navBar Toggle  starts -------------------
const navIcon = document.querySelector('#navIcon');
const navPopup = document.querySelector('#navPopup');

navIcon.addEventListener('click', () => 
  {
      if(navPopup.style.display === 'block')
          {
              navPopup.style.display = 'none';
          }else
          {
              navPopup.style.display = 'block';
          }
  })


// ------------------- navBar Toggle  Ends -------------------
// ------------------- TV-Show  Starts -------------------
const navTvshow = document.querySelector('#navTvshow');
const navMovie = document.querySelector('#navMovie');
const navFav = document.querySelector('#navFav');
const navTheme = document.querySelector('#navTheme');
const headText = document.querySelector('.headMovie');



navMovie.addEventListener('click',()=>
  {
      fetchAndDisplayMovies();
      headText.innerHTML='Movies';
      navPopup.style.display = 'none';
  })

navFav.addEventListener('click',()=>
  {
      headText.innerHTML='Favourites';
      navPopup.style.display = 'none';
  })

  navTheme.addEventListener('click', () => {
      if (navTheme.innerHTML === 'Theme (Dark)') {
          navTheme.innerHTML = 'Theme (Light)';
          document.body.classList.add('dark-theme')
          // localStorage.setItem('theme', 'dark');
      } else {
          navTheme.innerHTML = 'Theme (Dark)';
          document.body.classList.remove('dark-theme')
          // localStorage.setItem('theme', 'light');

      }
  });
// ------------------- TV-Show Toggle  Ends -------------------
// ------------------- PostImg Click reroute Starts -------------------
const imgPoster = document.querySelectorAll('.postImg'); 

imgPoster.forEach(img => {
img.addEventListener('click', () => {
//   const movieId = img.getAttribute('data-movie-id');
//   const tvShowId = img.getAttribute('data-tvshow-id');
//   if (movieId) {
//     window.location.href = `Detail/detail.html?type=movie&id=${movieId}`;
//   } else if (tvShowId) {
//     window.location.href = `Detail/detail.html?type=tv&id=${tvShowId}`;
//   }
window.location.href='Detail/detail.html';

});
});

// ------------------- PostImg Click reroute Ends -------------------




//''''''''''''''''''''''''''''''''''''''''''''''''''''''''''' FETCHING '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''//
// ------------------- Fetching MOVIES start -------------------

const apiKey = '51354467638b2cadfa7c874868e4ac2e'; // Your TMDb API key
const movieNames = [
'Inception', 'Interstellar', 'The Huntsman: Winter\'s War', 'The Guilty', 'Maze Runner', 'Maze Runner: The Scorch Trials', 'Maze Runner: The Death Cure',
'The Batman', 'Zootopia', 'Moana', 'World War Z', 'The Pianist', 'The Revenant', 'Dune', 'Dune: Part Two', 'Hacksaw Ridge', 'The Martian', 'Avatar'
]; // Array of movie names

// Function to fetch and display movie details
function fetchAndDisplayMovies() {
movieNames.forEach((movieName, index) => {
  const imgElementId = `movie${index + 1}`; // Assumes image elements have IDs like movie1, movie2, etc.
  const titleElementId = `movieTitle${index + 1}`; // Assumes title elements have IDs like movieTitle1, movieTitle2, etc.
  const releaseDateElementId = `movieDate${index + 1}`; // Assumes release date elements have IDs like releaseDate1, releaseDate2, etc.
  const genreElementId = `movieGenre${index + 1}`; // Assumes genre elements have IDs like genre1, genre2, etc.

  fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(movieName)}`)
    .then(response => response.json())
    .then(data => {
      if (data.results.length > 0) {
        const movieId = data.results[0].id; // Get the ID of the first search result

        // Fetch movie details using the movie ID
        fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`)
          .then(response => response.json())
          .then(movieData => {
            const posterUrl = movieData.poster_path; // Get the poster URL
            const releaseDate = movieData.release_date; // Get the release date
            const genres = movieData.genres.map(genre => genre.name).join(', '); // Get the genres as a comma-separated string
            // Set the poster image source
            document.getElementById(imgElementId).src = `https://image.tmdb.org/t/p/w500${posterUrl}`;
            // Set the movie title
            document.getElementById(titleElementId).innerHTML = movieName;
            // Set the release date
            document.getElementById(releaseDateElementId).innerHTML = `Released: ${releaseDate}`;
            // Set the genres
            document.getElementById(genreElementId).innerHTML = `Genre: ${genres}`;
            // Store the movie ID in the image element (we'll use this for the click event)
            document.getElementById(imgElementId).setAttribute('data-movie-id', movieId);
          })
          .catch(error => console.error('Error fetching movie details:', error));
      } else {
        console.log('No results found for', movieName);
      }
    })
    .catch(error => console.error('Error searching for movie:', error));
});
}

// Call fetchAndDisplayMovies on page load
window.onload = fetchAndDisplayMovies;




// // ------------------- Fetching Movies TMDB ends -------------------
// // ------------------- Fetching TV-SHOWS TMDB Starts -------------------
const tvShowNames = [
'Squid Game', 'The Silent Sea', 'Alice in Borderland', 'The Last of Us', 'I Am Robot', 'The Day of the Jackal', 'The Originals', 'From', 'Loki', 'Avatar',
'Alice in Wonderland', 'All of Us Are Dead', '3%', 'Black Mirror', 'Snowpiercer', 'The Platform', 'The Witcher', 'Stranger Things'
]; 

navTvshow.addEventListener('click',()=>
  {
      headText.innerHTML='TV-Shows';
      navPopup.style.display = 'none';
      
      // Function to fetch and display TV show details
      function fetchAndDisplayTvShowDetails(tvShowName, imgElementId, titleElementId, seasonsElementId, episodesElementId) {
        fetch(`https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${encodeURIComponent(tvShowName)}`)
          .then(response => response.json())
          .then(data => {
            if (data.results.length > 0) {
              const tvShowId = data.results[0].id; // Get the ID of the first search result
      
              // Fetch TV show details using the TV show ID
              fetch(`https://api.themoviedb.org/3/tv/${tvShowId}?api_key=${apiKey}`)
                .then(response => response.json())
                .then(tvShowData => {
                  const posterUrl = tvShowData.poster_path; // Get the poster URL
                  const seasons = tvShowData.number_of_seasons; // Get the number of seasons
                  const episodes = tvShowData.number_of_episodes; // Get the number of episodes in the first season
                  // Set the poster image source
                  document.getElementById(imgElementId).src = `https://image.tmdb.org/t/p/w500${posterUrl}`;
                  // Set the TV show title
                  document.getElementById(titleElementId).innerHTML = tvShowName;
                  // Set the number of seasons
                  document.getElementById(seasonsElementId).innerHTML = `Seasons: ${seasons}`;
                  // Set the number of episodes in the first season
                  document.getElementById(episodesElementId).innerHTML = `Episodes in First Season: ${episodes}`;
                })
                .catch(error => console.error('Error fetching TV show details:', error));
            } else {
              console.log('No results found for', tvShowName);
            }
          })
          .catch(error => console.error('Error searching for TV show:', error));
      }
      
      // Loop through the array of TV show names and fetch their details
      tvShowNames.forEach((tvShowName, index) => {
        const imgElementId = `movie${index + 1}`; // Assumes image elements have IDs like tvShow1, tvShow2, etc.
        const titleElementId = `movieTitle${index + 1}`; // Assumes title elements have IDs like tvShowTitle1, tvShowTitle2, etc.
        const seasonsElementId = `movieDate${index + 1}`; // Assumes seasons elements have IDs like seasons1, seasons2, etc.
        const episodesElementId = `movieGenre${index + 1}`; // Assumes episodes elements have IDs like episodes1, episodes2, etc.
        fetchAndDisplayTvShowDetails(tvShowName, imgElementId, titleElementId, seasonsElementId, episodesElementId);
      });
      

})

// ------------------- Fetching TV-SHOWS TMDB ends -------------------
//''''''''''''''''''''''''''''''''''''''''''''''''''''''''''' FETCHING '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''//
// Add event listeners for movie clicks
document.querySelectorAll('.postImg').forEach(poster => {
poster.addEventListener('click', function() {
  const contentId = this.querySelector('img').getAttribute('data-movie-id');
  const contentType = this.querySelector('img').id.startsWith('movie') ? 'movie' : 'tv'; // Determine content type from ID
  localStorage.setItem('selectedContentId', contentId); // Store the content ID in localStorage
  localStorage.setItem('selectedContentType', contentType); // Store the content type in localStorage
  window.location.href = 'Detail/detail.html'; // Redirect to detail.html
});
});





































})