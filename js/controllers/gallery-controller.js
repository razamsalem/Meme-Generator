'use strict'

renderGallery()

function renderGallery() {
    // console.log('renderGallery checkV')

    const elImgSection = document.querySelector('.images')

    let strHtml = ''
    for (let i = 1; i <= 18; i++) {
        strHtml += `<img src="img/${i}.jpg" onclick="onImgSelect(${i}); showEditor()">`
    }
    elImgSection.innerHTML = strHtml
}

function onImgSelect(id) {
    setImg(id)
    renderMeme()
}

