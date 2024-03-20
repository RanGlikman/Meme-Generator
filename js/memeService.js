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

function addLineTxt(txt) {
    if (txt.trim() !== '') {
        gMeme.txts.push(txt)
        gMeme.selectedTxtIndex = gMeme.txts.length - 1 // Select the new line
    }
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
