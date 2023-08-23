'use strict'

onload = onInit

let gElCanvas
let gCtx

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    renderMeme()
}
function renderMeme() {
    const elImg = new Image()
    elImg.src = 'img/1.jpg'
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, elImg.naturalWidth, elImg.naturalHeight)    }
}