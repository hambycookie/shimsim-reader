var chSelectEl = document.querySelector('#ch-select');
var goBtnEl = document.querySelector('#go-btn');

const manga_id = "28b5d037-175d-4119-96f8-e860e408ebe9";


var getInfo = function () {
  var apiUrl = 'https://api.consumet.org/manga/mangadex/info/' + manga_id;

  fetch(apiUrl)
    .then(function(response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    })
    .catch(function (error) {
      console.log('Unable to connect to Consumet: ' + error);
    });
}

var getChapters = function() {
  var apiUrl = 'https://api.consumet.org/manga/mangadex/info/' + manga_id;
  
  fetch(apiUrl)
    .then(function(response) {
      return response.json();
    })
    .then(function (data) {
      console.log("running getChapters");
      chSelectEl.innerHTML = '';

      data.chapters.forEach(chapter => {
        var chOptionEl = document.createElement("option");
        chOptionEl.setAttribute('value', chapter.chapterNumber);
        chOptionEl.textContent = chapter.chapterNumber;
        chSelectEl.appendChild(chOptionEl);
      });
    })
    .catch(function (error) {
      console.log('Unable to connect to Consumet: ' + error);
    });
};

getInfo();
getChapters();