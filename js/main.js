'use strict'

/* -------------------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
    renderGallery()
    const canvas = document.querySelector('.meme-canvas')
    const textInput = document.querySelector('.text-input')
    let isDragging = false
    let dragIndex = -1
    let dragOffsetX = 0
    let dragOffsetY = 0

    /* ------------------------------ Text entering ----------------------------- */

    textInput.addEventListener('input', () => {
        gMeme.txts[gMeme.selectedTxtIndex].text = textInput.value
        renderMeme()
    })

    /* --------------------------- Pressing Enter key --------------------------- */

    textInput.addEventListener('keydown', event => {
        if (event.key === 'Enter') {
            gMeme.txts = gMeme.txts.filter(line => line.text.trim() !== '')
            textInput.value = ''
            gMeme.selectedTxtIndex = null
            textInput.setAttribute('disabled', true)
            textInput.placeholder = 'Click meme to type/edit text'
            renderMeme()
        }
    })

    /* --------------------------- Changing text color -------------------------- */

    const colorInput = document.querySelector('.color-input')
    colorInput.addEventListener('change', () => {
        setColor(colorInput.value)
        renderMeme(textInput.value)
    })

    /* ----------------- font increase and font decrease buttons ---------------- */

    document.querySelector('.btn-increase-font').addEventListener('click', () => {
        if (gMeme.txts[gMeme.selectedTxtIndex]) {
            gMeme.txts[gMeme.selectedTxtIndex].height += 2
            textInput.focus()
            renderMeme()
        }
    })

    document.querySelector('.btn-decrease-font').addEventListener('click', () => {
        if (gMeme.txts[gMeme.selectedTxtIndex] && gMeme.txts[gMeme.selectedTxtIndex].height > 10) {
            gMeme.txts[gMeme.selectedTxtIndex].height -= 2
            textInput.focus()
            renderMeme()
        }
    })

    /* ---------------------------- Font size button ---------------------------- */

    document.querySelector('.font-size-select').addEventListener('change', function () {
        const newSize = parseInt(this.value)

        if (gMeme.txts[gMeme.selectedTxtIndex]) {
            gMeme.txts[gMeme.selectedTxtIndex].height = newSize
        }
        textInput.focus()
        gMeme.size = newSize
        renderMeme()
    })

    /* ---------------------------- Downloading meme ---------------------------- */

    document.querySelector('.download-btn').addEventListener('click', () => {
        textInput.removeAttribute('disabled')
        gMeme.selectedTxtIndex = null
        renderMeme()
        const dataURL = canvas.toDataURL('image/png')
        document.querySelector('.download-btn').href = dataURL
    })

    /* ------------------ Switching between text lines on meme ------------------ */

    document.querySelector('.switch-text-btn').addEventListener('click', () => {
        if (gMeme.txts.length > 0) {
            gMeme.selectedTxtIndex = (gMeme.selectedTxtIndex + 1) % gMeme.txts.length
            textInput.removeAttribute('disabled')
            textInput.value = gMeme.txts[gMeme.selectedTxtIndex].text
            textInput.focus()
            renderMeme()
        }
    })

    /* ------------------ Deselecting active text line on meme ------------------ */

    document.querySelector('.deselect-switch-text-btn').addEventListener('click', () => {
        textInput.value = ''
        textInput.setAttribute('disabled', true)
        textInput.placeholder = 'Click meme to type/edit text'
        gMeme.selectedTxtIndex = null
        gMeme.txts = gMeme.txts.filter(line => line.text.trim() !== '')
        renderMeme()
    })

    /* --------------------------- Clicking on Canvas --------------------------- */

    canvas.addEventListener('click', e => {
        const rect = canvas.getBoundingClientRect()
        const scaleX = canvas.width / rect.width
        const scaleY = canvas.height / rect.height
        const x = (e.clientX - rect.left) * scaleX
        const y = (e.clientY - rect.top) * scaleY

        let existingTextClicked = false
        gMeme.txts = gMeme.txts.filter(line => line.text.trim() !== '')
        gMeme.txts.forEach((line, index) => {
            if (
                x >= line.x - line.width / 2 &&
                x <= line.x + line.width / 2 &&
                y >= line.y - line.height &&
                y <= line.y
            ) {
                gMeme.selectedTxtIndex = index
                textInput.value = line.text
                existingTextClicked = true
            }
        })

        if (!existingTextClicked) {
            addLineTxt('', x, y)
            gMeme.selectedTxtIndex = gMeme.txts.length - 1
            textInput.value = ''
        }

        textInput.removeAttribute('disabled')
        textInput.placeholder = 'Enter your meme text here'
        textInput.focus()
        renderMeme()
    })

    /* -------------------- Clicking on body to deselect text ------------------- */

    document.body.addEventListener('click', function (event) {
        if (!event.target.matches('.meme-canvas, .controls *, .navbar *')) {
            textInput.value = ''
            textInput.setAttribute('disabled', true)
            textInput.placeholder = 'Click meme to type/edit text'
            gMeme.selectedTxtIndex = null
            gMeme.txts = gMeme.txts.filter(line => line.text.trim() !== '')
            renderMeme()
        }
    })

    /* ----------------------- Clicking on Gallery navbar item ---------------------- */

    document.querySelector('a[data-target="gallery"]').addEventListener('click', event => {
        gMeme.txts = []
        document.querySelector('.gallery').style.display = 'block'
        document.querySelector('.editor').style.display = 'none'
    })

    /* ----------------------- Deleting selected text line ---------------------- */

    document.querySelector('.btn-delete-text').addEventListener('click', () => {
        deleteSelectedLine()
        textInput.value = ''
        textInput.setAttribute('disabled', true)
        textInput.placeholder = 'Click meme to type/edit text'
        gMeme.selectedTxtIndex = null
        renderMeme()
    })

    /* --------------------------- Change font family --------------------------- */

    document.querySelector('.font-family-select').addEventListener('change', event => {
        gMeme.fontFamily = event.target.value
        if (gMeme.selectedTxtIndex !== null && gMeme.txts[gMeme.selectedTxtIndex]) {
            gMeme.txts[gMeme.selectedTxtIndex].fontFamily = event.target.value
            renderMeme()
        }
    })

    /* ------------------------------ Drag and Drop ----------------------------- */

    canvas.addEventListener('mousedown', function (e) {
        const rect = canvas.getBoundingClientRect()
        const scaleX = canvas.width / rect.width
        const scaleY = canvas.height / rect.height
        const x = (e.clientX - rect.left) * scaleX
        const y = (e.clientY - rect.top) * scaleY

        gMeme.txts.forEach((line, index) => {
            if (
                x >= line.x - line.width / 2 &&
                x <= line.x + line.width / 2 &&
                y >= line.y - line.height &&
                y <= line.y
            ) {
                isDragging = true
                dragIndex = index
                gMeme.selectedTxtIndex = index

                dragOffsetX = x - line.x
                dragOffsetY = y - line.y
            }
        })
    })

    canvas.addEventListener('mousemove', function (e) {
        if (isDragging) {
            const rect = canvas.getBoundingClientRect()
            const scaleX = canvas.width / rect.width
            const scaleY = canvas.height / rect.height
            const x = (e.clientX - rect.left) * scaleX
            const y = (e.clientY - rect.top) * scaleY

            gMeme.txts[dragIndex].x = x - dragOffsetX
            gMeme.txts[dragIndex].y = y - dragOffsetY
            renderMeme()
        }
    })

    canvas.addEventListener('mouseup', function (e) {
        isDragging = false
        dragIndex = -1
    })

    /* -------------------------- Random meme creation -------------------------- */

    document.querySelector('.random-meme-btn').addEventListener('click', () => {
        generateRandomMeme()
    })

    /* ---------------------------- Add emoji sticker --------------------------- */

    document.querySelectorAll('.emoji-btn').forEach(button => {
        button.addEventListener('click', event => {
            const textInput = document.querySelector('.text-input')

            if (!textInput.disabled) {
                const button = event.target
                let textToAppend = button.textContent
                textInput.value += textToAppend
                if (gMeme.txts[gMeme.selectedTxtIndex] !== undefined) {
                    gMeme.txts[gMeme.selectedTxtIndex].text = textInput.value
                    textInput.value = ''
                    textInput.setAttribute('disabled', true)
                    textInput.placeholder = 'Click meme to type/edit text'
                    gMeme.selectedTxtIndex = null
                    gMeme.txts = gMeme.txts.filter(line => line.text.trim() !== '')
                    renderMeme()
                }
            }
        })
    })

    /* ------------------------- Add line of text button ------------------------ */

    document.querySelector('.enable-text-input-btn').addEventListener('click', () => {
        textInput.disabled = false
        textInput.focus()
        textInput.value = ''
        textInput.placeholder = 'Enter your meme text here'
        addLineTxt(textInput.value, canvas.width / 2, canvas.height - 50)
        renderMeme()
    })

    /* -------------------------------------------------------------------------- */
})

/* -------------------------------------------------------------------------- */
