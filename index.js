// document.addEventListener('DOMContentLoaded', () => {
//     // Add this to your DOMContentLoaded event listener
//     if (document.referrer.includes('./Detail/detail.html')) {
//       window.location.reload();
//     }
  
//     // ------------------- navBar Toggle  starts -------------------
//     const navIcon = document.querySelector('#navIcon');
//     const navPopup = document.querySelector('#navPopup');
  
//     navIcon.addEventListener('click', () => {
//       if (navPopup.style.display === 'block') {
//         navPopup.style.display = 'none';
//       } else {
//         navPopup.style.display = 'block';
//       }
//     });
  
//     // ------------------- navBar Toggle  Ends -------------------
//     // ------------------- TV-Show  Starts -------------------
//     const navTvshow = document.querySelector('#navTvshow');
//     const navMovie = document.querySelector('#navMovie');
//     const navTheme = document.querySelector('#navTheme');
//     const headText = document.querySelector('.headMovie');
  
//     navMovie.addEventListener('click', () => {
//       fetchAndDisplayMovies();
//       headText.innerHTML = 'Movies';
//       navPopup.style.display = 'none';
//     });
  
//     navTheme.addEventListener('click', () => {
//       if (navTheme.innerHTML === 'Theme (Dark)') {
//         navTheme.innerHTML = 'Theme (Light)';
//         document.body.classList.add('dark-theme');
//       } else {
//         navTheme.innerHTML = 'Theme (Dark)';
//         document.body.classList.remove('dark-theme');
//       }
//     });
//     // ------------------- TV-Show Toggle  Ends -------------------
  
//     //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''' FETCHING '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''//
//     // ------------------- Fetching MOVIES start -------------------
  
//     const apiKey = '51354467638b2cadfa7c874868e4ac2e';
//     const movieNames = [
//       'Inception', 'Interstellar', 'The Huntsman: Winter\'s War', 'Ford v Ferrari', 'Predestination', 'Maze Runner: The Scorch Trials', 'Conjuring',
//       'The Batman', 'Zootopia', 'Moana', 'World War Z', 'The Pianist', 'The Revenant', 'Dune', 'Oppenheimer', 'Hacksaw Ridge', 'The Martian', 'Avatar', 'The Guilty',
//       'Catch Me If You Can'
//     ];
  
//     function fetchAndDisplayMovies() {
//       movieNames.forEach((movieName, index) => {
//         const imgElementId = `movie${index + 1}`;
//         const titleElementId = `movieTitle${index + 1}`;
//         const releaseDateElementId = `movieDate${index + 1}`;
//         const genreElementId = `movieGenre${index + 1}`;
//         fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(movieName)}`)
//           .then(response => response.json())
//           .then(data => {
//             if (data.results.length > 0) {
//               const movieId = data.results[0].id;
  
//               fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`)
//                 .then(response => response.json())
//                 .then(movieData => {
//                   const posterUrl = movieData.poster_path;
//                   const releaseDate = movieData.release_date;
//                   const genres = movieData.genres.map(genre => genre.name).join(', ');
  
//                   document.getElementById(imgElementId).src = `https://image.tmdb.org/t/p/w500${posterUrl}`;
//                   document.getElementById(titleElementId).innerHTML = movieName;
//                   document.getElementById(releaseDateElementId).innerHTML = `Released: ${releaseDate}`;
//                   document.getElementById(genreElementId).innerHTML = `Genre: ${genres}`;
//                   document.getElementById(imgElementId).setAttribute('data-movie-id', movieId);
//                 })
//                 .catch(error => console.error('Error fetching movie details:', error));
//             } else {
//               console.log('No results found for', movieName);
//             }
//           })
//           .catch(error => console.error('Error searching for movie:', error));
//       });
//     }
  
//     window.onload = fetchAndDisplayMovies;
  
