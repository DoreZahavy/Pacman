'use strict'

const GHOST = '👻'
var gGhosts
var gDeadGhosts

var gIntervalGhosts

function createGhost(board) {
    var ghost = {
        id: makeId(),
        location: {
            i: 3,
            j: 3
        },
        currCellContent: FOOD,
        color: getRandomColor()
    }
    // console.log('ghost.color:', ghost.color)
    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = GHOST
    // document.querySelector('.cell-3-3').classList.add('ghosted')
}

function createGhosts(board) {
    // 3 ghosts and an interval
    gGhosts = []

    for (var i = 0; i < 3; i++) {
        createGhost(board)
    }
    // console.log('gGhosts:', gGhosts)

    gIntervalGhosts = setInterval(moveGhosts, 1000)
   
}

function moveGhosts() {
    // loop through ghosts
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i]
        moveGhost(ghost, i)
    }
}

function moveGhost(ghost, ghostIdx) {
    // console.log('ghost.location:', ghost.location)
    const moveDiff = getMoveDiff()
    // console.log('moveDiff:', moveDiff)

    const nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }
    // console.log('nextLocation:', nextLocation)
    const nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log('nextCell:', nextCell)

    // return if cannot move
    if (nextCell === WALL) return
    if (nextCell === SUPER_FOOD) return
    if (nextCell === CHERRY) return
    if (nextCell === GHOST) return
    // hitting a pacman? call gameOver
    if (nextCell === PACMAN) {
        if (isSuper) {
            killGhost(ghostIdx)
            return
        }
        
        deadAudio.play()
        gameOver()
        return
    }

    // moving from current location:
    // update the model (restore prev cell contents)
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    // update the DOM
    renderCell(ghost.location, ghost.currCellContent)

    // Move the ghost to new location:
    // update the model (save cell contents)
    ghost.location = nextLocation
    ghost.currCellContent = nextCell
    gBoard[ghost.location.i][ghost.location.j] = GHOST

    // update the DOM
    renderCell(ghost.location, getGhostHTML(ghost, isSuper))
}

function getMoveDiff() {
    const randNum = getRandomIntInclusive(1, 4)

    switch (randNum) {
        case 1: return { i: 0, j: 1 }
        case 2: return { i: 1, j: 0 }
        case 3: return { i: 0, j: -1 }
        case 4: return { i: -1, j: 0 }
    }
}

function getGhostHTML(ghost, isSuper) {
    var color = (isSuper) ? 'blue' : ghost.color
    return `<span style="color: transparent;text-shadow: 0 0 0 ${color};">${GHOST}</span>`
}

function killGhost(ghostIdx) {
    // console.log('hi')
    // drop the food 
    console.log('gGhosts[ghostIdx]:', gGhosts[ghostIdx])
    gBoard[gGhosts[ghostIdx].location.i][gGhosts[ghostIdx].location.j] = gGhosts[ghostIdx].currCellContent
    renderCell(gGhosts[ghostIdx].location, gGhosts[ghostIdx].currCellContent)
    // put in dead ghosts array
    gDeadGhosts.push(...gGhosts.splice(ghostIdx, 1))
    // console.log('gGhosts:', gGhosts)
    // console.log('gDeadGhosts:', gDeadGhosts)
}

