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

        document.querySelector('.editor').style.display = 'flex'
        document.querySelector('.gallery').style.display = 'none'

        meme.txts.forEach((line, index) => {
            ctx.font = `bold ${line.height}px ${line.fontFamily}`
            ctx.fillStyle = meme.color
            ctx.textAlign = 'center'
            ctx.strokeStyle = 'black'
            ctx.lineWidth = 1
            ctx.fillText(line.text, line.x, line.y)

            line.width = ctx.measureText(line.text).width
            ctx.strokeText(line.text, line.x, line.y)

            if (index === gMeme.selectedTxtIndex) {
                ctx.strokeStyle = 'red'
                ctx.lineWidth = 2
                const padding = 10
                const selectionBoxX = line.x - line.width / 2 - padding
                const selectionBoxY = line.y - line.height - padding
                const selectionBoxWidth = line.width + 2 * padding
                const selectionBoxHeight = line.height + 2 * padding
                ctx.strokeRect(selectionBoxX, selectionBoxY, selectionBoxWidth, selectionBoxHeight)
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

    if (gMeme.txts[gMeme.selectedTxtIndex]) {
        document.querySelector('.font-size-select').value =
            gMeme.txts[gMeme.selectedTxtIndex].height.toString()
    } else {
        document.querySelector('.font-size-select').value = gMeme.size.toString()
    }
}

/* -------------------------------------------------------------------------- */