//     // // ------------------- Fetching Movies TMDB ends -------------------
//     // // ------------------- Fetching TV-SHOWS TMDB Starts -------------------
//     const tvShowNames = [
//       'Squid Game', 'The Silent Sea', 'Alice in Borderland', 'The Last of Us', 'I Am Robot', 'The Day of the Jackal', 'The Originals', 'From', 'Loki', 'Avatar: The Last Airbender',
//       'Alice in Wonderland', 'All of Us Are Dead', '3%', 'Black Mirror', 'Snowpiercer', 'The Platform', 'The Witcher', 'Stranger Things', 'Hijack', 'Mind your language'
//     ];
  
//     navTvshow.addEventListener('click', () => {
//       headText.innerHTML = 'TV-Shows';
//       navPopup.style.display = 'none';
  
//       function fetchAndDisplayTvShowDetails(tvShowName, imgElementId, titleElementId, seasonsElementId, episodesElementId) {
//         fetch(`https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${encodeURIComponent(tvShowName)}`)
//           .then(response => response.json())
//           .then(data => {
//             if (data.results.length > 0) {
//               const tvShowId = data.results[0].id;
  
//               fetch(`https://api.themoviedb.org/3/tv/${tvShowId}?api_key=${apiKey}`)
//                 .then(response => response.json())
//                 .then(tvShowData => {
//                   const posterUrl = tvShowData.poster_path;
//                   const seasons = tvShowData.number_of_seasons;
//                   const episodes = tvShowData.number_of_episodes;
  
//                   const imgElement = document.getElementById(imgElementId);
//                   imgElement.src = `https://image.tmdb.org/t/p/w500${posterUrl}`;
//                   imgElement.setAttribute('data-content-id', tvShowId);
//                   imgElement.setAttribute('data-content-type', 'tv');
  
//                   document.getElementById(titleElementId).innerHTML = tvShowName;
//                   document.getElementById(seasonsElementId).innerHTML = `Seasons: ${seasons}`;
//                   document.getElementById(episodesElementId).innerHTML = `Episodes in First Season: ${episodes}`;
//                 })
//                 .catch(error => console.error('Error fetching TV show details:', error));
//             }
//           })
//           .catch(error => console.error('Error searching for TV show:', error));
//       }
  
//       tvShowNames.forEach((tvShowName, index) => {
//         const imgElementId = `movie${index + 1}`;
//         const titleElementId = `movieTitle${index + 1}`;
//         const seasonsElementId = `movieDate${index + 1}`;
//         const episodesElementId = `movieGenre${index + 1}`;
//         fetchAndDisplayTvShowDetails(tvShowName, imgElementId, titleElementId, seasonsElementId, episodesElementId);
//       });
//     });
  
//     // ------------------- Fetching TV-SHOWS TMDB ends -------------------
//     //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''' FETCHING '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''//
  
//     document.querySelectorAll('.postImg').forEach(poster => {
//       poster.addEventListener('click', function () {
//         const imgElement = this.querySelector('img');
//         const contentId = imgElement.getAttribute('data-content-id') || imgElement.getAttribute('data-movie-id');
//         const contentType = imgElement.getAttribute('data-content-type') || 'movie';
  
//         if (contentId) {
//           localStorage.setItem('selectedContentId', contentId);
//           localStorage.setItem('selectedContentType', contentType);
//           window.location.href = 'Detail/detail.html';
//         }
//       });
//     });
  
//     // ------------------- Search Button Toggle  starts -------------------
  
//     const allowedMovies = [
//       'Inception', 'Interstellar', 'The Huntsman: Winter\'s War', 'The Guilty', 'Maze Runner', 'Maze Runner: The Scorch Trials', 'Maze Runner: The Death Cure',
//       'The Batman', 'Zootopia', 'Moana', 'World War Z', 'The Pianist', 'The Revenant', 'Dune', 'Dune: Part Two', 'Hacksaw Ridge', 'The Martian', 'Avatar', 'Ford v Ferrari'
//     ];
  
