'use strict'

let gDataIdx = 0

function renderGallery() {
    const elImgSection = document.querySelector('.images')

    let strHtml = ''
    for (let i = 1; i <= 27; i++) {
        const imgContainerClass = i % 2 === 1 ? 'image-container odd' : 'image-container even'
        strHtml += `<div class="${imgContainerClass}"><img src="img/${i}.jpg" data-idx="${gDataIdx++}" class="img-item" onclick="onImgSelect(${i}); showEditor()"></div>`
    }
    elImgSection.innerHTML = strHtml
}

function onImgSelect(id) {
    setImg(id)
    saveSelectedImgToStorage(id)
    renderMeme()
}

function populateDatalist() {
    const keywordsSet = new Set()
    const imgs = getImgs()
    const elDatalist = getEl('#imgKeywords') 

    imgs.forEach(img => img.keywords.forEach(keyword => keywordsSet.add(keyword)))
    elDatalist.innerHTML = ''
    keywordsSet.forEach(keyword => {
        const option = document.createElement('option')
        option.value = keyword
        elDatalist.appendChild(option)
    })
}