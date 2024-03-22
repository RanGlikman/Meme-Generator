'use strict'

/* -------------------------------------------------------------------------- */

let gMeme = {
    selectedImgId: 1,
    txts: [],
    selectedTxtIndex: 0,
    size: 30,
    color: '#FFFFFF',
    fontFamily: 'Arial',
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
        gMeme.selectedTxtIndex = null // Reset the selected text index
    }
}

/* -------------------------------------------------------------------------- */
