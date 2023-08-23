'use strict'

onload = onInit

var gElCanvas
var gCtx

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    renderMeme()
}
function renderMeme() {
    const meme = getMeme()
    const memeTxt = meme.lines[0].txt

    const elImg = new Image()
    elImg.src = `img/${meme.selectedImgId}.jpg`
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, elImg.naturalWidth, elImg.naturalHeight)
    
        gCtx.fillStyle = 'white'
        gCtx.font = '30px Arial'
        gCtx.textAlign = 'center'
        gCtx.fillText(memeTxt, gElCanvas.width / 2, 40)
    }
}

function updateMemeText() {
    const newText = document.querySelector('.text-line').value
    const meme = getMeme()
    meme.lines[0].txt = newText
    // console.log(gMeme.lines[0].txt)
    renderMeme()
}