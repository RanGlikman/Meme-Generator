'use strict'

let gMeme = {
    selectedImgId: 1,
    txts: [],
    size: 30,
    color: '#FFFFFF',
}

function getMeme() {
    return gMeme
}

function addLineTxt(txt) {
    if (txt.trim() !== '') {
        gMeme.txts.push(txt)
    }
}

function setImage(id) {
    gMeme.selectedImgId = id
}

function setSize(size) {
    gMeme.size = size
}

function setColor(color) {
    gMeme.color = color
}
