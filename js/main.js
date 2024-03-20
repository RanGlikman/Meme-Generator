'use strict'

document.addEventListener('DOMContentLoaded', () => {
    renderGallery()

    /* -------------------------------------------------------------------------- */

    const textInput = document.querySelector('.text-input')

    textInput.addEventListener('input', () => {
        if (gMeme.selectedTxtIndex !== null && gMeme.txts.length > 0) {
            // Update the selected text in real-time as the user types
            gMeme.txts[gMeme.selectedTxtIndex] = textInput.value
            renderMeme()
        } else {
            // If no text is selected, show the typed text on the canvas
            // without adding it to the texts array until Enter is pressed
            renderMeme(textInput.value)
        }
    })

    /* -------------------------------------------------------------------------- */

    textInput.addEventListener('keydown', event => {
        if (event.key === 'Enter') {
            event.preventDefault() // Prevent form submission or any other default action
            const trimmedText = textInput.value.trim()

            if (trimmedText !== '') {
                if (gMeme.selectedTxtIndex !== null) {
                    // If a text is selected, update it
                    gMeme.txts[gMeme.selectedTxtIndex] = trimmedText
                } else {
                    // If no text is selected, add a new line
                    addLineTxt(trimmedText)
                }
                // After adding or updating, clear the input and reset selection
                textInput.value = ''
                gMeme.selectedTxtIndex = null // Deselect any text
                gMeme.highlightSelected = false // Turn off highlight if it was on
                renderMeme()
            }
        }
    })

    /* -------------------------------------------------------------------------- */

    const colorInput = document.querySelector('.color-input')
    colorInput.addEventListener('change', () => {
        setColor(colorInput.value)
        renderMeme(textInput.value)
    })
    /* -------------------------------------------------------------------------- */
    const btnIncreaseFont = document.querySelector('.btn-increase-font')
    const btnDecreaseFont = document.querySelector('.btn-decrease-font')
    btnIncreaseFont.addEventListener('click', () => {
        setSize(getMeme().size + 2)
        renderMeme(textInput.value)
    })
    btnDecreaseFont.addEventListener('click', () => {
        setSize(Math.max(getMeme().size - 2, 10))
        renderMeme(textInput.value)
    })

    /* -------------------------------------------------------------------------- */

    const downloadBtn = document.querySelector('.download-btn')
    const canvas = document.querySelector('.meme-canvas')
    downloadBtn.addEventListener('click', () => {
        const dataURL = canvas.toDataURL('image/png')
        downloadBtn.href = dataURL
    })

    /* -------------------------------------------------------------------------- */

    const switchTextBtn = document.querySelector('.switch-text-btn')
    switchTextBtn.addEventListener('click', () => {
        if (gMeme.txts.length > 0) {
            if (gMeme.selectedTxtIndex === null) {
                gMeme.selectedTxtIndex = 0
            } else {
                gMeme.selectedTxtIndex = (gMeme.selectedTxtIndex + 1) % gMeme.txts.length
            }
            // Set the input value to the currently selected text for editing
            textInput.value = gMeme.txts[gMeme.selectedTxtIndex]
            gMeme.highlightSelected = true // Indicate that a text is selected
            renderMeme()
        }
    })

    /* -------------------------------------------------------------------------- */

    document.querySelector('.deselect-switch-text-btn').addEventListener('click', () => {
        gMeme.selectedTxtIndex = null
        gMeme.highlightSelected = false
        textInput.value = ''
        renderMeme(textInput.value)
    })
})

/* -------------------------------------------------------------------------- */