//     const allowedTvShows = [
//       'Squid Game', 'The Silent Sea', 'Alice in Borderland', 'The Last of Us', 'I Am Robot', 'The Day of the Jackal', 'The Originals', 'From', 'Loki', 'Avatar',
//       'Alice in Wonderland', 'All of Us Are Dead', '3%', 'Black Mirror', 'Snowpiercer', 'The Platform', 'The Witcher', 'Stranger Things'
//     ];
  
//     const searchIcon = document.querySelector('#searchIcon');
//     const searchContainer = document.querySelector('#searchContainer');
//     const searchInput = document.querySelector('#search-input');
//     const searchResults = document.querySelector('#search-results');
//     let currentContentType = 'movie';
  
//     document.querySelector('#navMovie').addEventListener('click', () => {
//       currentContentType = 'movie';
//     });
  
//     document.querySelector('#navTvshow').addEventListener('click', () => {
//       currentContentType = 'tv';
//     });
  
//     searchIcon.addEventListener('click', () => {
//       const isMobile = window.innerWidth <= 599;
  
//       if (searchContainer.style.display === "none") {
//         searchContainer.style.display = "block";
//         searchInput.focus();
  
//         if (isMobile) {
//           searchIcon.style.display = 'none';
//           // Clear search after 10 seconds on mobile
//           setTimeout(() => {
//             if (searchInput.value === '') {
//               searchContainer.style.display = 'none';
//               searchIcon.style.display = 'block';
//             }
//           }, 10000);
//         }
//       } else {
//         searchContainer.style.display = "none";
//         searchResults.style.display = "none";
//         if (isMobile) {
//           searchIcon.style.display = 'block';
//         }
//       }
//     });
  
//     let searchTimeout;
//     searchInput.addEventListener('input', (e) => {
//       clearTimeout(searchTimeout);
//       const searchTerm = e.target.value.trim();
  
//       if (searchTerm.length < 2) {
//         searchResults.style.display = "none";
//         return;
//       }
  
//       searchTimeout = setTimeout(() => {
//         searchContent(searchTerm, currentContentType);
//       }, 500);
//     });
  
//     document.addEventListener('click', (e) => {
//       if (!searchContainer.contains(e.target) && !searchIcon.contains(e.target)) {
//         searchContainer.style.display = "none";
//         searchResults.style.display = "none";
//         if (window.innerWidth <= 599) {
//           searchIcon.style.display = 'block';
//         }
//       }
//     });
  
//     async function searchContent(query, type) {
//       const apiKey = '51354467638b2cadfa7c874868e4ac2e';
//       try {
//         const response = await fetch(
//           `https://api.themoviedb.org/3/search/${type}?api_key=${apiKey}&query=${encodeURIComponent(query)}`
//         );
//         const data = await response.json();
  
//         if (data.results.length > 0) {
//           displaySearchResults(data.results.slice(0, 5), type);
//         } else {
//           searchResults.innerHTML = '<div class="search-result-item">No results found</div>';
//           searchResults.style.display = "block";
//         }
//       } catch (error) {
//         console.error('Search error:', error);
//         searchResults.innerHTML = '<div class="search-result-item">Error searching content</div>';
//         searchResults.style.display = "block";
//       }
//     }
  
//     function displaySearchResults(results, type) {
//       searchResults.innerHTML = results.map(result => {
//         const title = type === 'movie' ? result.title : result.name;
//         const year = new Date(
//           type === 'movie' ? result.release_date : result.first_air_date
//         ).getFullYear();
//         const posterPath = result.poster_path
//           ? `https://image.tmdb.org/t/p/w92${result.poster_path}`
//           : 'path_to_placeholder_image.jpg';
  
//         return `
//                 <div class="search-result-item" data-id="${result.id}" data-type="${type}">
//                     <img src="${posterPath}" alt="${title}" onerror="this.src='path_to_placeholder_image.jpg'">
//                     <div class="search-result-info">
//                         <div class="search-result-title">${title}</div>
//                         <div class="search-result-year">${year || 'N/A'}</div>
//                     </div>
//                 </div>
//             `;
//       }).join('');
  
