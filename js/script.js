var volSelectEl = $('#vol-select');
var chSelectEl = $('#ch-select');


// Shimeji Simulation MangaDex uuid: 28b5d037-175d-4119-96f8-e860e408ebe9

var getManga = function() {
  var apiUrl = 'https://api.manadex.org/manga?title="Shimeji Simulation"';

  fetch(apiUrl)
    .then(function(response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}

getManga();