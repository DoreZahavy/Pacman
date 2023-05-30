'use strict'

const PACMAN = '😀'
var gPacman


function createPacman(board) {
    gPacman = {
        location: {
            i: 7,
            j: 7
        },
        isSuper: false,
        direction: 'down'
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function onMovePacman(ev) {
    // console.log('gGhosts[0]',gGhosts[0])
    if (!gGame.isOn) return

    const nextLocation = getNextLocation(ev)
    // console.log('nextLocation:', nextLocation)
    if (!nextLocation) return

    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log('nextCell:', nextCell)
    // return if cannot move
    if (nextCell === WALL) return
    // hitting a ghost? call gameOver
    if (nextCell === GHOST) {
        if (isSuper) {
            for (var i = 0; i < gGhosts.length; i++) {
                // if (gGhosts[i].location === nextLocation) {
                if (gGhosts[i].location.i === nextLocation.i &&
                    gGhosts[i].location.j === nextLocation.j) {
                    if (gGhosts[i].currCellContent === FOOD) {
                        console.log('gGhosts[i]:', gGhosts[i])
                    gFoodCollected++
                    updateScore(1)
                    gGhosts[i].currCellContent = EMPTY
                    }
                    killGhost(i)
                    break
                }
            }
        } else {
            // var deadAudio = new Audio('sounds/dead.mp3')
            deadAudio.play()
            gameOver()
            return
        }
    }
    nextCell = gBoard[nextLocation.i][nextLocation.j]

    if (nextCell === SUPER_FOOD) {
        if (isSuper) return
        superFoodAudio.play()
        isSuper = true
        setTimeout(endSuperMode, 5000)
        gFoodCollected++
        updateScore(3)
    }
    if (nextCell === FOOD) {
        foodAudio.play()
        gFoodCollected++
        updateScore(1)
    }
    if (nextCell === CHERRY) {

        cherryAudio.play()
        // gFoodCollected++
        updateScore(10)
    }

    // moving from current location:
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // update the DOM
    renderCell(gPacman.location, EMPTY)

    // Move the pacman to new location:
    // update the model
    gPacman.location = nextLocation
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN
    // update the DOM
    var pacmanHTML = `<img src="img/${gPacman.direction}.png">`
    // console.log('pacmanHTML:', pacmanHTML)
    // var pacmanHTML = `<span style="rotate: 90deg;">${PACMAN}</span>`
    renderCell(gPacman.location, pacmanHTML) //PACMAN
}

function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    // console.log('eventKeyboard.code:', eventKeyboard.code)

    switch (eventKeyboard.code) {
        case 'ArrowUp':
            gPacman.direction = 'up'
            nextLocation.i--
            break
        case 'ArrowDown':
            gPacman.direction = 'down'
            nextLocation.i++
            break
        case 'ArrowRight':
            gPacman.direction = 'right'
            nextLocation.j++
            break
        case 'ArrowLeft':
            gPacman.direction = 'left'
            nextLocation.j--
            break
        default: return null
    }

    return nextLocation
}