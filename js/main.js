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

    /* -------------------------------------------------------------------------- */

    textInput.addEventListener('input', () => {
        gMeme.txts[gMeme.selectedTxtIndex].text = textInput.value
        renderMeme()
    })

    /* -------------------------------------------------------------------------- */

    textInput.addEventListener('keydown', event => {
        if (event.key === 'Enter') {
            event.preventDefault()
            const trimmedText = textInput.value.trim()
            gMeme.txts = gMeme.txts.filter(line => line.text.trim() !== '')

            if (trimmedText !== '') {
                if (gMeme.selectedTxtIndex !== null) {
                    gMeme.txts[gMeme.selectedTxtIndex].text = trimmedText
                } else {
                    addLineTxt(trimmedText)
                }
                textInput.value = ''
                gMeme.selectedTxtIndex = null
                textInput.setAttribute('disabled', true)
                textInput.placeholder = 'Click meme to type/edit text'
                renderMeme()
            }
            textInput.setAttribute('disabled', true)
        }
    })

    /* -------------------------------------------------------------------------- */

    const colorInput = document.querySelector('.color-input')
    colorInput.addEventListener('change', () => {
        setColor(colorInput.value)
        renderMeme(textInput.value)
    })

    /* -------------------------------------------------------------------------- */

    document.querySelector('.btn-increase-font').addEventListener('click', () => {
        if (gMeme.selectedTxtIndex !== null && gMeme.txts[gMeme.selectedTxtIndex]) {
            gMeme.txts[gMeme.selectedTxtIndex].height += 2
            renderMeme()
        }
    })

    /* -------------------------------------------------------------------------- */

    document.querySelector('.btn-decrease-font').addEventListener('click', () => {
        if (
            gMeme.selectedTxtIndex !== null &&
            gMeme.txts[gMeme.selectedTxtIndex] &&
            gMeme.txts[gMeme.selectedTxtIndex].height > 10
        ) {
            gMeme.txts[gMeme.selectedTxtIndex].height -= 2
            renderMeme()
        }
    })

    /* -------------------------------------------------------------------------- */

    const downloadBtn = document.querySelector('.download-btn')
    downloadBtn.addEventListener('click', () => {
        const dataURL = canvas.toDataURL('image/png')
        downloadBtn.href = dataURL
    })

    /* -------------------------------------------------------------------------- */

    const switchTextBtn = document.querySelector('.switch-text-btn')
    switchTextBtn.addEventListener('click', () => {
        if (gMeme.txts.length > 0) {
            gMeme.selectedTxtIndex = (gMeme.selectedTxtIndex + 1) % gMeme.txts.length
            textInput.removeAttribute('disabled')
            textInput.value = gMeme.txts[gMeme.selectedTxtIndex].text
            textInput.focus()
            renderMeme()
        }
    })

    /* -------------------------------------------------------------------------- */

    document.querySelector('.deselect-switch-text-btn').addEventListener('click', () => {
        gMeme.selectedTxtIndex = null
        textInput.value = ''
        gMeme.txts = gMeme.txts.filter(line => line.text.trim() !== '')
        renderMeme(textInput.value)
    })

    /* -------------------------------------------------------------------------- */

    canvas.addEventListener('click', e => {
        const rect = canvas.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        textInput.removeAttribute('disabled')
        textInput.placeholder = 'Enter your meme here'
        textInput.focus()

        // Check if any existing text is selected, if not, create a new line
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
                renderMeme()
            }
        })

        if (!existingTextClicked) {
            addLineTxt('', x, y)
            gMeme.selectedTxtIndex = gMeme.txts.length - 1
            textInput.value = ''
            textInput.focus()
            renderMeme()
        }
    })

    /* -------------------------------------------------------------------------- */

    document.body.addEventListener(
        'click',
        function (event) {
            if (
                !event.target.matches(
                    '.text-input, .meme-canvas, .controls *, .controls, .navbar, .navbar *'
                )
            ) {
                textInput.value = ''
                textInput.setAttribute('disabled', true)
                textInput.placeholder = 'Click meme to type/edit text'
                gMeme.selectedTxtIndex = null
                gMeme.txts = gMeme.txts.filter(line => line.text.trim() !== '')
                renderMeme()
            }
        },
        true
    )

    /* -------------------------------------------------------------------------- */

    document.querySelector('a[data-target="gallery"]').addEventListener('click', event => {
        event.preventDefault()
        gMeme.txts = []
        document.querySelector('.gallery').style.display = 'block'
        document.querySelector('.editor').style.display = 'none'
    })
    /* -------------------------------------------------------------------------- */

    document.querySelector('.btn-delete-text').addEventListener('click', () => {
        deleteSelectedLine()
        textInput.value = ''
        textInput.setAttribute('disabled', true)
        textInput.placeholder = 'Click meme to type/edit text'
        gMeme.selectedTxtIndex = null
        renderMeme()
    })

    /* -------------------------------------------------------------------------- */

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
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        gMeme.txts.forEach((line, index) => {
            if (
                x >= line.x - line.width / 2 &&
                x <= line.x + line.width / 2 &&
                y >= line.y - line.height &&
                y <= line.y
            ) {
                isDragging = true
                dragIndex = index
                gMeme.selectedTxtIndex = index // Select the line for editing (by index)

                dragOffsetX = x - line.x
                dragOffsetY = y - line.y
            }
        })
    })

    canvas.addEventListener('mousemove', function (e) {
        if (isDragging) {
            const rect = canvas.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top

            gMeme.txts[dragIndex].x = x - dragOffsetX
            gMeme.txts[dragIndex].y = y - dragOffsetY
            renderMeme()
        }
    })

    canvas.addEventListener('mouseup', function (e) {
        isDragging = false
        dragIndex = -1
    })

    /* -------------------------------------------------------------------------- */

    document.querySelector('.random-meme-btn').addEventListener('click', () => {
        generateRandomMeme()
    })

    /* -------------------------------------------------------------------------- */
})

/* -------------------------------------------------------------------------- */
