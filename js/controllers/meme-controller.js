'use strict'

let gElCanvas
let gCtx
let gSelectedColor
let gGradient

onload = onInit

function onInit() {
    
    gElCanvas = getEl('canvas')
    gCtx = gElCanvas.getContext('2d')
    gSelectedColor = localStorage.getItem('selectedColor')

    if (gSelectedColor) {
        const colorPicker = document.querySelector('.color-picker')
        colorPicker.value = gSelectedColor
    }
    renderGallery()
    addListiners()
    loadMemeFromStorage()
    loadCurrState()
    loadSelectedImg()
    renderMeme()
    renderSavedMemes()
}

function addListiners() {
    generalListiners()
    controlsListiners()
    navBarListiners()
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
            gCtx.font = `${line.size}px ${line.fontFamily}`
            gCtx.textAlign = line.textAlign || 'center'
            const lineY = line.y
            gCtx.fillText(line.txt, gElCanvas.width / 2, lineY)

            if (idx === meme.selectedLineIdx) {
                const textWidth = gElCanvas.width * 1
                gCtx.fillStyle = 'rgba(255, 255, 255, 0.4)'
                gCtx.fillRect(
                    (gElCanvas.width - textWidth) / 2 - 10,
                    lineY - line.size,
                    textWidth + 20,
                    line.size + 10
                )
            }

        })
    }

    if (meme.lines.length > 1) {
        getEl('.btn-remove-line').classList.remove('hidden')
    } else {
        getEl('.btn-remove-line').classList.add('hidden')
    }

    if (selectedLine) {
        getEl('.font-family-select').value = selectedLine.fontFamily
        getEl('.text-line').value = selectedLine.txt
        getEl('.color-picker').value = selectedLine.color

    }
}

function renderSavedMemes() {
    const elSavedMemesSection = document.querySelector('.saved-memes .images')
    const savedMemes = loadLikedMemesFromStorage()
    let strHTMLs = ''

    if (savedMemes) {
        savedMemes.forEach((meme, idx) => {
            strHTMLs += `
                <div class="saved-meme" onclick="onSavedMemeSelect(${idx}); showEditor()">
                <canvas class="saved-meme-canvas" width="450" height="450"></canvas>
            </div>
                `
        })
    }
    elSavedMemesSection.innerHTML = strHTMLs

    savedMemes.forEach((meme, idx) => {
        const canvas = document.querySelectorAll('.saved-meme-canvas')[idx]
        const ctx = canvas.getContext('2d')
        renderSavedMemeOnCanvas(meme, canvas, ctx)
    })
}

