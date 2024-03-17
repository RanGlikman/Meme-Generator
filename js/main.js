"use strict"

let gCanvas
let gCtx
let currentImage = null
function onInit() {
    gCanvas = document.querySelector("canvas")
    gCtx = gCanvas.getContext("2d")
    loadImages()
    addTextListener()
}

function onSelectImg(elImg) {
    currentImage = elImg
    drawImageAndText()
}

function drawImageAndText() {
    if (currentImage) {
        gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
        gCtx.drawImage(currentImage, 0, 0, gCanvas.width, gCanvas.height)
    }
    const text = document.querySelector(".text-input").value
    const color = document.querySelector(".color-input").value
    if (text) {
        gCtx.font = "30px Arial"
        gCtx.fillStyle = color
        gCtx.textAlign = "center"
        gCtx.fillText(text, gCanvas.width / 2, gCanvas.height - 50)
    }
}

function onDownloadCanvas(elLink) {
    const dataUrl = gCanvas.toDataURL("image/png")
    elLink.href = dataUrl
    elLink.download = "my-meme.png"
}

function addTextListener() {
    const textInput = document.querySelector(".text-input")
    textInput.addEventListener("input", drawImageAndText)
}

function loadImages() {
    const imageContainer = document.querySelector(".select-img-container")
    const numberOfImages = 10

    for (let i = 1; i <= numberOfImages; i++) {
        const img = document.createElement("img")
        img.setAttribute("src", `img/memes/${i}.jpg`)
        img.setAttribute("title", "Local img")
        img.setAttribute("onclick", "onSelectImg(this)")

        imageContainer.appendChild(img)
    }
}
