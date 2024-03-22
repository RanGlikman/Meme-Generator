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

        ctx.font = `${meme.size}px Arial`
        ctx.textAlign = 'center'

        document.querySelector('.editor').style.display = 'flex'
        document.querySelector('.gallery').style.display = 'none'

        meme.txts.forEach((line, index) => {
            ctx.font = `${line.height}px ${line.fontFamily}`

            const yPos = line.y // Use the y position from the line object
            ctx.fillStyle = meme.color
            ctx.fillText(line.text, line.x, line.y)

            // Measure text width for alignment and selection box
            line.width = ctx.measureText(line.text).width
            // Draw text on canvas
            const textX = line.x - line.width / 2

            if (index === gMeme.selectedTxtIndex) {
                ctx.strokeStyle = 'red'
                ctx.lineWidth = 2
                // Subtract half the width of the text to start the selection box
                const selectionBoxX = line.x - line.width / 2
                // The y-coordinate starts from the bottom of the text, so subtract the font size
                const selectionBoxY = line.y - line.height
                // Draw the selection box with the exact width of the text
                ctx.strokeRect(selectionBoxX, selectionBoxY, line.width, line.height)
            }
        })

        // Handling the scenario where the user is typing but hasn't added the text as a line yet
        if (currentText) {
            ctx.fillStyle = meme.color
            ctx.fillText(currentText, canvas.width / 2, canvas.height - 50) // Displaying the current text at a fixed position
        }
    }

    // Ensuring the image is loaded before drawing
    if (img.complete) {
        drawContent()
    } else {
        img.onload = drawContent
    }
}

/* -------------------------------------------------------------------------- */
