'use strict'




const WALL = '🔥'
const FOOD = '•'
const EMPTY = ' '
const SUPER_FOOD = '🥑'
const CHERRY = '🍒'

var deadAudio = new Audio('sounds/dead.mp3')
var superFoodAudio = new Audio('sounds/super-food.mp3')
var foodAudio = new Audio('sounds/food-collected.mp3')
var cherryAudio = new Audio('sounds/cherry.mp3')
var winAudio = new Audio('sounds/win.mp3')

var gFoodOnBoard
var gFoodCollected

var gIntervalCherry

var isSuper

const gGame = {
    score: 0,
    isOn: false
}
var gBoard


function onInit() {
    console.log('hello')

    gFoodCollected = 0
    gIntervalCherry = setInterval(createCherry, 15000)

    gDeadGhosts = []

    gBoard = buildBoard()

    console.log('gFoodOnBoard:', gFoodOnBoard)
    createPacman(gBoard)
    createGhosts(gBoard)

    renderBoard(gBoard)
    gGame.isOn = true
    isSuper = false

    var elModal = document.querySelector('.modal')
    elModal.style.display = 'none'
}

function buildBoard() {
    const size = 10
    const board = []
    gFoodOnBoard = -1

    for (var i = 0; i < size; i++) {
        board.push([])

        for (var j = 0; j < size; j++) {

            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2) ||
                (j === 7 && i > 1 && i < 6) ||
                (i === 2 && j > 1 && j < 4)) {
                board[i][j] = WALL
            } else {
                board[i][j] = FOOD
                gFoodOnBoard++
            }
        }
    }
    board[1][1] = board[8][1] = board[8][8] = board[1][8] = SUPER_FOOD
    console.log('board:', board)
    return board
}

function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {

            const cell = board[i][j]
            const className = `cell cell-${i}-${j}`

            strHTML += `<td class="${className}">${cell}</td>`
        }
        strHTML += '</tr>'
    }
    const elContainer = document.querySelector('.board')
    elContainer.innerHTML = strHTML
}

// location is an object like this - { i: 2, j: 7 }
function renderCell(location, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
    // console.log('elCell:', elCell)
}

function updateScore(diff) {
    // update model and dom
    gGame.score += diff
    document.querySelector('h2 span').innerText = gGame.score + ' ' + gFoodCollected + ' ' + gFoodOnBoard
    if (gFoodCollected === gFoodOnBoard) {
        
        winAudio.play()
        gameOver()
    }
}

function gameOver() {
    console.log('Game Over')
    superFoodAudio.pause()
    gGame.isOn = false
    clearInterval(gIntervalGhosts)
    clearInterval(gIntervalCherry)
    renderCell(gPacman.location, EMPTY)
    var elModal = document.querySelector('.modal')
    var elH2 = elModal.querySelector('h2')
    elH2.innerText = (gFoodCollected === gFoodOnBoard) ? 'YOU WIN!!' : 'YOU ARE DEAD'
    gGame.score = 0
    elModal.style.display = 'block'

}

function endSuperMode() {
    // revive ghosts
    for (var i = 0; i < gDeadGhosts.length; i++) {
        gGhosts.push(...gDeadGhosts)
        gDeadGhosts = []
    }
    // color ghosts back
    isSuper = false
    renderGhosts()
    // 
}

function createCherry() {
    var newCherryPos = findEmptyPos()
    gBoard[newCherryPos.i][newCherryPos.j] = CHERRY
    renderCell(newCherryPos, CHERRY)
}