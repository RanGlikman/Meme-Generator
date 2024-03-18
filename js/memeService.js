'use strict'

let gMeme = {
    selectedImgId: 1,
    txt: '',
    size: 30,
    color: '#FFFFFF',
}

function getMeme() {
    return gMeme
}

function setLineTxt(txt) {
    gMeme.txt = txt
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
