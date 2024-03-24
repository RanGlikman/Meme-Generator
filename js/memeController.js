'use strict'

/* -------------------------------------------------------------------------- */

function renderMeme(currentText = '') {
    console.log('Rendering meme with texts:', gMeme.txts)
    const canvas = document.querySelector('.meme-canvas')
    const ctx = canvas.getContext('2d')
    const meme = getMeme()

    const img = new Image()
    img.src = `img/memes/${meme.selectedImgId}.jpg`

    const drawContent = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

        ctx.textAlign = 'center'

        document.querySelector('.editor').style.display = 'flex'
        document.querySelector('.gallery').style.display = 'none'

        meme.txts.forEach((line, index) => {
            ctx.font = `${line.height}px ${line.fontFamily}`

            const yPos = line.y
            ctx.fillStyle = meme.color
            ctx.fillText(line.text, line.x, line.y)

            line.width = ctx.measureText(line.text).width
            const textX = line.x - line.width / 2

            if (index === gMeme.selectedTxtIndex) {
                ctx.strokeStyle = 'red'
                ctx.lineWidth = 2
                const selectionBoxX = line.x - line.width / 2
                const selectionBoxY = line.y - line.height
                ctx.strokeRect(selectionBoxX, selectionBoxY, line.width, line.height)
            }
        })

        if (currentText) {
            ctx.fillStyle = meme.color
            ctx.fillText(currentText, canvas.width / 2, canvas.height - 50)
        }
    }

    if (img.complete) {
        drawContent()
    } else {
        img.onload = drawContent
    }
}

/* -------------------------------------------------------------------------- */
