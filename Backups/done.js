document.addEventListener('DOMContentLoaded',()=>
    {
  
    
  
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
  // const imgPoster = document.querySelectorAll('.postImg'); 
  
  // imgPoster.forEach(img => {
  // img.addEventListener('click', () => {
  // //   const movieId = img.getAttribute('data-movie-id');
  // //   const tvShowId = img.getAttribute('data-tvshow-id');
  // //   if (movieId) {
  // //     window.location.href = `Detail/detail.html?type=movie&id=${movieId}`;
  // //   } else if (tvShowId) {
  // //     window.location.href = `Detail/detail.html?type=tv&id=${tvShowId}`;
  // //   }
  // window.location.href='Detail/detail.html';
  
  // });
  // });
  
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
        // In index.js, modify the fetchAndDisplayTvShowDetails function:
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
              imgElement.setAttribute('data-content-id', tvShowId); // Change from data-movie-id
              imgElement.setAttribute('data-content-type', 'tv'); // Add content type attribute
              
              document.getElementById(titleElementId).innerHTML = tvShowName;
              document.getElementById(seasonsElementId).innerHTML = `Seasons: ${seasons}`;
              document.getElementById(episodesElementId).innerHTML = `Episodes in First Season: ${episodes}`;
            })
            .catch(error => console.error('Error fetching TV show details:', error));
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
  // Replace the existing click handler at the bottom of index.js with:
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
    'The Batman', 'Zootopia', 'Moana', 'World War Z', 'The Pianist', 'The Revenant', 'Dune', 'Dune: Part Two', 'Hacksaw Ridge', 'The Martian', 'Avatar'
    ];
  
  const allowedTvShows = [
    'Squid Game', 'The Silent Sea', 'Alice in Borderland', 'The Last of Us', 'I Am Robot', 'The Day of the Jackal', 'The Originals', 'From', 'Loki', 'Avatar',
    'Alice in Wonderland', 'All of Us Are Dead', '3%', 'Black Mirror', 'Snowpiercer', 'The Platform', 'The Witcher', 'Stranger Things'
    ]; 
  
  
  
  
    const searchIcon = document.querySelector('#searchIcon');
    const searchContainer = document.querySelector('#searchContainer');
    const searchInput = document.querySelector('#search-input');
    const searchResults = document.querySelector('#search-results');
    let currentContentType = 'movie'; // Default to movie, will be updated when switching sections
    
    // Update currentContentType when switching sections
    document.querySelector('#navMovie').addEventListener('click', () => {
        currentContentType = 'movie';
    });
    
    document.querySelector('#navTvshow').addEventListener('click', () => {
        currentContentType = 'tv';
    });
    
    // Search icon click handler
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
    
    // Search functionality
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
    
    // Close search results when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchContainer.contains(e.target) && !searchIcon.contains(e.target)) {
            searchContainer.style.display = "none";
            searchResults.style.display = "none";
            if (window.innerWidth <= 599) {
                searchIcon.style.display = 'block';
            }
        }
    });
    
    // Search function
    async function searchContent(query, type) {
        const apiKey = '51354467638b2cadfa7c874868e4ac2';
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/search/${type}?api_key=${apiKey}&query=${encodeURIComponent(query)}`
            );
            const data = await response.json();
            
            // Filter results based on allowed list
            const filteredResults = data.results.filter(result => {
                const title = type === 'movie' ? result.title : result.name;
                if (type === 'movie') {
                    return allowedMovies.includes(title);
                } else {
                    return allowedTvShows.includes(title);
                }
            });
    
            if (filteredResults.length > 0) {
                displaySearchResults(filteredResults.slice(0, 5), type);
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
    
    // Display search results
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
    
        // Add click handlers to results
        document.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('click', () => {
                const contentId = item.dataset.id;
                const contentType = item.dataset.type;
                
                // Store content info and redirect
                localStorage.setItem('selectedContentId', contentId);
                localStorage.setItem('selectedContentType', contentType);
                window.location.href = 'Detail/detail.html';
            });
        });
    }
    
  // ------------------- Search Button Toggle  Ends -------------------
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  });