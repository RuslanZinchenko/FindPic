const modalSection = document.querySelector('.js-modal-backdrop');
const modalClose = document.querySelector('.modal-close');
const modalPrev = document.querySelector('.modal-prev');
const modalNext = document.querySelector('.modal-next');
const modalImg = document.querySelector('.modal-img');

const modalFav = document.querySelector('.modal-favorite')

let index;
let favorite = false;



const favorites = document.querySelector('.favorites-gallery__img-list');



gallery.addEventListener('click', openModal);
modalSection.addEventListener('click', hidd);
modalClose.addEventListener('click', hidd);
modalFav.addEventListener('click', handleWithFavorite);


modalNext.addEventListener('click', next);
// favorites.addEventListener('click', openModal);
let getAttr;

function openModal(e) {
  const target = e.target;
  choosePicture(target);
  modalNext.addEventListener('click', next);
  modalPrev.addEventListener('click', prev);
  choosePicture(target)
  modalSection.classList.remove('modal-hidden');
  getAttr = target.getAttribute('src');
}

function hidd(e) {
  if (this !== e.target) return;
  modalSection.classList.add('modal-hidden')
}

function choosePicture(target) {
  if (target.classList.contains('img-list__imgs')) {
    modalSection.classList.remove('modal-hidden');
    modalImg.src = target.firstElementChild.src
    modalImg.id = target.firstElementChild.id
    index = target;
    return index
  } else if (target.classList.contains('imgs__item')) {
    modalSection.classList.remove('modal-hidden');
    modalImg.src = target.src
    modalImg.id = target.id
    index = target.parentElement;
    return index
  }
}

function next() {
  let nextItem = index.nextElementSibling.firstElementChild;
  index = index.nextElementSibling;
  modalImg.src = nextItem.src
  modalImg.id = nextItem.id
  if (localStorage.getItem()){}
}

function prev() {
  let prevItem = index.previousElementSibling.firstElementChild;
  index = index.previousElementSibling;
  modalImg.src = prevItem.src
  modalImg.id = prevItem.id
}

function handleWithFavorite(e) {
  const target = e.target;
  let item = modalImg
  if (!favorite) {
    favorite = true;
    target.style.color = 'rgb(255, 240, 108)';
    addFav(item)
  } else if (favorite) {
    favorite = false;
    target.style.color = 'rgb(255, 255, 255)';
    // removeFav(item)
    addFav(item)
  }
}
