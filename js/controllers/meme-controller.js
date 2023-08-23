'use strict'

onload = onInit

var gElCanvas
var gCtx
var gSelectedColor

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    gSelectedColor = localStorage.getItem('selectedColor')
    
    if (gSelectedColor) {
        const colorPicker = document.querySelector('.color-picker')
        colorPicker.value = gSelectedColor
    }
    
    addListiners()
    loadMemeFromStorage()
    loadCurrState()
    loadSelectedImg()
    renderMeme()
}

function addListiners() {
    getEl('.text-line').addEventListener('input', onUpdateMemeText)
    getEl('.color-picker').addEventListener('input', onUpdateTextColor)
    getEl('.btn-back').addEventListener('click', hideEditor)
    getEl('.a-download').addEventListener('click', (event) => { downloadMeme(event.currentTarget) })
    getEl('.btn-increase-font').addEventListener('click', onIncreaseFontSize)
    getEl('.btn-decrease-font').addEventListener('click', onDecreaseFontSize)
}

function renderMeme() {
    const meme = getMeme()
    const memeTxt = meme.lines[0].txt
    const memeColor = meme.lines[0].color
    const memeFontSize = meme.lines[0].size

    const elImg = new Image()
    elImg.src = `img/${meme.selectedImgId}.jpg`
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, elImg.naturalWidth, elImg.naturalHeight)

        gCtx.fillStyle = memeColor
        gCtx.font = `${memeFontSize}px Arial`
        gCtx.textAlign = 'center'
        gCtx.fillText(memeTxt, gElCanvas.width / 2, 40)
    }

}

function onUpdateMemeText() {
    const newText = document.querySelector('.text-line').value
    const meme = getMeme()
    meme.lines[0].txt = newText
    saveMemeToStorage(meme)
    renderMeme()
}

function onUpdateTextColor(event) {
    const newColor = event.target.value
    const meme = getMeme()
    meme.lines[0].color = newColor
    saveMemeToStorage(meme)
    saveSelectedColorToStorage(newColor)
    renderMeme()
}

function onIncreaseFontSize() {
    const meme = getMeme()
    meme.lines[0].size += 2
    saveMemeToStorage(meme)
    renderMeme()
}

function onDecreaseFontSize() {
    const meme = getMeme()
    meme.lines[0].size -= 2
    saveMemeToStorage(meme)
    renderMeme()
}

function showEditor() {
    const elGallerySection = document.querySelector('.image-gallery')
    const elMemeEditorSection = document.querySelector('.meme-editor')

    elGallerySection.classList.add('hidden')
    elMemeEditorSection.classList.remove('hidden')

    saveStateToStorage('memeEditor')
}

function hideEditor() {
    const elGallerySection = document.querySelector('.image-gallery')
    const elMemeEditorSection = document.querySelector('.meme-editor')

    elGallerySection.classList.remove('hidden')
    elMemeEditorSection.classList.add('hidden')

    saveStateToStorage('gallery')
}

function downloadMeme(elLink) {
    const dataUrl = gElCanvas.toDataURL()
    elLink.href = dataUrl
}