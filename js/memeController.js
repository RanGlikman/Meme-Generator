'use strict'

/* -------------------------------------------------------------------------- */

function renderMeme(currentText = '') {
    const canvas = document.querySelector('.meme-canvas')
    const ctx = canvas.getContext('2d')
    const meme = getMeme()

    const img = new Image()
    img.src = `img/memes/${meme.selectedImgId}.jpg`

    const drawContent = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

        ctx.font = `${meme.size}px Arial`
        ctx.textAlign = 'center'

        meme.txts.forEach((txt, index) => {
            let yPos = canvas.height - 50 - index * meme.size

            ctx.fillStyle = meme.color
            ctx.fillText(txt, canvas.width / 2, yPos)

            // if (index === gMeme.selectedTxtIndex && gMeme.highlightSelected) { //* Old version
            if (index === gMeme.selectedTxtIndex) {
                //* New version
                ctx.strokeStyle = 'red'
                ctx.lineWidth = 2

                const textWidth = ctx.measureText(txt).width
                const textHeight = meme.size

                const padding = 10
                const borderX = canvas.width / 2 - textWidth / 2 - padding
                const borderY = yPos - textHeight + padding / 2

                ctx.strokeRect(borderX, borderY, textWidth + padding * 2, textHeight)
            }
        })

        /* -------------------------------------------------------------------------- */

        if (currentText) {
            ctx.fillStyle = meme.color
            ctx.fillText(
                currentText,
                canvas.width / 2,
                canvas.height - 50 - meme.txts.length * meme.size
            )
        }
    }

    /* -------------------------------------------------------------------------- */

    if (img.complete) {
        drawContent()
    } else {
        img.onload = drawContent
    }
}

/* -------------------------------------------------------------------------- */
