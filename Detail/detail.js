
$(document).ready(function() {

    if (document.referrer.includes('./Detail/detail.html')) {
        window.location.reload();
      }

// ------------------  POSTER ICONS TOGGLE start --------------------
    
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


$(document).ready(function() {

    const $watchListBtn = $('.btn-watchlist');
    
    $watchListBtn.click(function() {
        const $button = $(this);
        const $text = $button.find('.watchlist-text');
        
        if ($button.hasClass('watchlist-active')) {
        
            $button.removeClass('watchlist-active');
            $text.text('Add to Watchlist');
            $button.css('background-color', '#2196F3'); // Blue color
        } else {
          
            $button.addClass('watchlist-active');
            $text.text('Added to Watchlist');
            $button.css('background-color', '#f44336'); // Red color
        }
    });


    $watchListBtn.hover(
        function() {
         
            $(this).css('transform', 'translateY(-2px)');
        },
        function() {
         
            $(this).css('transform', 'translateY(0)');
        }
    );

});
// ------------------  WatchList icon ends --------------------
// ------------------  Light and Dark mode toggle --------------------




$('#checkbox').change(function() {
    if ($(this).is(':checked')) {
        $('body').addClass('dark-theme');
     
    } else {
        $('body').removeClass('dark-theme');
    
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
        event.preventDefault(); 

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
       
        fetch(`https://api.themoviedb.org/3/${contentType}/${contentId}?api_key=${apiKey}`)
            .then(response => response.json())
            .then(contentData => {
              
                $('.poster-image').attr('src', `https://image.tmdb.org/t/p/w500${contentData.poster_path}`);
                
          
                const title = contentData.title || contentData.name;
                const year = new Date(contentData.release_date || contentData.first_air_date).getFullYear();
                $('.title-text').text(title);
                $('.release-year').text(`(${year})`);
                
              
                $('.rating-value').text(contentData.vote_average.toFixed(1));
                
             
                const runtime = contentType === 'movie' ? 
                    `${contentData.runtime} min` : 
                    `${contentData.number_of_seasons} Season${contentData.number_of_seasons > 1 ? 's' : ''}`;
                $('.duration').text(runtime);
                $('.genre').text(contentData.genres.map(g => g.name).join(', '));
                $('.rating').text(`TMDb ${contentData.vote_average.toFixed(1)}`);
                
                
                $('.synopsis-text').text(contentData.overview);

               
                return fetch(`https://api.themoviedb.org/3/${contentType}/${contentId}/credits?api_key=${apiKey}`);
            })
            .then(response => response.json())
            .then(creditsData => {
              
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

          
                return fetch(`https://api.themoviedb.org/3/${contentType}/${contentId}/images?api_key=${apiKey}`);
            })
            .then(response => response.json())
            .then(imageData => {
              
                const screenshots = imageData.backdrops.slice(0, 4);
                screenshots.forEach((screenshot, index) => {
                    $(`.gallery-item:eq(${index}) img`).attr('src', 
                        `https://image.tmdb.org/t/p/w500${screenshot.file_path}`);
                });

               
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
          
                alert('Unable to load content details. Please try again later.');
            });
    } else {
    
        window.location.href = '../index.html';
    }

    
    $('.btn-watch').click(() => {
        
        alert('Watch feature coming soon!');
    });

    $('.btn-watchlist').click(function() {
        $(this).toggleClass('active');
        const text = $(this).find('.watchlist-text');
        text.text(text.text() === 'Add to Watchlist' ? 'Remove from Watchlist' : 'Add to Watchlist');
    });


// ------------------- Fetching MOVIES Ends -------------------










});