// Save the meme to the saved memes section
function onSavedMemeSelect(idx) {
    const savedMemes = loadLikedMemesFromStorage()
    const selectedMeme = savedMemes[idx]

    gMeme = selectedMeme
    saveSelectedImgToStorage(selectedMeme.selectedImgId)

    gMeme.lines = selectedMeme.lines

    renderMeme()
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

function onUpdateFontFamily() {
    const selectedFont = getEl('.font-family-select').value
    const meme = getMeme()
    meme.lines[meme.selectedLineIdx].fontFamily = selectedFont
    saveMemeToStorage(meme)
    renderMeme()
}

function onUpdateTextAlignment(alignment) {
    const meme = getMeme()
    meme.lines[meme.selectedLineIdx].textAlign = alignment
    saveMemeToStorage(meme)
    renderMeme()
}

function onAddLine() {
    const newLine = {
        txt: 'Your Text',
        size: 20,
        color: '#ffffff',
        fontFamily: 'Impact',
        y: 250
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
    flashMsg('The line has been deleted')
    saveMemeToStorage(meme)
    renderMeme()
}

function onMoveLineUp() {
    const meme = getMeme()
    if (meme.selectedLineIdx !== -1) {
        meme.lines[meme.selectedLineIdx].y -= 50
        saveMemeToStorage(meme)
        renderMeme()
    }
}

function onMoveLineDown() {
    const meme = getMeme()
    if (meme.selectedLineIdx !== -1) {
        meme.lines[meme.selectedLineIdx].y += 50
        saveMemeToStorage(meme)
        renderMeme()
    }
}

//generating randome meme for "I'm Flexible" button
function generateRandomMeme() {
    const meme = getMeme()
    const randomImgId = getRandomImgId()
    setImg(randomImgId)

    const line1 = {
        txt: 'Line 1',
        size: 20,
        color: '#ffffff',
        fontFamily: 'Impact',
        y: 50
    }
    const line2 = {
        txt: 'Line 2',
        size: 20,
        color: '#ffffff',
        fontFamily: 'Impact',
        y: 450
    }

    meme.lines = [line1, line2]
    meme.selectedLineIdx = 0
    saveMemeToStorage(meme)
    renderMeme()
    showEditor()
}

// Deselecting the text for not show the select effect when downloading (or when cliking outside the text)
function deselectText() {
    const meme = getMeme()
    meme.selectedLineIdx = -1
    saveMemeToStorage(meme)
    renderMeme()
}

function onStickerClick(event) {
    const sticker = event.target.closest('.sticker')
    if (!sticker) return

    const emoji = sticker.textContent
    const meme = getMeme()

    const newLine = {
        txt: emoji,
        size: 20,
        color: '#ffffff',
        fontFamily: 'Impact',
        y: 100
    }

    meme.lines.push(newLine)
    meme.selectedLineIdx = meme.lines.length - 1

    saveMemeToStorage(meme)
    renderMeme()
}

// Option to scroll via the mouse wheel
function onScrollingEmojis(event) {
    const stickerContainer = getEl('.stickers-container')
    const scrollAmount = event.deltaY

    stickerContainer.scrollLeft += scrollAmount
    event.preventDefault()
}

function onSaveLikedMeme() {
    const elLikeBtn = getEl('.btn-like')
    elLikeBtn.innerHTML = '<i class="fa-solid fa-heart fa-beat fa-xl" style="color: #ff0000;"></i>'
    setTimeout(() => {
        elLikeBtn.innerHTML = '<i class="fa-solid fa-heart fa-xl" style="color: #ff0000;"></i>'
    }, 1000)
    flashMsg('Meme successfully saved')
    const meme = getMeme()
    saveLikedMemeToStorage(meme)
    renderSavedMemes()
}

// Open the help center
function onClickHelpCenter() {
    const elInstruction = getEl('.insturctions')
    const elCaretUp = getEl('.fa-caret-up')
    const elCaretDown = getEl('.fa-caret-down')
    
    elInstruction.classList.toggle('hidden')
    elCaretUp.classList.toggle('hidden')
    elCaretDown.classList.toggle('hidden')
}

function onCanvasClick(event) {
    const canvasPos = gElCanvas.getBoundingClientRect()
    const canvasX = event.clientX - canvasPos.left
    const canvasY = event.clientY - canvasPos.top
    const meme = getMeme()

    meme.selectedLineIdx = -1

    meme.lines.forEach((line, idx) => {
        const lineY = line.y - line.size
        const lineHeight = line.size + 10

        if (
            canvasX >= (gElCanvas.width - gCtx.measureText(line.txt).width) / 2 - 10 &&
            canvasX <= (gElCanvas.width + gCtx.measureText(line.txt).width) / 2 + 10 &&
            canvasY >= lineY &&
            canvasY <= lineY + lineHeight
        ) {
            meme.selectedLineIdx = idx
            renderMeme()
            return
        }
    })

    if (meme.selectedLineIdx === -1) {
        renderMeme()
    }
}

function renderSavedMemeOnCanvas(meme, canvas, ctx) {
    const elImg = new Image()
    elImg.src = `img/${meme.selectedImgId}.jpg`
    elImg.onload = () => {
        ctx.drawImage(elImg, 0, 0, canvas.width, canvas.height)

        meme.lines.forEach(line => {
            ctx.fillStyle = line.color
            ctx.font = `${line.size}px ${line.fontFamily}`
            ctx.textAlign = line.textAlign || 'center'
            ctx.fillText(line.txt, canvas.width / 2, line.y)
        })
    }
}

function generalListiners() {
    gElCanvas.addEventListener('click', onCanvasClick)
    gElCanvas.addEventListener('mousedown', onCanvasClick)
    gElCanvas.addEventListener('touchstart', onCanvasClick)
    document.addEventListener('click', (event) => {
        if (!event.target.closest('.main-nav') && !event.target.closest('.hamburger')) {
            hamburger.classList.remove('active')
            navMenu.classList.remove('active')
        }
    })
}



function controlsListiners() {
    getEl('.btn-flexible').addEventListener('click', generateRandomMeme)
    getEl('.btn-back').addEventListener('click', showGallery)
    getEl('.text-line').addEventListener('input', onUpdateMemeText)
    getEl('.color-picker').addEventListener('input', onUpdateTextColor)
    getEl('.btn-increase-font').addEventListener('click', onIncreaseFontSize)
    getEl('.btn-decrease-font').addEventListener('click', onDecreaseFontSize)
    getEl('.btn-add-line').addEventListener('click', onAddLine)
    getEl('.btn-switch-line').addEventListener('click', onSwitchLine)
    getEl('.btn-remove-line').addEventListener('click', onRemoveLine)
    getEl('.font-family-select').addEventListener('change', onUpdateFontFamily)
    getEl('.btn-align-left').addEventListener('click', () => onUpdateTextAlignment('left'))
    getEl('.btn-align-center').addEventListener('click', () => onUpdateTextAlignment('center'))
    getEl('.btn-align-right').addEventListener('click', () => onUpdateTextAlignment('right'))
    getEl('.btn-move-up').addEventListener('click', onMoveLineUp)
    getEl('.btn-move-down').addEventListener('click', onMoveLineDown)
    getEl('.stickers-container').addEventListener('click', onStickerClick)
    getEl('.stickers-container').addEventListener('wheel', onScrollingEmojis)
    getEl('.a-download').addEventListener('mouseover', () => { deselectText() })
    getEl('.a-download').addEventListener('click', (event) => { onDownloadMeme(event.currentTarget) })
    getEl('.btn-like').addEventListener('click', onSaveLikedMeme)
    getEl('.help-center').addEventListener('click', onClickHelpCenter)
    getEl('.btn-upload').addEventListener('mouseover',() => { deselectText() })
    getEl('.btn-upload').addEventListener('click', onUploadImg)
    filterInput.addEventListener('input', () => {
        const filterValue = filterInput.value.toLowerCase()
        const imgs = document.querySelectorAll('.img-item')
    
        imgs.forEach(img => {
            const keywords = gImgs[img.dataset.idx].keywords
            if (keywords.some(keyword => keyword.includes(filterValue))) {
                img.style.display = 'inline'
            } else {
                img.style.display = 'none'
            }
        })
    })
}

function navBarListiners() {
    getEl('.logo').addEventListener('click', showGallery)
    getEl('.gallery-link').addEventListener('click', showGallery)
    getEl('.saved-memes-link').addEventListener('click', showSavedMemes)
    getEl('.about-link').addEventListener('click', showAbout)
    getEl('.hamburger').addEventListener('click', () => { hamburger.classList.toggle('active'); navMenu.classList.toggle('active') })
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active')
            navMenu.classList.remove('active')
        })
    })
}

