'use strict'

onload = onInit

var gElCanvas
var gCtx

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    addListiners()
    renderMeme()
}

function addListiners() {
    getEl('.text-line').addEventListener('input', updateMemeText)
    getEl('.btn-back').addEventListener('click', hideEditor)
    getEl('.a-download').addEventListener('click', (event) => { downloadMeme(event.currentTarget) })
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
    renderMeme()
}

function showEditor() {
    const elGallerySection = document.querySelector('.image-gallery')
    const elMemeEditorSection = document.querySelector('.meme-editor')

    elGallerySection.classList.add('hidden')
    elMemeEditorSection.classList.remove('hidden')
}

function hideEditor() {
    const elGallerySection = document.querySelector('.image-gallery')
    const elMemeEditorSection = document.querySelector('.meme-editor')

    elGallerySection.classList.remove('hidden')
    elMemeEditorSection.classList.add('hidden')
}

function downloadMeme(elLink) {
    const dataUrl = gElCanvas.toDataURL()
    elLink.href = dataUrl
}