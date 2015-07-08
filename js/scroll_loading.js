$(document).ready(function() {
    scroll_load.init();
});

var scroll_load = (function(){

  var $contentDiv;
  var currentID;

  var init = function(){

    $contentDiv = $("#movies");
    currentID = 1285015;
    getMovies(10);

  $(window).scroll(function() {
    if($(window).scrollTop() + $(window).height() == $(document).height()) {
      getMovies(10);
    }
  });
    
  };

  var formatRequest = function(id) {
    return { 
      i: ("tt" + id), 
      plot: "short",
    }
  };
  
  var getMovies = function(number) {
    for (var i = 0; i < number; i++) {
        requestMovie(formatRequest(++currentID));
     };
  };

  var requestMovie = function(request_data) {
    $.ajax({
      url: "http://www.omdbapi.com/",
      data: request_data,
      dataType: 'jsonp',
      success: recievedMovies,
      error: failed,
      beforeSend: showLoad,
      complete: removeLoad,
    })
  }; 

  var showLoad = function() {
    if($("#loading").length === 0){
      $contentDiv.append('<div id="loading">loading...</div>');
    }
  };

  var removeLoad = function() {
    $("#loading").remove();
  };

  var recievedMovies = function(response) {
    insertMovie(response);
  };

  var insertMovie = function(movieData) {
    html_string =  '<p><div class="movie">';
    for(var el in movieData) {
      html_string += el + ": ";
      html_string += movieData[el];
      html_string += "<br/>";
    };
    html_string += "</div></p>"
    html_string += "<hr/>"
    $contentDiv.append(html_string);
  };

  var failed = function(response) {
    $contentDiv.append("<p>Failed to load more movies.</p>");
  };

  return { //scroll_load
    init: init,
  }

})();