function showEditor() {
    const elGallerySection = getEl('.image-gallery')
    const elMemesSection = getEl('.saved-memes')
    const elMemeEditorSection = getEl('.meme-editor')
    const elAboutSection = getEl('.about')

    elGallerySection.classList.add('hidden')
    elMemesSection.classList.add('hidden')
    elAboutSection.classList.add('hidden')
    elMemeEditorSection.classList.remove('hidden')

    saveStateToStorage('memeEditor')
}

function showGallery() {

    const elGallerySection = getEl('.image-gallery')
    const elMemesSection = getEl('.saved-memes')
    const elMemeEditorSection = getEl('.meme-editor')
    const elAboutSection = getEl('.about')

    elGallerySection.classList.remove('hidden')
    elMemesSection.classList.add('hidden')
    elMemeEditorSection.classList.add('hidden')
    elAboutSection.classList.add('hidden')

    saveStateToStorage('gallery')
}

function showSavedMemes() {
    const elMemesSection = getEl('.saved-memes')
    const elGallerySection = getEl('.image-gallery')
    const elMemeEditorSection = getEl('.meme-editor')
    const elAboutSection = getEl('.about')

    elGallerySection.classList.add('hidden')
    elMemesSection.classList.remove('hidden')
    elMemeEditorSection.classList.add('hidden')
    elAboutSection.classList.add('hidden')
}

function showAbout() {
    const elGallerySection = getEl('.image-gallery')
    const elMemesSection = getEl('.saved-memes')
    const elMemeEditorSection = getEl('.meme-editor')
    const elAboutSection = getEl('.about')

    elGallerySection.classList.add('hidden')
    elMemesSection.classList.add('hidden')
    elMemeEditorSection.classList.add('hidden')
    elAboutSection.classList.remove('hidden')

}

function flashMsg(msg) {
    const elMsg = document.querySelector('.user-msg')

    elMsg.innerText = msg
    elMsg.classList.add('open')
    setTimeout(() => elMsg.classList.remove('open'), 3000)
}

function onUploadImg() {
    const imgDataUrl = gElCanvas.toDataURL('image/jpeg') 

    function onSuccess(uploadedImgUrl) {
        const url = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${url}`)
    }
    doUploadImg(imgDataUrl, onSuccess)
}

function doUploadImg(imgDataUrl, onSuccess) {

    const formData = new FormData()
    formData.append('img', imgDataUrl)


    const XHR = new XMLHttpRequest()
    XHR.onreadystatechange = () => {

        if (XHR.readyState !== XMLHttpRequest.DONE) return

        if (XHR.status !== 200) return console.error('Error uploading image')
        const { responseText: url } = XHR

        console.log('Got back live url:', url)
        onSuccess(url)
    }
    XHR.onerror = (req, ev) => {
        console.error('Error connecting to server with request:', req, '\nGot response data:', ev)
    }
    XHR.open('POST', '//ca-upload.com/here/upload.php')
    XHR.send(formData)
}

function onDownloadMeme(elLink) {
    const dataUrl = gElCanvas.toDataURL()
    elLink.href = dataUrl
    flashMsg('Meme downloaded successfully')
}