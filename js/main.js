'use strict'

document.addEventListener('DOMContentLoaded', () => {
    renderGallery()
    const canvas = document.querySelector('.meme-canvas')
    const textInput = document.querySelector('.text-input')

    /* -------------------------------------------------------------------------- */

    textInput.addEventListener('input', () => {
        // Ensure the index is within bounds and the element exists
        if (
            gMeme.selectedTxtIndex !== null &&
            gMeme.selectedTxtIndex >= 0 &&
            gMeme.selectedTxtIndex < gMeme.txts.length &&
            gMeme.txts[gMeme.selectedTxtIndex]
        ) {
            gMeme.txts[gMeme.selectedTxtIndex].text = textInput.value // Update text
            renderMeme()
        } else {
            // Handle cases where there is no valid selection
            gMeme.selectedTxtIndex = null // Reset selected index
            renderMeme(textInput.value) // Show the typed text on canvas without adding to the array
        }
    })

    /* -------------------------------------------------------------------------- */

    textInput.addEventListener('keydown', event => {
        if (event.key === 'Enter') {
            event.preventDefault()
            const trimmedText = textInput.value.trim()

            if (trimmedText !== '') {
                if (gMeme.selectedTxtIndex !== null) {
                    gMeme.txts[gMeme.selectedTxtIndex].text = trimmedText // Update the text property
                } else {
                    addLineTxt(trimmedText) // Add a new line as an object
                }
                textInput.value = ''
                gMeme.selectedTxtIndex = null
                textInput.setAttribute('disabled', true) // Disable the text input field
                textInput.placeholder = 'Click meme to type/edit text' // Change placeholder when disabled
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

    // Event listener for increasing font size
    document.querySelector('.btn-increase-font').addEventListener('click', () => {
        if (gMeme.selectedTxtIndex !== null && gMeme.txts[gMeme.selectedTxtIndex]) {
            gMeme.txts[gMeme.selectedTxtIndex].height += 2
            renderMeme()
        }
    })

    /* -------------------------------------------------------------------------- */

    // Event listener for decreasing font size
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
            textInput.value = gMeme.txts[gMeme.selectedTxtIndex].text // Update input field with selected text
            renderMeme()
        }
    })

    /* -------------------------------------------------------------------------- */

    document.querySelector('.deselect-switch-text-btn').addEventListener('click', () => {
        gMeme.selectedTxtIndex = null
        textInput.value = ''
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
        gMeme.txts.forEach((line, index) => {
            if (
                x >= line.x - line.width / 2 &&
                x <= line.x + line.width / 2 &&
                y >= line.y - line.height &&
                y <= line.y
            ) {
                // Existing text is clicked
                gMeme.selectedTxtIndex = index
                textInput.value = line.text // Update the input field
                existingTextClicked = true
                renderMeme()
            }
        })

        if (!existingTextClicked) {
            // Create a new text line at the clicked position
            addLineTxt('', x, y)
            gMeme.selectedTxtIndex = gMeme.txts.length - 1
            textInput.value = ''
            textInput.focus() // Focus on the input field for immediate typing
            renderMeme()
        }
    })

    /* -------------------------------------------------------------------------- */

    document.body.addEventListener(
        'click',
        function (event) {
            // Check if the clicked element is not the text input, canvas, or any control button
            if (
                !event.target.matches(
                    '.text-input, .meme-canvas, .buttons button, .color-input, .download-btn'
                )
            ) {
                // Clear and disable the text input field
                textInput.value = ''
                textInput.setAttribute('disabled', true)
                textInput.placeholder = 'Click meme to type/edit text' // Set the placeholder text
                gMeme.selectedTxtIndex = null // Deselect any text
                renderMeme() // Re-render the meme to reflect the deselected text
            }
        },
        true
    )

    document.querySelector('.select-another-meme-btn').addEventListener('click', () => {
        document.querySelector('.gallery').style.display = 'block'
        document.querySelector('.editor').style.display = 'none'
    })

    /* -------------------------------------------------------------------------- */
})

/* -------------------------------------------------------------------------- */

// Delivery4