$(document).ready(function() {
    $('#ss').change(() => {
        // console.log($('select#ss').val());
        var lbl = $('select#ss option:selected').text();

        if (lbl == "Genres") {
            $("#movieLabel").html('');
        } else {
            $("#movieLabel").html(lbl);
        }
        getMovieByGenre($('select#ss').val());

    });

    var apiBaseURL = 'https://api.themoviedb.org/3/';
    var apiKey = "f8f42ffc4809217e9683e3a13cacd9db";
    // URL in Authentication. Base URL of image
    var imageBaseUrl = 'https://image.tmdb.org/t/p/';

    const nowPlayingURL = apiBaseURL + 'movie/now_playing?api_key=' + apiKey;


    $.getJSON(nowPlayingURL, function(data) {


        console.log(data.results);
        for (let i = 0; i < data.results.length; i++) {
            // console.log(data.results[i]);
            // $('#tblBody1').append(`<tr>

            var mid = data.results[i].id;
            var thisMovieUrl = apiBaseURL + 'movie/' + mid + '?api_key=' + apiKey;
            //  $.getJSON(thisMovieUrl, function (moviedata) {
            var title = data.results[i].title;
            var poster = imageBaseUrl + 'w300' + data.results[i].poster_path;
            var releaseDate = data.results[i].release_date;

            var overview = data.results[i].overview;
            // // $('.overview').addClass('overview');

            var voteAverage = data.results[i].vote_average;

            $('.moviedata').append(`<div class="col-3 mb-5">
                <div data-toggle="modal" data-target="#exampleModal` + i + `"><img   src="${poster}"></div>
                <div class="modal fade" id="exampleModal` + i + `" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog row">
                  <div class="modal-content col-sm-12">
              <!--       <div class="modal-header">
                      <h1 class="modal-title" id="exampleModalLabel">Modal Title</h1>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                    
                    </div>
                    <div class="modal-footer">
                   <button type = "button" class = "btn btn-secondary" data-dismiss = "modal"> Close </button> 
                                      <button type = "button" class = "btn btn-primary"> Save changes </button> 
                    </div>  -->
                    <div class="col-sm-6">
                    <img class="img-fluid"  style="width:100%" src="${poster}">
                    </div>
                  <div class="col-sm-6">
                  <h3>${title}</h3>
                  <h6>Release Date: ${releaseDate}</h6>
          
                  <p>${overview}</p>
                  <h6>Rating: ${voteAverage}</h6>
                  </div>
                  
                  </div>
                </div>
              </div>
                            </div>
                            `);



        }
    });

    function getMovieByGenre(gid) {
        let genreUrl = apiBaseURL + 'genre/' + gid + '/movies?api_key=' + apiKey;
        console.log(genreUrl);
        $.getJSON(genreUrl, function(genreData) {
            $('.moviedata').empty();
            for (let i = 0; i < genreData.results.length; i++) {
                var poster = imageBaseUrl + 'w300' + genreData.results[i].poster_path;
                var title = genreData.results[i].original_title;
                var releaseDate = genreData.results[i].release_date;
                var overview = genreData.results[i].overview;
                var voteAverage = genreData.results[i].vote_average;

                $('.moviedata').append(`<div class="col-3 mb-5">
                  <div data-toggle="modal" data-target="#exampleModal` + i + `"><img   src="${poster}"></div>
                  <div class="modal fade" id="exampleModal` + i + `" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog row">
                    <div class="modal-content col-sm-12">
                <!--       <div class="modal-header">
                        <h1 class="modal-title" id="exampleModalLabel">Modal Title</h1>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                      
                      </div>
                      <div class="modal-footer">
                     <button type = "button" class = "btn btn-secondary" data-dismiss = "modal"> Close </button> 
                                        <button type = "button" class = "btn btn-primary"> Save changes </button> 
                      </div>  -->
                      <div class="col-sm-6">
                      <img class="img-fluid"  style="width:100%" src="${poster}">
                      </div>
                    <div class="col-sm-6">
                    <h3>${title}</h3>
                    <h6>Release Date: ${releaseDate}</h6>
            
                    <p>${overview}</p>
                    <h6>Rating: ${voteAverage}</h6>
                    </div>
                    
                    </div>
                  </div>
                </div>
                              </div>
                              `);
            }
        })
    }

    var searchTerm = '';
    //searchMovies();
    $('.searchForm').submit(function(e) {
        $(".moviedata").html('');
        event.preventDefault();
        searchTerm = $(".form-control").val();
        if (searchTerm == "") {
            alert("No value entered. Please enter movie name to search");

        } else {
            searchMovies();
        }

        $("#movieLabel").html('');

    })

    function searchMovies() {
        var searchUrl = apiBaseURL + 'search/movie?api_key=' + apiKey + '&query=' + searchTerm;
        console.log(searchUrl);
        $.getJSON(searchUrl, function(searchData) {
            $('.moviedata').empty();
            for (let i = 0; i < searchData.results.length; i++) {
                var poster = imageBaseUrl + 'w300' + searchData.results[i].poster_path;
                var title = searchData.results[i].original_title;
                var releaseDate = searchData.results[i].release_date;
                var overview = searchData.results[i].overview;
                var voteAverage = searchData.results[i].vote_average;

                $('.moviedata').append(`<div class="col-3 mb-5">
            <div data-toggle="modal" data-target="#exampleModal` + i + `"><img  src="${poster}"></div>
            <div class="modal fade" id="exampleModal` + i + `" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog row">
              <div class="modal-content col-sm-12">
          <!--       <div class="modal-header">
                  <h1 class="modal-title" id="exampleModalLabel">Modal Title</h1>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">

                </div>
                <div class="modal-footer">
               <button type = "button" class = "btn btn-secondary" data-dismiss = "modal"> Close </button> 
                                  <button type = "button" class = "btn btn-primary"> Save changes </button> 
                </div>  -->
                <div class="col-sm-6">
                <img class="img-fluid"  style="width:100%" src="${poster}">
                </div>
              <div class="col-sm-6">
              <h3>${title}</h3>
              <h6>Release Date: ${releaseDate}</h6>

              <p>${overview}</p>
              <h6>Rating: ${voteAverage}</h6>
              </div>

              </div>
            </div>
          </div>
                        </div>
                        `);
            }
        })
    }
});
