'use strict'

function showRealTimeAge(newVal) {
    const elAgeSpan = document.querySelector('.RealTimeAge').innerHTML = newVal
}

function makeId(length = 6) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    var txt = ''
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}

function makeNumId(length = 8) {
    const possible = '0123456789'
    var numId = ''
    for (var i = 0; i < length; i++) {
        numId += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return numId
}

function capitalizeFirstLetterAndLowerOthers(inputString) {
    return inputString.toLowerCase().replace(/(?:^|\s)\S/g, function (match) {
        return match.toUpperCase()
    })
}

function capitalizeWords(inputString) {
    return inputString.replace(/(?:^|\s)\S/g, function (match) {
        return match.toUpperCase()
    })
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function makeLorem(wordCount = 100) {
    const words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'Messi', 'Barcelona', 'Miami', 'to', 'burn']
    var txt = ''
    while (wordCount > 0) {
        wordCount--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}

function getRandomPrice() {
    const possible = ['1.99', '2.99', '3.99', '4.99', '5.99', '6.99', '7.99', '8.99', '9.99', '10.99', '11.99', '12.99', '13.99', '14.99']
    return possible[getRandomIntInclusive(0, possible.length - 1)]
}
