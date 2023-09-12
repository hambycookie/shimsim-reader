var chSelectEl = document.querySelector('#ch-select');
var goBtnEl = document.querySelector('#go-btn');
var pageDisplayEl = document.querySelector('#page-display');
var nextBtnEl = document.querySelector('#next-pg');
var prevBtnEl = document.querySelector('#prev-pg');

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

function loadPage(ch_id, pg_index) {
  var apiUrl = 'https://api.consumet.org/manga/mangadex/read/' + ch_id;

  fetch(apiUrl)
    .then(function(response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log("pg_index = " + pg_index);
      pageDisplayEl.setAttribute('src', data[pg_index].img);
      pageDisplayEl.setAttribute('data-ch-id', ch_id);
      pageDisplayEl.setAttribute('data-pg-index', pg_index);
    })
    .catch(function (error) {
      console.log('Unable to connect to Consumet: ' + error)
    })
}
 
function loadNextChapter(ch_id) {
  var apiUrl = 'https://api.consumet.org/manga/mangadex/info/' + manga_id;

  fetch(apiUrl)
    .then(function(response) {
      return response.json();
    })
    .then(function (data) {
      for(let i = 0; i < data.chapters.length; i++) {
        if(data.chapters[i].id === ch_id) {
          var index = i;
        }
      }

      if (index - 1 >= 0) {
        console.log("getnextchapter " + data.chapters[index-1].id);
        loadPage(data.chapters[index-1].id, 0);
      }
    })
    .catch(function (error) {
      console.log('Unable to connect to Consumet: ' + error);
    });
}
function loadLastPage(ch_id) {
  var apiUrl = 'https://api.consumet.org/manga/mangadex/read/' + ch_id;

  fetch(apiUrl)
    .then(function(response) {
      return response.json();
    })
    .then(function (data) {
      console.log('loading last page of last chapter');
      loadPage(ch_id, data.length - 1);
    })
    .catch(function (error) {
      console.log('Unable to connect to Consumet: ' + error)
    })
}

function loadPrevChapter(ch_id) {
  var apiUrl = 'https://api.consumet.org/manga/mangadex/info/' + manga_id;

  fetch(apiUrl)
    .then(function(response) {
      return response.json();
    })
    .then(function (data) {
      for(let i = 0; i < data.chapters.length; i++) {
        if(data.chapters[i].id === ch_id) {
          var index = i;
        }
      }
      
      let lastChIndex = data.chapters.length - 1;
      if (index + 1 <= lastChIndex) {
        console.log("getprevchapter " + data.chapters[index+1].id);
        loadLastPage(data.chapters[index+1].id);
      }
    })
    .catch(function (error) {
      console.log('Unable to connect to Consumet: ' + error);
    });
}


function loadNextPage(ch_id, pg_index) {
  var apiUrl = 'https://api.consumet.org/manga/mangadex/read/' + ch_id;

  fetch(apiUrl)
    .then(function(response) {
      return response.json();
    })
    .then(function (data) {
      var nextIndex = parseInt(pg_index) + 1;
      // if end of chapter, load first page of next chapter
      if(nextIndex >= data.length) {
        // Load index 0 of next chapter id
        loadNextChapter(ch_id);
      } else {       // else load next page in this chapter
        loadPage(ch_id, nextIndex);
      }
    })
    .catch(function (error) {
      console.log('Unable to connect to Consumet: ' + error)
    })
}

function loadPrevPage(ch_id, pg_index) {
  var apiUrl = 'https://api.consumet.org/manga/mangadex/read/' + ch_id;

  fetch(apiUrl)
    .then(function(response) {
      return response.json();
    })
    .then(function (data) {
      var prevIndex = parseInt(pg_index) - 1;
      // if beginning of chapter, load prev chapter
      if(prevIndex <= 0) {
        // Load last index of prev chapter id
        loadPrevChapter(ch_id);
      } else {       // else load next page in this chapter
        loadPage(ch_id, prevIndex);
      }
    })
    .catch(function (error) {
      console.log('Unable to connect to Consumet: ' + error)
    })
}

goBtnEl.addEventListener('click', function() {
  event.preventDefault();
  loadPage(chSelectEl.options[chSelectEl.selectedIndex].value, 0);
})

nextBtnEl.addEventListener('click', function() {
  event.preventDefault();
  loadNextPage(pageDisplayEl.getAttribute('data-ch-id'), pageDisplayEl.getAttribute('data-pg-index'));
})

prevBtnEl.addEventListener('click', function() {
  event.preventDefault();
  loadPrevPage(pageDisplayEl.getAttribute('data-ch-id'), pageDisplayEl.getAttribute('data-pg-index'));
})

// getInfo();
getChapters();