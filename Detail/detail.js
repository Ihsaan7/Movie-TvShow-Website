
$(document).ready(function() {


// ------------------  POSTER ICONS TOGGLE start --------------------
// const $favIcon = $('#heart');
// $favIcon.click(() => 
//     {
//         $favIcon.toggleClass('active-color default-color')
//     });
    
const $starIcon = $('#star');
$starIcon.click(()=>
    {
        $starIcon.toggleClass('active-color default-color')
        if($starIcon.hasClass('active-color'))
            {

            }     
    })


// ------------------  POSTER ICONS TOGGLE ends --------------------
// ------------------  WatchList icon starts --------------------


const $watchListAdd = $('.btn-watchlist');
const $watchListText = $watchListAdd.find('.watchlist-text');

$watchListAdd.click(() => {
    if ($watchListText.text() === 'Add to Watchlist') {
        $watchListAdd.removeClass('watchlist-default-color').addClass('watchlist-active-color');
        $watchListText.text('Added!');
    } else {
        $watchListAdd.removeClass('watchlist-active-color').addClass('watchlist-default-color');
        $watchListText.text('Add to Watchlist');
    }
});
// ------------------  WatchList icon ends --------------------
// ------------------  Light and Dark mode toggle --------------------




$('#checkbox').change(function() {
    if ($(this).is(':checked')) {
        $('body').addClass('dark-theme');
        // localStorage.setItem('theme', 'dark');
    } else {
        $('body').removeClass('dark-theme');
        // localStorage.setItem('theme', 'light');
    }
});
// ------------------  WatchList icon ends --------------------
// ------------------  HelpFul-BTN and report-BTN eventLis starts --------------------

const $helpfulBtn = $('#btn-helpful');
$helpfulBtn.click(() => {
    if ($helpfulBtn.hasClass('active')) {
        $helpfulBtn.removeClass('active');
        $helpfulBtn.css(
            {
                'background-color': 'white',
                'color': 'black',
            });
    } else {
        $helpfulBtn.addClass('active');
        $helpfulBtn.css(
            {
                'background-color': '#6aa758',
                 'color': 'white',
            });
    }
});


const $reportBtn = $('#btn-report');
$reportBtn.click(()=>
    {
        if($reportBtn.hasClass('active'))
            {
                $reportBtn.removeClass('active')
                $reportBtn.css(
                    {
                        'background-color': 'white',
                        'color': 'black',
                    })
            }
            else
            {
                $reportBtn.addClass('active')
                $reportBtn.css(
                    {
                        'background-color': '#6aa758',
                        'color': 'white',
                    })
            }
    })

// ------------------  HelpFul-BTN report-BTN eventLis end --------------------
// ------------------  Review Add start --------------------



    const $Rating = $('#review-title');
    const $reviewSubBtn = $('#btn-submit-review');
    const $rateSpan = $('#rateSpan');
    const $reviewTyped = $('#review');
    const $reviewContent = $('#reviewContent');

    $('.review-form').submit((event) => {
        event.preventDefault(); // Prevent the form from submitting

        const rateInput = $Rating.val();
        const reviewShare = $reviewTyped.val();

        if (rateInput !== '' && reviewShare !== '') {
            $rateSpan.text(rateInput);
            $reviewContent.text(reviewShare);
        }
    });
// ------------------  Review Add end --------------------


//''''''''''''''''''''''''''''''''''''''''''''''''''''''''''' FETCHING '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''//
// ------------------- Fetching MOVIES start -------------------


    const contentId = localStorage.getItem('selectedContentId');
    const contentType = localStorage.getItem('selectedContentType');
    const apiKey = '51354467638b2cadfa7c874868e4ac2e';

    if (contentId && contentType) {
        // Fetch detailed content information
        fetch(`https://api.themoviedb.org/3/${contentType}/${contentId}?api_key=${apiKey}`)
            .then(response => response.json())
            .then(contentData => {
                // Update poster
                $('.poster-image').attr('src', `https://image.tmdb.org/t/p/w500${contentData.poster_path}`);
                
                // Update title and year
                const title = contentData.title || contentData.name;
                const year = new Date(contentData.release_date || contentData.first_air_date).getFullYear();
                $('.title-text').text(title);
                $('.release-year').text(`(${year})`);
                
                // Update rating
                $('.rating-value').text(contentData.vote_average.toFixed(1));
                
                // Update meta information
                const runtime = contentType === 'movie' ? 
                    `${contentData.runtime} min` : 
                    `${contentData.number_of_seasons} Season${contentData.number_of_seasons > 1 ? 's' : ''}`;
                $('.duration').text(runtime);
                $('.genre').text(contentData.genres.map(g => g.name).join(', '));
                $('.rating').text(`TMDb ${contentData.vote_average.toFixed(1)}`);
                
                // Update synopsis
                $('.synopsis-text').text(contentData.overview);

                // Fetch cast information
                return fetch(`https://api.themoviedb.org/3/${contentType}/${contentId}/credits?api_key=${apiKey}`);
            })
            .then(response => response.json())
            .then(creditsData => {
                // Update cast information
                const castHTML = creditsData.cast.slice(0, 6).map(actor => `
                    <div class="cast-member">
                        <img src="${actor.profile_path ? 
                            `https://image.tmdb.org/t/p/w185${actor.profile_path}` : 
                            '/api/placeholder/185/278'}" 
                            alt="${actor.name}" 
                            class="cast-photo">
                        <div class="cast-info">
                            <div class="cast-name">${actor.name}</div>
                            <div class="cast-character">${actor.character}</div>
                        </div>
                    </div>
                `).join('');
                
                $('.cast-scroll').html(castHTML);

                // Fetch screenshots/images
                return fetch(`https://api.themoviedb.org/3/${contentType}/${contentId}/images?api_key=${apiKey}`);
            })
            .then(response => response.json())
            .then(imageData => {
                // Update screenshots gallery
                const screenshots = imageData.backdrops.slice(0, 4);
                screenshots.forEach((screenshot, index) => {
                    $(`.gallery-item:eq(${index}) img`).attr('src', 
                        `https://image.tmdb.org/t/p/w500${screenshot.file_path}`);
                });

                // Add trailer button functionality
                return fetch(`https://api.themoviedb.org/3/${contentType}/${contentId}/videos?api_key=${apiKey}`);
            })
            .then(response => response.json())
            .then(videoData => {
                const trailer = videoData.results.find(video => 
                    video.type === 'Trailer' && video.site === 'YouTube');
                
                if (trailer) {
                    $('.btn-trailer').click(() => {
                        window.open(`https://www.youtube.com/watch?v=${trailer.key}`, '_blank');
                    });
                } else {
                    $('.btn-trailer').prop('disabled', true);
                }
            })
            .catch(error => {
                console.error('Error fetching content details:', error);
                // Handle error gracefully
                alert('Unable to load content details. Please try again later.');
            });
    } else {
        // Handle case when no content is selected
        window.location.href = '../index.html';
    }

    // Add event listeners for buttons
    $('.btn-watch').click(() => {
        // Implement watch functionality
        alert('Watch feature coming soon!');
    });

    $('.btn-watchlist').click(function() {
        $(this).toggleClass('active');
        const text = $(this).find('.watchlist-text');
        text.text(text.text() === 'Add to Watchlist' ? 'Remove from Watchlist' : 'Add to Watchlist');
    });


// ------------------- Fetching MOVIES Ends -------------------














});


