'use strict'

document.addEventListener('DOMContentLoaded', () => {
    renderGallery()

    const textInput = document.querySelector('.text-input')
    textInput.addEventListener('input', () => {
        gMeme.highlightSelected = false
        renderMeme(textInput.value)
    })

    textInput.addEventListener('keydown', event => {
        if (event.key === 'Enter') {
            event.preventDefault() //?
            addLineTxt(textInput.value)
            textInput.value = ''
            renderMeme()
        }
    })

    const colorInput = document.querySelector('.color-input')
    colorInput.addEventListener('change', () => {
        setColor(colorInput.value)
        renderMeme(textInput.value)
    })

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

    const downloadBtn = document.querySelector('.download-btn')
    const canvas = document.querySelector('.meme-canvas')
    downloadBtn.addEventListener('click', () => {
        const dataURL = canvas.toDataURL('image/png')
        downloadBtn.href = dataURL
    })

    document.querySelector('.switch-text-btn').addEventListener('click', () => {
        const textInput = document.querySelector('.text-input')
        if (textInput.value.trim() !== '') {
            addLineTxt(textInput.value)
            textInput.value = ''
            gMeme.selectedTxtIndex = gMeme.txts.length - 1
            gMeme.highlightSelected = true
        } else if (gMeme.txts.length > 0) {
            gMeme.selectedTxtIndex = (gMeme.selectedTxtIndex + 1) % gMeme.txts.length
            gMeme.highlightSelected = true
        }
        console.log(`Current selected text index: ${gMeme.selectedTxtIndex}`)
        renderMeme()
    })

    document.querySelector('.deselect-switch-text-btn').addEventListener('click', () => {
        gMeme.highlightSelected = false
        renderMeme(textInput.value)
    })
})
