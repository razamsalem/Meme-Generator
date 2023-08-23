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
    getEl('.btn-add-line').addEventListener('click', onAddLine)
    getEl('.btn-switch-line').addEventListener('click', onSwitchLine)
    getEl('.btn-remove-line').addEventListener('click', onRemoveLine)
}

function renderMeme() {
    const meme = getMeme()
    const selectedLine = meme.lines[meme.selectedLineIdx]

    const elImg = new Image()
    elImg.src = `img/${meme.selectedImgId}.jpg`
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, elImg.naturalWidth, elImg.naturalHeight)

        meme.lines.forEach((line, idx) => {
            gCtx.fillStyle = line.color
            gCtx.font = `${line.size}px Arial`
            gCtx.textAlign = 'center'
            gCtx.fillText(line.txt, gElCanvas.width / 2, 40 + idx * 40)

            if (idx === meme.selectedLineIdx) {
                gCtx.strokeSyle = 'black'
                gCtx.lineWifth = 2
                gCtx.strokeRect(10, 20 + idx * 40 - line.size + 20, gElCanvas.width - 20, line.size + 10)
            }
        })
    }

    if (meme.lines.length > 1) {
        getEl('.btn-remove-line').classList.remove('hidden')
    } else {
        getEl('.btn-remove-line').classList.add('hidden')
    }

    getEl('.text-line').value = selectedLine.txt
    getEl('.color-picker').value = selectedLine.color
}

function onUpdateMemeText() {
    const newText = document.querySelector('.text-line').value
    const meme = getMeme()
    meme.lines[meme.selectedLineIdx].txt = newText
    saveMemeToStorage(meme)
    renderMeme()
}

function onUpdateTextColor(event) {
    const newColor = event.target.value
    const meme = getMeme()
    meme.lines[meme.selectedLineIdx].color = newColor
    saveMemeToStorage(meme)
    saveSelectedColorToStorage(newColor)
    renderMeme()
}

function onIncreaseFontSize() {
    const meme = getMeme()
    if (meme.lines[meme.selectedLineIdx].size === 60) return
    meme.lines[meme.selectedLineIdx].size += 2
    saveMemeToStorage(meme)
    renderMeme()
}

function onDecreaseFontSize() {
    const meme = getMeme()
    if (meme.lines[meme.selectedLineIdx].size === 2) return
    meme.lines[meme.selectedLineIdx].size -= 2
    saveMemeToStorage(meme)
    renderMeme()
}

function onAddLine() {
    const newLine = {
        txt: 'Your Text',
        size: 20,
        color: '#ffffff'
    }

    const meme = getMeme()
    meme.lines.push(newLine)
    meme.selectedLineIdx = meme.lines.length - 1

    saveMemeToStorage(meme)
    renderMeme()
}

function onSwitchLine() {
    const meme = getMeme()
    meme.selectedLineIdx = (meme.selectedLineIdx + 1) % meme.lines.length
    saveMemeToStorage(meme)
    renderMeme()
}

function onRemoveLine() {
    const meme = getMeme()
    if (meme.lines.length <= 1) return
    meme.lines.splice(meme.selectedLineIdx, 1)
    meme.selectedLineIdx = Math.max(0, meme.selectedLineIdx - 1)
    
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