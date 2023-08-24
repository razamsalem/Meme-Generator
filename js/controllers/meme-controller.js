'use strict'

onload = onInit


let gElCanvas
let gCtx
let gSelectedColor

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

    //General
    gElCanvas.addEventListener('click', onCanvasClick)
    gElCanvas.addEventListener('touchstart', onCanvasClick)
    document.addEventListener('click', (event) => {
        if (!event.target.closest('.main-nav') && !event.target.closest('.hamburger')) {
            hamburger.classList.remove('active')
            navMenu.classList.remove('active')
        }
    })

    //Controls
    getEl('.btn-back').addEventListener('click', hideEditor)
    getEl('.text-line').addEventListener('input', onUpdateMemeText)
    getEl('.color-picker').addEventListener('input', onUpdateTextColor)
    getEl('.btn-increase-font').addEventListener('click', onIncreaseFontSize)
    getEl('.btn-decrease-font').addEventListener('click', onDecreaseFontSize)
    getEl('.btn-add-line').addEventListener('click', onAddLine)
    getEl('.btn-switch-line').addEventListener('click', onSwitchLine)
    getEl('.btn-remove-line').addEventListener('click', onRemoveLine)
    getEl('.a-download').addEventListener('mouseover', () => { deselectText() })
    getEl('.a-download').addEventListener('click', (event) => { downloadMeme(event.currentTarget) })

    //Nav
    getEl('.logo').addEventListener('click', hideEditor)
    getEl('.gallery-link').addEventListener('click', hideEditor)
    getEl('.about-link').addEventListener('click', showAbout)
    getEl('.hamburger').addEventListener('click', () => { hamburger.classList.toggle('active'); navMenu.classList.toggle('active') })

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
                gCtx.strokeStyle = 'black'
                gCtx.lineWidth = 2
                gCtx.strokeRect(10, 20 + idx * 40 - line.size + 20, gElCanvas.width - 20, line.size + 10)
            }

        })
    }

    if (meme.lines.length > 1) {
        getEl('.btn-remove-line').classList.remove('hidden')
    } else {
        getEl('.btn-remove-line').classList.add('hidden')
    }

    if (selectedLine) {
        getEl('.text-line').value = selectedLine.txt
        getEl('.color-picker').value = selectedLine.color
    }
}

function onUpdateMemeText() {
    const newText = document.querySelector('.text-line').value
    const meme = getMeme()

    if (meme.selectedLineIdx !== -1) {
        meme.lines[meme.selectedLineIdx].txt = newText
        saveMemeToStorage(meme)
        renderMeme()
    }
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

function deselectText() {
    const meme = getMeme()
    meme.selectedLineIdx = -1
    saveMemeToStorage(meme)
    renderMeme()
}

function onCanvasClick(event) {
    const canvasPos = gElCanvas.getBoundingClientRect()
    let canvasX
    let canvasY

    if (event.type === 'click') {
        canvasX = event.clientX - canvasPos.left
        canvasY = event.clientY - canvasPos.top
    } else if (event.type === 'touchstart') {
        const touch = event.touches[0]
        canvasX = touch.clientX - canvasPos.left
        canvasY = touch.clientY - canvasPos.top
    }

    const meme = getMeme()
    let clickedOnText = false

    meme.lines.forEach((line, idx) => {
        const lineY = 40 + idx * 40
        if (
            canvasX >= 10 &&
            canvasX <= gElCanvas.width - 10 &&
            canvasY >= lineY - line.size &&
            canvasY <= lineY
        ) {
            clickedOnText = true
            meme.selectedLineIdx = idx
            renderMeme()
        }
    })

    if (!clickedOnText) {
        meme.selectedLineIdx = -1
        renderMeme()
    }
}

function showEditor() {
    const elGallerySection = document.querySelector('.image-gallery')
    const elMemeEditorSection = document.querySelector('.meme-editor')
    const elAboutSection = document.querySelector('.about')

    elGallerySection.classList.add('hidden')
    elAboutSection.classList.add('hidden')
    elMemeEditorSection.classList.remove('hidden')

    saveStateToStorage('memeEditor')
}

function hideEditor() {
    const elGallerySection = document.querySelector('.image-gallery')
    const elMemeEditorSection = document.querySelector('.meme-editor')
    const elAboutSection = document.querySelector('.about')

    elGallerySection.classList.remove('hidden')
    elMemeEditorSection.classList.add('hidden')
    elAboutSection.classList.add('hidden')

    saveStateToStorage('gallery')
}

function showAbout() {
    const elGallerySection = document.querySelector('.image-gallery')
    const elMemeEditorSection = document.querySelector('.meme-editor')
    const elAboutSection = document.querySelector('.about')

    elGallerySection.classList.add('hidden')
    elMemeEditorSection.classList.add('hidden')
    elAboutSection.classList.remove('hidden')

}

function downloadMeme(elLink) {
    const dataUrl = gElCanvas.toDataURL()
    elLink.href = dataUrl
}