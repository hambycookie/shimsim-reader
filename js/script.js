var chSelectEl = document.querySelector('#ch-select');
var goBtnEl = document.querySelector('#go-btn');
var pageDisplayEl = document.querySelector('#page-display');

const manga_id = "28b5d037-175d-4119-96f8-e860e408ebe9";

function getInfo() {
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

function getChapters() {
  var apiUrl = 'https://api.consumet.org/manga/mangadex/info/' + manga_id;
  
  fetch(apiUrl)
    .then(function(response) {
      return response.json();
    })
    .then(function (data) {
      chSelectEl.innerHTML = '';

      data.chapters.forEach(chapter => {
        var chOptionEl = document.createElement("option");
        chOptionEl.setAttribute('value', chapter.id);
        chOptionEl.textContent = chapter.chapterNumber;
        chSelectEl.appendChild(chOptionEl);
      });
    })
    .catch(function (error) {
      console.log('Unable to connect to Consumet: ' + error);
    });
};

function loadFirstPage(ch_id) {
  var apiUrl = 'https://api.consumet.org/manga/mangadex/read/' + ch_id;

  fetch(apiUrl)
    .then(function(response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data[0].img);
      pageDisplayEl.setAttribute('src', data[0].img);
    })
    .catch(function (error) {
      console.log('Unable to connect to Consumet: ' + error)
    })
}

goBtnEl.addEventListener('click', function() {
  event.preventDefault();
  console.log(chSelectEl.options[chSelectEl.selectedIndex].value);
  loadFirstPage(chSelectEl.options[chSelectEl.selectedIndex].value);
})

// getInfo();
getChapters();