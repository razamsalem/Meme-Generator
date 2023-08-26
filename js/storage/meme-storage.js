'use strict'

const STORAGE_KEY = 'memeDB'
const LIKED_KEY = 'likedMemeDB'
const COLOR_KEY = 'selectedColor'
const SELECTED_IMG_KEY = 'selectedImgId'
const STATE_KEY = 'currState'

function saveMemeToStorage(meme) {
    saveToStorage(STORAGE_KEY, meme)
}

function saveLikedMemeToStorage(meme) {
    const savedMemes = loadLikedMemesFromStorage() || []
    savedMemes.push(meme)
    saveToStorage(LIKED_KEY, savedMemes)
}

function saveSelectedColorToStorage(color) {
    localStorage.setItem(COLOR_KEY, color)
}

function saveSelectedImgToStorage(id) {
    localStorage.setItem(SELECTED_IMG_KEY, id)
}

function saveStateToStorage(state) {
    localStorage.setItem(STATE_KEY, state)
}

function saveToStorage(key, val) {
    const json = JSON.stringify(val)
    localStorage.setItem(key, json)
}

//---------------------------------\\
function loadMemeFromStorage() {
    const savedMeme = loadFromStorage(STORAGE_KEY)
    if (savedMeme) {
        gMeme = savedMeme
    }
}

function loadLikedMemesFromStorage() {
    return loadFromStorage(LIKED_KEY)
}

function loadSelectedImg() {
    const selectedImg = localStorage.getItem('selectedImgId')
    if (selectedImg) {
        setImg(parseInt(selectedImg))
    }
}


function loadCurrState() {
    const currentState = localStorage.getItem('currState')
    if (currentState === 'memeEditor') showEditor()
    else showGallery()
}


function loadFromStorage(key) {
    const json = localStorage.getItem(key)
    return JSON.parse(json)
}