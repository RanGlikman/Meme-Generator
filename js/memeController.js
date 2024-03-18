'use strict'

function renderMeme() {
    const canvas = document.querySelector('.meme-canvas')
    const ctx = canvas.getContext('2d')
    const meme = getMeme()

    const img = new Image()
    img.src = `img/memes/${meme.selectedImgId}.jpg`
    img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        // Draw text
        ctx.fillStyle = meme.color
        ctx.font = `${meme.size}px Arial`
        ctx.textAlign = 'center'
        ctx.fillText(meme.txt, canvas.width / 2, canvas.height - 50)
    }
}
