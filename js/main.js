'use strict'

document.addEventListener('DOMContentLoaded', () => {
    renderGallery()

    const textInput = document.querySelector('.text-input')
    textInput.addEventListener('input', () => {
        renderMeme(textInput.value)
    })
    textInput.addEventListener('keydown', event => {
        if (event.key === 'Enter') {
            event.preventDefault() // Prevent the default action to avoid form submission //?
            addLineTxt(textInput.value)
            renderMeme()
            textInput.value = ''
        }
    })

    const colorInput = document.querySelector('.color-input')
    colorInput.addEventListener('change', () => {
        setColor(colorInput.value)
        renderMeme()
    })

    const btnIncreaseFont = document.querySelector('.btn-increase-font')
    const btnDecreaseFont = document.querySelector('.btn-decrease-font')
    btnIncreaseFont.addEventListener('click', () => {
        setSize(getMeme().size + 2)
        renderMeme()
    })
    btnDecreaseFont.addEventListener('click', () => {
        setSize(Math.max(getMeme().size - 2, 10))
        renderMeme()
    })

    const downloadBtn = document.querySelector('.download-btn')
    const canvas = document.querySelector('.meme-canvas')
    downloadBtn.addEventListener('click', () => {
        const dataURL = canvas.toDataURL('image/png')
        downloadBtn.href = dataURL
    })
})

document.querySelector('.switch-text-btn').addEventListener('click', () => {
    if (gMeme.txts.length > 0) {
        gMeme.selectedTxtIndex = (gMeme.selectedTxtIndex + 1) % gMeme.txts.length
        gMeme.highlightSelected = true
        console.log(`Current selected text index: ${gMeme.selectedTxtIndex}`)
        renderMeme()
    }
})

document.querySelector('.deselect-switch-text-btn').addEventListener('click', () => {
    gMeme.highlightSelected = false
    renderMeme()
})
