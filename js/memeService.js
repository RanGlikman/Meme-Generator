'use strict'

/* -------------------------------------------------------------------------- */

let gMeme = {
    selectedImgId: 1,
    txts: [],
    selectedTxtIndex: 0,
    size: 20,
    color: '#FFFFFF',
    fontFamily: 'Arial',
    highlightSelected: false,
}

/* -------------------------------------------------------------------------- */

const memeLines = [
    "When you realize it's only Tuesday",
    'Trying to explain a meme to your parents',
    'I woke up like this',
    'Send coffee, stat!',
    'Adulting is overrated',
    "So you're telling me I have a chance",
    'Not all who wander have WiFi',
    'Hold my avocado',
    "Life's a beach, and then you fry",
    'I need a six-month holiday, twice a year',
    'Why fall in love when you can fall asleep?',
    'Running late, but still great!',
    "I put the 'pro' in procrastinate",
    'Monday has been canceled, go back to sleep',
    "Trying to be a rainbow in someone's cloud",
    'Decaf? No, thanks',
    'Reality called, so I hung up',
    "Can't adult today, try again tomorrow",
]

/* -------------------------------------------------------------------------- */

function getMeme() {
    return gMeme
}

/* -------------------------------------------------------------------------- */

function addLineTxt(txt, x, y) {
    const line = {
        text: txt,
        x: x,
        y: y,
        width: null,
        height: gMeme.size,
        fontFamily: gMeme.fontFamily,
    }
    gMeme.txts.push(line)
    gMeme.selectedTxtIndex = gMeme.txts.length - 1
}

/* -------------------------------------------------------------------------- */

function setImage(id) {
    gMeme.selectedImgId = id
}

/* -------------------------------------------------------------------------- */

function setSize(size) {
    gMeme.size = size
}

/* -------------------------------------------------------------------------- */

function setColor(color) {
    gMeme.color = color
}

/* -------------------------------------------------------------------------- */

function deleteSelectedLine() {
    if (gMeme.selectedTxtIndex !== null) {
        gMeme.txts.splice(gMeme.selectedTxtIndex, 1)
        gMeme.selectedTxtIndex = null
    }
}

/* -------------------------------------------------------------------------- */

function generateRandomMeme() {
    const randomId = Math.floor(Math.random() * TOTAL_IMAGES) + 1
    setImage(randomId)

    gMeme.txts = []

    let randomLineIndex = Math.floor(Math.random() * memeLines.length)
    let randomLine1 = memeLines[randomLineIndex]

    do {
        randomLineIndex = Math.floor(Math.random() * memeLines.length)
    } while (randomLineIndex === memeLines.indexOf(randomLine1))

    let randomLine2 = memeLines[randomLineIndex]

    addLineTxt(randomLine1, 250, 50)
    addLineTxt(randomLine2, 250, 450)
    gMeme.selectedTxtIndex = null
    renderMeme()
}

/* -------------------------------------------------------------------------- */