//       searchResults.style.display = "block";
  
//       document.querySelectorAll('.search-result-item').forEach(item => {
//         item.addEventListener('click', () => {
//           const contentId = item.dataset.id;
//           const contentType = item.dataset.type;
  
//           localStorage.setItem('selectedContentId', contentId);
//           localStorage.setItem('selectedContentType', contentType);
//           window.location.href = 'Detail/detail.html';
//         });
//       });
//     }
//     // ------------------- Search Button Toggle  Ends -------------------
  
//   });

//   =========================================================================================================================================










document.addEventListener('DOMContentLoaded', () => {
    // ... (keep existing navBar Toggle code) ...
        // ------------------- navBar Toggle  starts -------------------
        const navIcon = document.querySelector('#navIcon');
        const navPopup = document.querySelector('#navPopup');
      
        navIcon.addEventListener('click', () => {
          if (navPopup.style.display === 'block') {
            navPopup.style.display = 'none';
          } else {
            navPopup.style.display = 'block';
          }
        });
      
        // ------------------- navBar Toggle  Ends -------------------
  
    // ------------------- TV-Show  Starts -------------------
    const navTvshow = document.querySelector('#navTvshow');
    const navMovie = document.querySelector('#navMovie');
    const navTheme = document.querySelector('#navTheme');
    const headText = document.querySelector('.headMovie');
  
    navMovie.addEventListener('click', () => {
      fetchAndDisplayMovies();
      headText.innerHTML = 'Movies';
      navPopup.style.display = 'none';
      // Clear existing content type attributes
      document.querySelectorAll('.postImg img').forEach(img => {
        img.removeAttribute('data-content-type');
        img.removeAttribute('data-content-id');
      });
    });
  
    
    // ... (keep existing theme toggle code) ...
      
    navTheme.addEventListener('click', () => {
        if (navTheme.innerHTML === 'Theme (Dark)') {
          navTheme.innerHTML = 'Theme (Light)';
          document.body.classList.add('dark-theme');
        } else {
          navTheme.innerHTML = 'Theme (Dark)';
          document.body.classList.remove('dark-theme');
        }
      });
      // ------------------- TV-Show Toggle  Ends -------------------
    
      //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''' FETCHING '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''//
      // ------------------- Fetching MOVIES start -------------------
    
      const apiKey = '51354467638b2cadfa7c874868e4ac2e';
      const movieNames = [
        'Inception', 'Interstellar', 'The Huntsman: Winter\'s War', 'Ford v Ferrari', 'Predestination', 'Maze Runner: The Scorch Trials', 'Conjuring',
        'The Batman', 'Zootopia', 'Moana', 'World War Z', 'The Pianist', 'The Revenant', 'Dune', 'Oppenheimer', 'Hacksaw Ridge', 'The Martian', 'Avatar', 'The Guilty',
        'Catch Me If You Can'
      ];
    
  
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
  
                  const imgElement = document.getElementById(imgElementId);
                  imgElement.src = `https://image.tmdb.org/t/p/w500${posterUrl}`;
                  // Explicitly set movie type and ID
                  imgElement.setAttribute('data-content-type', 'movie');
                  imgElement.setAttribute('data-content-id', movieId);
                  
                  document.getElementById(titleElementId).innerHTML = movieName;
                  document.getElementById(releaseDateElementId).innerHTML = `Released: ${releaseDate}`;
                  document.getElementById(genreElementId).innerHTML = `Genre: ${genres}`;
                })
                .catch(error => console.error('Error fetching movie details:', error));
            }
          })
          .catch(error => console.error('Error searching for movie:', error));
      });
    }
  
    navTvshow.addEventListener('click', () => {
      headText.innerHTML = 'TV-Shows';
      navPopup.style.display = 'none';
      // Clear existing content type attributes
      document.querySelectorAll('.postImg img').forEach(img => {
        img.removeAttribute('data-content-type');
        img.removeAttribute('data-content-id');
      });
  
      tvShowNames.forEach((tvShowName, index) => {
        const imgElementId = `movie${index + 1}`;
        const titleElementId = `movieTitle${index + 1}`;
        const seasonsElementId = `movieDate${index + 1}`;
        const episodesElementId = `movieGenre${index + 1}`;
        fetchAndDisplayTvShowDetails(tvShowName, imgElementId, titleElementId, seasonsElementId, episodesElementId);
      });
    });
    
       // // ------------------- Fetching Movies TMDB ends -------------------
    // // ------------------- Fetching TV-SHOWS TMDB Starts -------------------
   const tvShowNames = [
      'Squid Game', 'The Silent Sea', 'Alice in Borderland', 'The Last of Us', 'I Am Robot', 'The Day of the Jackal', 'The Originals', 'From', 'Loki', 'Avatar: The Last Airbender',
      'Alice in Wonderland', 'All of Us Are Dead', '3%', 'Black Mirror', 'Snowpiercer', 'The Platform', 'The Witcher', 'Stranger Things', 'Hijack', 'Mind your language'
    ];
  
