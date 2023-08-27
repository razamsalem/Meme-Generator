'use strict'

function renderGallery() {
    const elImgSection = document.querySelector('.images')

    let strHtml = ''
    for (let i = 1; i <= 27; i++) {
        const imgContainerClass = i % 2 === 1 ? 'image-container odd' : 'image-container even'
        strHtml += `<div class="${imgContainerClass}"><img src="img/${i}.jpg" onclick="onImgSelect(${i}); showEditor()"></div>`
    }
    elImgSection.innerHTML = strHtml
}

function onImgSelect(id) {
    setImg(id)
    saveSelectedImgToStorage(id)
    renderMeme()
}

