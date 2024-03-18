'use strict'

function renderMeme(currentText = '') {
    const canvas = document.querySelector('.meme-canvas')
    const ctx = canvas.getContext('2d')
    const meme = getMeme()

    const img = new Image()
    img.src = `img/memes/${meme.selectedImgId}.jpg`

    const drawContent = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        ctx.fillStyle = meme.color
        ctx.font = `${meme.size}px Arial`
        ctx.textAlign = 'center'

        meme.txts.forEach((txt, index) => {
            ctx.fillText(txt, canvas.width / 2, canvas.height - 50 - index * meme.size)
        })

        if (currentText) {
            ctx.fillText(
                currentText,
                canvas.width / 2,
                canvas.height - 50 - meme.txts.length * meme.size
            )
        }
    }

    if (img.complete) {
        drawContent()
    } else {
        img.onload = drawContent
    }
}