//     navTvshow.addEventListener('click', () => {
    //    headText.innerHTML = 'TV-Shows';
//       navPopup.style.display = 'none';
  

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
                // Explicitly set TV show type and ID
                imgElement.setAttribute('data-content-type', 'tv');
                imgElement.setAttribute('data-content-id', tvShowId);
  
                document.getElementById(titleElementId).innerHTML = tvShowName;
                document.getElementById(seasonsElementId).innerHTML = `Seasons: ${seasons}`;
                document.getElementById(episodesElementId).innerHTML = `Episodes in First Season: ${episodes}`;
              })
              .catch(error => console.error('Error fetching TV show details:', error));
          }
        })
        .catch(error => console.error('Error searching for TV show:', error));
    }
  
    // Initialize with movies on page load
    window.onload = () => {
      fetchAndDisplayMovies();
      // Ensure all images start with movie content type
      document.querySelectorAll('.postImg img').forEach(img => {
        img.setAttribute('data-content-type', 'movie');
      });
    };
  
    // Update click handler to use current attributes
    document.querySelectorAll('.postImg').forEach(poster => {
      poster.addEventListener('click', function() {
        const imgElement = this.querySelector('img');
        const contentId = imgElement.getAttribute('data-content-id');
        const contentType = imgElement.getAttribute('data-content-type');
  
        if (contentId && contentType) {
          localStorage.setItem('selectedContentId', contentId);
          localStorage.setItem('selectedContentType', contentType);
          window.location.href = 'Detail/detail.html';
        }
      });
    });
   //''''''''''''''''''''''''''''''''''''''''''''''''''''''''''' FETCHING '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''//
  
    // ------------------- Search Button Toggle  starts -------------------
  
    const allowedMovies = [
      'Inception', 'Interstellar', 'The Huntsman: Winter\'s War', 'The Guilty', 'Maze Runner', 'Maze Runner: The Scorch Trials', 'Maze Runner: The Death Cure',
      'The Batman', 'Zootopia', 'Moana', 'World War Z', 'The Pianist', 'The Revenant', 'Dune', 'Dune: Part Two', 'Hacksaw Ridge', 'The Martian', 'Avatar', 'Ford v Ferrari'
    ];
  
    const allowedTvShows = [
      'Squid Game', 'The Silent Sea', 'Alice in Borderland', 'The Last of Us', 'I Am Robot', 'The Day of the Jackal', 'The Originals', 'From', 'Loki', 'Avatar',
      'Alice in Wonderland', 'All of Us Are Dead', '3%', 'Black Mirror', 'Snowpiercer', 'The Platform', 'The Witcher', 'Stranger Things'
    ];
  
      
        // ------------------- Search Functionality Start -------------------
        const searchIcon = document.querySelector('#searchIcon');
        const searchContainer = document.querySelector('#searchContainer');
        const searchInput = document.querySelector('#search-input');
        
        // Create search results container if it doesn't exist
        let searchResults = document.querySelector('#search-results');
        if (!searchResults) {
          searchResults = document.createElement('div');
          searchResults.id = 'search-results';
          searchResults.className = 'search-results';
          searchContainer.appendChild(searchResults);
        }
      
        // Track current content type
        let currentContentType = 'movie';
      
        // Update content type when switching between movies and TV shows
        navMovie.addEventListener('click', () => {
          currentContentType = 'movie';
        });
      
        navTvshow.addEventListener('click', () => {
          currentContentType = 'tv';
        });
      
        // Toggle search bar visibility
        searchIcon.addEventListener('click', () => {
          const isMobile = window.innerWidth <= 599;
      
          if (searchContainer.style.display === "none") {
            searchContainer.style.display = "block";
            searchInput.focus();
            
            if (isMobile) {
              searchIcon.style.display = 'none';
            }
          } else {
            searchContainer.style.display = "none";
            searchResults.style.display = "none";
            if (isMobile) {
              searchIcon.style.display = 'block';
            }
            searchInput.value = ''; // Clear search input when closing
          }
        });
      
        // Handle search input
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
      
        // Close search when clicking outside
        document.addEventListener('click', (e) => {
          if (!searchContainer.contains(e.target) && !searchIcon.contains(e.target)) {
            searchContainer.style.display = "none";
            searchResults.style.display = "none";
            if (window.innerWidth <= 599) {
              searchIcon.style.display = 'block';
            }
          }
        });
      
        // Search content function
        async function searchContent(query, type) {
          const apiKey = '51354467638b2cadfa7c874868e4ac2e';
          try {
            const response = await fetch(
              `https://api.themoviedb.org/3/search/${type}?api_key=${apiKey}&query=${encodeURIComponent(query)}`
            );
            const data = await response.json();
      
            if (data.results && data.results.length > 0) {
              displaySearchResults(data.results.slice(0, 5), type);
            } else {
              searchResults.innerHTML = '<div class="no-results">No results found</div>';
              searchResults.style.display = "block";
            }
          } catch (error) {
            console.error('Search error:', error);
            searchResults.innerHTML = '<div class="error-message">Error searching content</div>';
            searchResults.style.display = "block";
          }
        }
      
        // Display search results
        function displaySearchResults(results, type) {
          searchResults.innerHTML = results.map(result => {
            const title = type === 'movie' ? result.title : result.name;
            const releaseDate = type === 'movie' ? result.release_date : result.first_air_date;
            const year = releaseDate ? new Date(releaseDate).getFullYear() : 'N/A';
            const posterPath = result.poster_path
              ? `https://image.tmdb.org/t/p/w92${result.poster_path}`
              : '/api/placeholder/92/138';
      
            return `
              <div class="search-result-item" data-id="${result.id}" data-type="${type}">
                <img src="${posterPath}" alt="${title}" class="result-poster">
                <div class="result-info">
                  <div class="result-title">${title}</div>
                  <div class="result-year">${year}</div>
                </div>
              </div>
            `;
          }).join('');
      
          searchResults.style.display = "block";
      
          // Add click handlers to search results
          document.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('click', () => {
              const contentId = item.dataset.id;
              const contentType = item.dataset.type;
      
              if (contentId && contentType) {
                localStorage.setItem('selectedContentId', contentId);
                localStorage.setItem('selectedContentType', contentType);
                window.location.href = 'Detail/detail.html';
              }
            });
          });
        }
        // ------------------- Search Functionality End -------------------
  
    // ------------------- Search Button Toggle  Ends -------------------
  


  });