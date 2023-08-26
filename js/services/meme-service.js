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
        keywords: ['Movies']
    },
    {
        id: 15,
        url: 'img/15.jpg',
        keywords: ['funny']
    },
    {
        id: 16,
        url: 'img/16.jpg',
        keywords: ['Movies']
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
            y: 50
        }
    ]
}

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16,  'dog': 11 , 'baby': 8,'political': 2, 'celebrities' : 5 , 'Movies': 4  }

function setImg(imgId) {
    gMeme.selectedImgId = imgId
}

function getMeme() {
    return gMeme
}