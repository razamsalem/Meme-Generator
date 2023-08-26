'use strict'

var gImgs = [
    {
        id: 1,
        url: 'img/1.jpg',
        keywords: ['political']
    },
    {
        id: 2,
        url: 'img/2.jpg',
        keywords: ['dog']
    },
    {
        id: 3,
        url: 'img/3.jpg',
        keywords: ['baby', 'dog']
    },
    {
        id: 4,
        url: 'img/4.jpg',
        keywords: ['funny', 'cat']
    },
    {
        id: 5,
        url: 'img/5.jpg',
        keywords: ['funny', 'baby']
    },
    {
        id: 6,
        url: 'img/1.jpg',
        keywords: ['funny']
    },
    {
        id: 7,
        url: 'img/7.jpg',
        keywords: ['funny', 'baby']
    },
    {
        id: 8,
        url: 'img/8.jpg',
        keywords: ['funny']
    },
    {
        id: 9,
        url: 'img/9.jpg',
        keywords: ['funny', 'baby']
    },
    {
        id: 10,
        url: 'img/1.jpg',
        keywords: ['political']
    },
    {
        id: 11,
        url: 'img/11.jpg',
        keywords: ['funny']
    },
    {
        id: 12,
        url: 'img/12.jpg',
        keywords: ['funny']
    },
    {
        id: 13,
        url: 'img/13.jpg',
        keywords: ['celebrities']
    },
    {
        id: 14,
        url: 'img/14.jpg',
        keywords: ['movies']
    },
    {
        id: 15,
        url: 'img/15.jpg',
        keywords: ['funny']
    },
    {
        id: 16,
        url: 'img/16.jpg',
        keywords: ['movies']
    },
    {
        id: 17,
        url: 'img/17.jpg',
        keywords: ['political']
    },
    {
        id: 18,
        url: 'img/18.jpg',
        keywords: ['funny']
    },
    {
        id: 19,
        url: 'img/19.jpg',
        keywords: ['funny']
    },
    {
        id: 20,
        url: 'img/20.jpg',
        keywords: ['funny, baby']
    },
    {
        id: 21,
        url: 'img/21.jpg',
        keywords: ['funny, movies']
    },
    {
        id: 22,
        url: 'img/22.jpg',
        keywords: ['funny, baby']
    },
    {
        id: 23,
        url: 'img/23.jpg',
        keywords: ['cat']
    },
    {
        id: 24,
        url: 'img/24.jpg',
        keywords: ['political']
    },
    {
        id: 25,
        url: 'img/25.jpg',
        keywords: ['movies']
    },
    {
        id: 26,
        url: 'img/26.jpg',
        keywords: ['funny ,movies']
    },
    {
        id: 27,
        url: 'img/27.jpg',
        keywords: ['funny']
    },
]

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Your Text',
            size: 20,
            color: '#ffffff',
            fontFamily: 'Impact',
            y: 50,
        },
        {
            txt: 'Your Text',
            size: 20,
            color: '#ffffff',
            fontFamily: 'Impact',
            y: 450
        },
    ]
}

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'dog': 11, 'baby': 8, 'political': 2, 'celebrities': 5, 'movies': 4 }

function setImg(imgId) {
    gMeme.selectedImgId = imgId
}

function getMeme() {
    return gMeme
}

function getRandomImgId() {
    const randIdx = getRandomIntInclusive(1, gImgs.length)
    return gImgs[randIdx].id
}