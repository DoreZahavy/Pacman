'use strict'

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('')
    var color = '#'
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}

function findEmptyPos() {

	var emptyPoss = []
	// var emptyPoss = [{i:0,j:0} , {i:0,j:1}]
	for (var i = 0; i < gBoard.length; i++) {
		for (var j = 0; j < gBoard[0].length; j++) {
			if (gBoard[i][j]===' ') {
				var pos = {
					i: i,
					j: j
				}
				emptyPoss.push(pos)
			}

		}
	}
	// console.log('emptyPoss:', emptyPoss)
	const randIdx = getRandomInt(0, emptyPoss.length)
	// console.log('randIdx:', randIdx)
	const randPos = emptyPoss[randIdx]
	return randPos

}