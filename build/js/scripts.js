"use strict";

// 'use strict'
var apiKey = '563492ad6f91700001000001efe4554ec5924beab8b1c433b156ab30';
var findQuery = document.querySelector('.form__input');
var findBtn = document.querySelector('.form__button');
var gallery = document.querySelector('.gallery__wrapper');
var btnHidd = document.querySelector('.btn-hidden');
btnHidd.addEventListener('click', appendGallery);

function loadImages(image) {
  page = page + 1;
  var apiUrl = "https://api.pexels.com/v1/search?query=".concat(image, "&per_page=18&page=").concat(page);
  var headers = {
    Authorization: apiKey
  };
  return fetch(apiUrl, {
    headers: headers
  }).then(function (response) {
    if (response.ok) return response.json();
    throw new Error('error' + response.statusText);
  }).then(function (data) {
    return data.photos;
  }).catch(function (err) {
    return console.log(err);
  });
}

;

function appendGallery(event) {
  event.preventDefault();

  var updatePage = function updatePage(photos) {
    var append = imageMaker(photos);
    gallery.innerHTML += append;
  };

  loadImages(findQuery.value).then(updatePage);
}

;

function imageMaker(img) {
  var markup = img.reduce(function (markup, item) {
    return markup + "<div class=\"img-list__imgs\"> <img id=".concat(item.id, " src=").concat(item.src.medium, " \n    alt=").concat(item.photographer, " class=\"imgs__item\"> </div>");
  }, '');
  return markup;
}
'use strict';

var apiKey = '563492ad6f91700001000001efe4554ec5924beab8b1c433b156ab30';
var findQuery = document.querySelector('.form__input');
var findBtn = document.querySelector('.form__button');
var gallery = document.querySelector('.gallery__wrapper');
var btnHidd = document.querySelector('.btn-hidden');
var page = 1;
findBtn.addEventListener('click', goApi);

function goApi(e) {
  e.preventDefault();

  var updatePage = function updatePage(photos) {
    // console.log(photos);
    var markup = createImages(photos);
    gallery.innerHTML = markup;
    btnHidd.classList.remove('btn-hidden');
  };

  fetchImages(findQuery.value).then(updatePage);
}

;

function fetchImages(query) {
  var apiUrl = "https://api.pexels.com/v1/search?query=".concat(query, "&per_page=18&page=").concat(page);
  var headers = {
    Authorization: apiKey // console.log(apiUrl);

  };
  return fetch(apiUrl, {
    headers: headers
  }).then(function (response) {
    if (response.ok) return response.json();
    throw new Error('error' + response.statusText);
  }).then(function (data) {
    return data.photos;
  }).catch(function (err) {
    return console.log(err);
  });
}

;

function createImages(imgs) {
  var markup = imgs.reduce(function (markup, item) {
    return markup + " <div class=\"img-list__imgs\"> <img id=".concat(item.id, " src=").concat(item.src.medium, " alt=").concat(item.photographer, " class=\"imgs__item\"> </div>");
  }, ''); // console.log(markup);

  return markup;
} // .then(data => console.log(data))
"use strict";

// 'use strict'
var favBtn = document.querySelector('.header__nav');
var favList = document.querySelector('.fav-hidden');
var container = document.querySelector('.favorites-gallery__img-list');
var galleryList = document.querySelector('.gallery'); // const addFav = document.querySelector('.modal-favorite');

var mk = 0; // localStorage.clear()

favBtn.addEventListener('click', appGallery);
document.addEventListener('DOMContentLoaded', getFromLS); // addFav.addEventListener('click', createElementGlobal);

function getFromLS() {
  for (var el in localStorage) {
    if (el >= 0) {
      var divbox = document.createElement('div');
      var removeBtn = document.createElement('span');
      var imgBox = document.createElement('img');
      imgBox.addEventListener('click', openModal);
      divbox.classList.add('img-list__imgs');
      removeBtn.classList.add('imgs__remove');
      imgBox.classList.add('imgs__item');
      container.append(divbox);
      divbox.append(imgBox);
      divbox.append(removeBtn);
      var fromLS = localStorage.getItem(el);
      imgBox.setAttribute('src', fromLS);
    }
  }
}

