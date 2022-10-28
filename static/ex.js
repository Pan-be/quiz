document.addEventListener("DOMContentLoaded", init)
const eles = {}
const myWords = [
	"komunikatywność",
	"pracawgrupie",
	"empatia",
	"projektowanie",
	"zarządzanie",
]
const game = { r: 9, c: 15, w: 135, x: "", y: "", arr: [] }

function init() {
	eles.gameArea = document.querySelector(".game-board")

	//creates eles
	eles.gridContainer = document.createElement("div")
	eles.myList = document.createElement("div")
	eles.btn = document.createElement("button")
	eles.gridSize = document.createElement("input")
	//eles.gameArea.textContent = "Game Ready";

	//eles props
	eles.gridContainer.classList.add("gridContainer")
	eles.myList.classList.add("myList")

	//appends
	eles.gameArea.append(eles.gridContainer)
	eles.gameArea.append(eles.myList)
	eles.gameArea.append(eles.gridSize)
	eles.gameArea.append(eles.btn)
	eles.gridSize.setAttribute("type", "number")
	eles.gridContainer.textContent =
		"Click Start to Start the Game. Select the number of cells for the game grid."
	eles.btn.textContent = "Click to Start"
	eles.gridSize.value = 5
	eles.btn.addEventListener("click", startGame)
	console.log(eles)
}

function startGame() {
	console.log("start game")
	game.r = 9 //rows
	game.c = 15
	game.x = ""
	game.y = ""
	game.arr.length = 0
	game.arr.length = game.r * game.c
	for (let i = 0; i < game.arr.length; i++) {
		game.arr[i] = "-"
	}
	for (let xx = 0; xx < game.r; xx++) {
		game.x += " auto "
	}
	for (let yy = 0; yy < game.r; yy++) {
		game.y += " auto "
	}
	console.log(game)
	eles.gridContainer.style.gridTemplateColumns = game.x
	eles.gridContainer.style.gridTemplateRows = game.y

	myWords.forEach((val, index) => {
		let temp = placeWord(val)
		console.log(temp)
	})

	buildBoard()
}

function placeWord(word) {
	console.log(word)
	let placedOkay = false
	let cnt = 300
	word = Math.random() > 0.5 ? word : word.split("").reverse().join("")
	console.log(word)
	while (!placedOkay && cnt > 0) {
		cnt--
		let pos = { col: 0, row: 0 }
		let dir = Math.random() > 0.5 ? true : false
		if (dir && word.length <= game.c) {
			pos.col = findStartPos(word.length, game.c)
			pos.row = Math.floor(Math.random() * game.r)
			placedOkay = xPlace(pos, word)
		} else if (!dir && word.length <= game.r) {
			pos.row = findStartPos(word.length, game.r)
			pos.col = Math.floor(Math.random() * game.c)
			placedOkay = yPlace(pos, word)
		}
	}
}
function yPlace(cor, word) {
	let start = cor.row * game.c + cor.col
	let okayCounter = 0
	for (let i = 0; i < word.length; i++) {
		if (game.arr[start + i * game.c] == "-") {
			okayCounter++
		}
	}
	if (okayCounter == word.length) {
		for (let i = 0; i < word.length; i++) {
			if (game.arr[start + i * game.c] == "-") {
				game.arr[start + i * game.c] = word[i]
			}
		}
		return true
	}
	return false
}

function xPlace(cor, word) {
	let start = cor.row * game.c + cor.col
	let okayCounter = 0
	for (let i = 0; i < word.length; i++) {
		if (game.arr[start + i] == "-") {
			okayCounter++
		}
	}
	if (okayCounter == word.length) {
		for (let i = 0; i < word.length; i++) {
			if (game.arr[start + i] == "-") {
				game.arr[start + i] = word[i]
			}
		}
		return true
	}
	return false
}

function findStartPos(wordVal, totalVal) {
	return Math.floor(Math.random() * (totalVal - wordVal + 1))
}

function buildBoard() {
	eles.gridContainer.innerHTML = ""
	game.arr.forEach((ele, index) => {
		let div = document.createElement("div")
		div.textContent = ele
		div.classList.add("grid-item")
		eles.gridContainer.append(div)
	})
}
