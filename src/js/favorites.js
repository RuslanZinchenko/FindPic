// 'use strict'

const favBtn = document.querySelector('.header__nav');
const favList = document.querySelector('.fav-hidden');
const container = document.querySelector('.favorites-gallery__img-list');
const galleryList = document.querySelector('.gallery');
// const addFav = document.querySelector('.modal-favorite');
let mk = 0;

// localStorage.clear()

favBtn.addEventListener('click', appGallery);
document.addEventListener('DOMContentLoaded', getFromLS)
// addFav.addEventListener('click', createElementGlobal);
function getFromLS() {
  for (let el in localStorage) {
    if (el >= 0) {

      const divbox = document.createElement('div');
      const removeBtn = document.createElement('span');
      const imgBox = document.createElement('img'); 

      imgBox.addEventListener('click', openModal);

      divbox.classList.add('img-list__imgs');
      removeBtn.classList.add('imgs__remove');
      imgBox.classList.add('imgs__item');

      container.append(divbox);
      divbox.append(imgBox);
      divbox.append(removeBtn);


      let fromLS = localStorage.getItem(el);
      imgBox.setAttribute('src', fromLS);
    }
  }
}

function addFav(item) {
  const divbox = document.createElement('div');
  const imgBox = document.createElement('img');

  divbox.classList.add('img-list__imgs');
  imgBox.classList.add('imgs__item');

  container.append(divbox);
  divbox.append(imgBox);

  localStorage.setItem(item.id, item.src);

  for (let el in localStorage) {
    if (el >= 0) {
      let fromLS = localStorage.getItem(item.id);
      imgBox.setAttribute('src', fromLS);
    }
  }
}


function appGallery(event) {
  favList.classList.remove('fav-hidden');
  galleryList.classList.add('hide');
};


const LOCALSTORAGE = (w => {
  if (!w) return;

  const isActive = "localStorage" in w;

  const get = key => {
    try {
      const serializedState = localStorage.getItem(key);

      return serializedState === null ?
        undefined :
        JSON.parse(serializedState);
    } catch (err) {
      console.error("Get state error: ", err);
    }
  };

  const set = (key, value) => {
    try {
      const serializedState = JSON.stringify(value);
      localStorage.setItem(key, serializedState);
    } catch (err) {
      console.error("Set state error: ", err);
    }
  };

  const publicAPI = {
    isActive,
    get,
    set,
  };

  return publicAPI;
})(window);