function addFav(item) {
  var divbox = document.createElement('div');
  var imgBox = document.createElement('img');
  divbox.classList.add('img-list__imgs');
  imgBox.classList.add('imgs__item');
  container.append(divbox);
  divbox.append(imgBox);
  localStorage.setItem(item.id, item.src);

  for (var el in localStorage) {
    if (el >= 0) {
      var fromLS = localStorage.getItem(item.id);
      imgBox.setAttribute('src', fromLS);
    }
  }
}

function appGallery(event) {
  favList.classList.remove('fav-hidden');
  galleryList.classList.add('hide');
}

;

var LOCALSTORAGE = function (w) {
  if (!w) return;
  var isActive = "localStorage" in w;

  var get = function get(key) {
    try {
      var serializedState = localStorage.getItem(key);
      return serializedState === null ? undefined : JSON.parse(serializedState);
    } catch (err) {
      console.error("Get state error: ", err);
    }
  };

  var set = function set(key, value) {
    try {
      var serializedState = JSON.stringify(value);
      localStorage.setItem(key, serializedState);
    } catch (err) {
      console.error("Set state error: ", err);
    }
  };

  var publicAPI = {
    isActive: isActive,
    get: get,
    set: set
  };
  return publicAPI;
}(window);
"use strict";

var modalSection = document.querySelector('.js-modal-backdrop');
var modalClose = document.querySelector('.modal-close');
var modalPrev = document.querySelector('.modal-prev');
var modalNext = document.querySelector('.modal-next');
var modalImg = document.querySelector('.modal-img');
var modalFav = document.querySelector('.modal-favorite');
var index;
var favorite = false;
var favorites = document.querySelector('.favorites-gallery__img-list');
gallery.addEventListener('click', openModal);
modalSection.addEventListener('click', hidd);
modalClose.addEventListener('click', hidd);
modalFav.addEventListener('click', handleWithFavorite);
modalNext.addEventListener('click', next); // favorites.addEventListener('click', openModal);

var getAttr;

function openModal(e) {
  var target = e.target;
  choosePicture(target);
  modalNext.addEventListener('click', next);
  modalPrev.addEventListener('click', prev);
  choosePicture(target);
  modalSection.classList.remove('modal-hidden');
  getAttr = target.getAttribute('src');
}

function hidd(e) {
  if (this !== e.target) return;
  modalSection.classList.add('modal-hidden');
}

function choosePicture(target) {
  if (target.classList.contains('img-list__imgs')) {
    modalSection.classList.remove('modal-hidden');
    modalImg.src = target.firstElementChild.src;
    modalImg.id = target.firstElementChild.id;
    index = target;
    return index;
  } else if (target.classList.contains('imgs__item')) {
    modalSection.classList.remove('modal-hidden');
    modalImg.src = target.src;
    modalImg.id = target.id;
    index = target.parentElement;
    return index;
  }
}

function next() {
  var nextItem = index.nextElementSibling.firstElementChild;
  index = index.nextElementSibling;
  modalImg.src = nextItem.src;
  modalImg.id = nextItem.id;

  if (localStorage.getItem()) {}
}

function prev() {
  var prevItem = index.previousElementSibling.firstElementChild;
  index = index.previousElementSibling;
  modalImg.src = prevItem.src;
  modalImg.id = prevItem.id;
}

function handleWithFavorite(e) {
  var target = e.target;
  var item = modalImg;

  if (!favorite) {
    favorite = true;
    target.style.color = 'rgb(255, 240, 108)';
    addFav(item);
  } else if (favorite) {
    favorite = false;
    target.style.color = 'rgb(255, 255, 255)'; // removeFav(item)

    addFav(item);
  }
}