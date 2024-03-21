'use strict'

/* -------------------------------------------------------------------------- */

function renderGallery() {
    const galleryContainer = document.querySelector('.gallery-container')
    for (let i = 1; i <= 18; i++) {
        //*  i = Numbers of images appearing in gallery
        const img = document.createElement('img')
        img.src = `img/memes/${i}.jpg`
        img.alt = 'Meme Image'
        img.classList.add('gallery-img')
        img.addEventListener('click', () => {
            setImage(i)
            renderMeme()
        })
        galleryContainer.appendChild(img)
    }
}

/* -------------------------------------------------------------------------- */
