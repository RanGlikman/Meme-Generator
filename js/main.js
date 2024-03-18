'use strict'

document.addEventListener('DOMContentLoaded', () => {
    renderGallery()

    const textInput = document.querySelector('.text-input')
    textInput.addEventListener('input', () => {
        setLineTxt(textInput.value)
        renderMeme()
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
