// 'use strict'

const apiKey = '563492ad6f91700001000001efe4554ec5924beab8b1c433b156ab30';


const findQuery = document.querySelector('.form__input');
const findBtn = document.querySelector('.form__button');
const gallery = document.querySelector('.gallery__wrapper')
const btnHidd = document.querySelector('.btn-hidden')

btnHidd.addEventListener('click', appendGallery)

function loadImages(image) {
    page = page + 1;
    const apiUrl = `https://api.pexels.com/v1/search?query=${image}&per_page=18&page=${page}`;
    const headers = {Authorization: apiKey}
    return fetch(apiUrl, {headers})
    .then(response => {
        if (response.ok) return response.json();
        throw new Error('error' + response.statusText)    
    })
    .then(data => data.photos)
    .catch(err => console.log(err))
};

function appendGallery (event) {
    event.preventDefault();
    const updatePage = photos => {
        const append = imageMaker(photos);
        gallery.innerHTML += append;
    }
    loadImages(findQuery.value).then(updatePage);
};

function imageMaker(img){
    const markup = img.reduce((markup, item) => markup + 
    `<div class="img-list__imgs"> <img id=${item.id} src=${item.src.medium} 
    alt=${item.photographer} class="imgs__item"> </div>`,'');
    return markup;
}

