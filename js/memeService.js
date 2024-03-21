'use strict'

/* -------------------------------------------------------------------------- */

let gMeme = {
    selectedImgId: 1,
    txts: [],
    selectedTxtIndex: 0,
    size: 30,
    color: '#FFFFFF',
    highlightSelected: false,
}

/* -------------------------------------------------------------------------- */

function getMeme() {
    return gMeme
}

/* -------------------------------------------------------------------------- */

function addLineTxt(txt, x, y) {
    const line = {
        text: txt,
        x: x, // Use the clicked x position
        y: y, // Use the clicked y position
        width: null, // To be calculated during rendering
        height: gMeme.size, // Default text size
    }
    gMeme.txts.push(line)
    gMeme.selectedTxtIndex = gMeme.txts.length - 1 // Update index to new text
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
