document.addEventListener('DOMContentLoaded',()=>
  {

  // Handle back button press
window.addEventListener('popstate', function(event) {
    // Reload the current page
    window.location.reload();
});

// Handle manual back button click (right-click -> back)
window.onbeforeunload = function() {
    // This will be triggered when navigating away from the page
    if (performance.navigation.type === 2) { // 2 indicates back/forward navigation
        window.location.reload();
    }
};

// For modern browsers, also listen to the pageshow event
window.addEventListener('pageshow', function(event) {
    // Check if the page is being shown from the back-forward cache (bfcache)
    if (event.persisted) {
        window.location.reload();
    }
});

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
const navTheme = document.querySelector('#navTheme');
const headText = document.querySelector('.headMovie');



navMovie.addEventListener('click',()=>
  {
      fetchAndDisplayMovies();
      headText.innerHTML='Movies';
      navPopup.style.display = 'none';
  })


  navTheme.addEventListener('click', () => {
      if (navTheme.innerHTML === 'Theme (Dark)') {
          navTheme.innerHTML = 'Theme (Light)';
          document.body.classList.add('dark-theme')
       
      } else {
          navTheme.innerHTML = 'Theme (Dark)';
          document.body.classList.remove('dark-theme')
  

      }
  });
// ------------------- TV-Show Toggle  Ends -------------------


//''''''''''''''''''''''''''''''''''''''''''''''''''''''''''' FETCHING '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''//
// ------------------- Fetching MOVIES start -------------------

const apiKey = '51354467638b2cadfa7c874868e4ac2e'; 
const movieNames = [
'Inception', 'Interstellar', 'The Huntsman: Winter\'s War', 'Ford v Ferrari', 'Predestination', 'Maze Runner: The Scorch Trials', 'Conjuring',
'The Batman', 'Zootopia', 'Moana', 'World War Z', 'The Pianist', 'The Revenant', 'Dune', 'Oppenheimer', 'Hacksaw Ridge', 'The Martian', 'Avatar','The Guilty',
'Catch Me If You Can']; 


function fetchAndDisplayMovies() {
movieNames.forEach((movieName, index) => {
  const imgElementId = `movie${index + 1}`; 
  const titleElementId = `movieTitle${index + 1}`; 
  const releaseDateElementId = `movieDate${index + 1}`; 
  const genreElementId = `movieGenre${index + 1}`;
  fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(movieName)}`)
    .then(response => response.json())
    .then(data => {
      if (data.results.length > 0) {
        const movieId = data.results[0].id; 
        
        fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`)
          .then(response => response.json())
          .then(movieData => {
            const posterUrl = movieData.poster_path; 
            const releaseDate = movieData.release_date; 
            const genres = movieData.genres.map(genre => genre.name).join(', '); 
       
            document.getElementById(imgElementId).src = `https://image.tmdb.org/t/p/w500${posterUrl}`;
          
            document.getElementById(titleElementId).innerHTML = movieName;
       
            document.getElementById(releaseDateElementId).innerHTML = `Released: ${releaseDate}`;
          
            document.getElementById(genreElementId).innerHTML = `Genre: ${genres}`;
     
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


window.onload = fetchAndDisplayMovies;




// // ------------------- Fetching Movies TMDB ends -------------------
// // ------------------- Fetching TV-SHOWS TMDB Starts -------------------
const tvShowNames = [
'Squid Game', 'The Silent Sea', 'Alice in Borderland', 'The Last of Us', 'I Am Robot', 'The Day of the Jackal', 'The Originals', 'From', 'Loki', 'Avatar: The Last Airbender',
'Alice in Wonderland', 'All of Us Are Dead', '3%', 'Black Mirror', 'Snowpiercer', 'The Platform', 'The Witcher', 'Stranger Things','Hijack' ,'Mind your language'
]; 

navTvshow.addEventListener('click',()=>
  {
      headText.innerHTML='TV-Shows';
      navPopup.style.display = 'none';
      

function fetchAndDisplayTvShowDetails(tvShowName, imgElementId, titleElementId, seasonsElementId, episodesElementId) {
  fetch(`https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${encodeURIComponent(tvShowName)}`)
    .then(response => response.json())
    .then(data => {
      if (data.results.length > 0) {
        const tvShowId = data.results[0].id;
        
        fetch(`https://api.themoviedb.org/3/tv/${tvShowId}?api_key=${apiKey}`)
          .then(response => response.json())
          .then(tvShowData => {
            const posterUrl = tvShowData.poster_path;
            const seasons = tvShowData.number_of_seasons;
            const episodes = tvShowData.number_of_episodes;
            
            const imgElement = document.getElementById(imgElementId);
            imgElement.src = `https://image.tmdb.org/t/p/w500${posterUrl}`;
            imgElement.setAttribute('data-content-id', tvShowId); 
            imgElement.setAttribute('data-content-type', 'tv');
            
            document.getElementById(titleElementId).innerHTML = tvShowName;
            document.getElementById(seasonsElementId).innerHTML = `Seasons: ${seasons}`;
            document.getElementById(episodesElementId).innerHTML = `Episodes in First Season: ${episodes}`;
          })
          .catch(error => console.error('Error fetching TV show details:', error));
      }
    })
    .catch(error => console.error('Error searching for TV show:', error));
}
      
     
      tvShowNames.forEach((tvShowName, index) => {
        const imgElementId = `movie${index + 1}`; 
        const titleElementId = `movieTitle${index + 1}`; 
        const seasonsElementId = `movieDate${index + 1}`; 
        const episodesElementId = `movieGenre${index + 1}`; 
        fetchAndDisplayTvShowDetails(tvShowName, imgElementId, titleElementId, seasonsElementId, episodesElementId);
      });
      

})

// ------------------- Fetching TV-SHOWS TMDB ends -------------------
//''''''''''''''''''''''''''''''''''''''''''''''''''''''''''' FETCHING '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''//

document.querySelectorAll('.postImg').forEach(poster => {
  poster.addEventListener('click', function() {
    const imgElement = this.querySelector('img');
    const contentId = imgElement.getAttribute('data-content-id') || imgElement.getAttribute('data-movie-id');
    const contentType = imgElement.getAttribute('data-content-type') || 'movie';
    
    if (contentId) {
      localStorage.setItem('selectedContentId', contentId);
      localStorage.setItem('selectedContentType', contentType);
      window.location.href = 'Detail/detail.html';
    }
  });
});






// ------------------- Search Button Toggle  starts -------------------

const allowedMovies = [
  'Inception', 'Interstellar', 'The Huntsman: Winter\'s War', 'The Guilty', 'Maze Runner', 'Maze Runner: The Scorch Trials', 'Maze Runner: The Death Cure',
  'The Batman', 'Zootopia', 'Moana', 'World War Z', 'The Pianist', 'The Revenant', 'Dune', 'Dune: Part Two', 'Hacksaw Ridge', 'The Martian', 'Avatar','Ford v Ferrari'
  ];

const allowedTvShows = [
  'Squid Game', 'The Silent Sea', 'Alice in Borderland', 'The Last of Us', 'I Am Robot', 'The Day of the Jackal', 'The Originals', 'From', 'Loki', 'Avatar',
  'Alice in Wonderland', 'All of Us Are Dead', '3%', 'Black Mirror', 'Snowpiercer', 'The Platform', 'The Witcher', 'Stranger Things'
  ]; 





  const searchIcon = document.querySelector('#searchIcon');
  const searchContainer = document.querySelector('#searchContainer');
  const searchInput = document.querySelector('#search-input');
  const searchResults = document.querySelector('#search-results');
  let currentContentType = 'movie';


  document.querySelector('#navMovie').addEventListener('click', () => {
      currentContentType = 'movie';
  });

  document.querySelector('#navTvshow').addEventListener('click', () => {
      currentContentType = 'tv';
  });

  
  searchIcon.addEventListener('click', () => {
      const isMobile = window.innerWidth <= 599;
      
      if (searchContainer.style.display === "none") {
          searchContainer.style.display = "block";
          searchInput.focus();
          
          if (isMobile) {
              searchIcon.style.display = 'none';
              // Clear search after 10 seconds on mobile
              setTimeout(() => {
                  if (searchInput.value === '') {
                      searchContainer.style.display = 'none';
                      searchIcon.style.display = 'block';
                  }
              }, 10000);
          }
      } else {
          searchContainer.style.display = "none";
          searchResults.style.display = "none";
          if (isMobile) {
              searchIcon.style.display = 'block';
          }
      }
  });

 
  let searchTimeout;
  searchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      const searchTerm = e.target.value.trim();

      if (searchTerm.length < 2) {
          searchResults.style.display = "none";
          return;
      }

      searchTimeout = setTimeout(() => {
          searchContent(searchTerm, currentContentType);
      }, 500);
  });

 
  document.addEventListener('click', (e) => {
      if (!searchContainer.contains(e.target) && !searchIcon.contains(e.target)) {
          searchContainer.style.display = "none";
          searchResults.style.display = "none";
          if (window.innerWidth <= 599) {
              searchIcon.style.display = 'block';
          }
      }
  });


  async function searchContent(query, type) {
      const apiKey = '51354467638b2cadfa7c874868e4ac2e';
      try {
          const response = await fetch(
              `https://api.themoviedb.org/3/search/${type}?api_key=${apiKey}&query=${encodeURIComponent(query)}`
          );
          const data = await response.json();
          
          if (data.results.length > 0) {
              displaySearchResults(data.results.slice(0, 5), type);
          } else {
              searchResults.innerHTML = '<div class="search-result-item">No results found</div>';
              searchResults.style.display = "block";
          }
      } catch (error) {
          console.error('Search error:', error);
          searchResults.innerHTML = '<div class="search-result-item">Error searching content</div>';
          searchResults.style.display = "block";
      }
  }

 
  function displaySearchResults(results, type) {
      searchResults.innerHTML = results.map(result => {
          const title = type === 'movie' ? result.title : result.name;
          const year = new Date(
              type === 'movie' ? result.release_date : result.first_air_date
          ).getFullYear();
          const posterPath = result.poster_path
              ? `https://image.tmdb.org/t/p/w92${result.poster_path}`
              : 'path_to_placeholder_image.jpg';

          return `
              <div class="search-result-item" data-id="${result.id}" data-type="${type}">
                  <img src="${posterPath}" alt="${title}" onerror="this.src='path_to_placeholder_image.jpg'">
                  <div class="search-result-info">
                      <div class="search-result-title">${title}</div>
                      <div class="search-result-year">${year || 'N/A'}</div>
                  </div>
              </div>
          `;
      }).join('');

      searchResults.style.display = "block";

      document.querySelectorAll('.search-result-item').forEach(item => {
          item.addEventListener('click', () => {
              const contentId = item.dataset.id;
              const contentType = item.dataset.type;
              
           
              localStorage.setItem('selectedContentId', contentId);
              localStorage.setItem('selectedContentType', contentType);
              window.location.href = 'Detail/detail.html';
          });
      });
  }
// ------------------- Search Button Toggle  Ends -------------------


























});