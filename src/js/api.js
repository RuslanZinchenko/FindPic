'use strict'

const apiKey = '563492ad6f91700001000001efe4554ec5924beab8b1c433b156ab30';


const findQuery = document.querySelector('.form__input');
const findBtn = document.querySelector('.form__button');
const gallery = document.querySelector('.gallery__wrapper')
const btnHidd = document.querySelector('.btn-hidden')
let page = 1;

findBtn.addEventListener('click', goApi)

function goApi (e) {
    e.preventDefault();
    const updatePage = photos => {
        // console.log(photos);
        const markup = createImages(photos);
        gallery.innerHTML = markup
        btnHidd.classList.remove('btn-hidden')
        
    }
    fetchImages(findQuery.value).then(updatePage);
    
};

function fetchImages(query) {
    const apiUrl = `https://api.pexels.com/v1/search?query=${query}&per_page=18&page=${page}`;
    const headers = {Authorization: apiKey}
    // console.log(apiUrl);
    return fetch(apiUrl, {headers})
    .then(response => {
        if (response.ok) return response.json();

        throw new Error('error' + response.statusText)    
    })
    .then(data => data.photos)
    .catch(err => console.log(err))
};

function createImages(imgs){
    const markup = imgs.reduce((markup, item) => markup + ` <div class="img-list__imgs"> <img id=${item.id} src=${item.src.medium} alt=${item.photographer} class="imgs__item"> </div>`,'')
    // console.log(markup);
    return markup
}

// .then(data => console.log(data))