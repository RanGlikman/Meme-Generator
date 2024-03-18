'use strict'

function renderGallery() {
    const galleryContainer = document.querySelector('.gallery-container')
    for (let i = 1; i <= 2; i++) {
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
