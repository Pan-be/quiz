document.addEventListener("DOMContentLoaded", init)
const eles = {}

const myWords = [
	"komunikatywność",
	"pracawgrupie",
	"empatia",
	"projektowanie",
	"zarządzanie",
]

const game = { r: 9, c: 15, rxc: 135, x: "", y: "", arr: [] }

function init() {
	eles.gameArea = document.querySelector(".game-board")
	eles.gridContainer = document.createElement("div")
	eles.message = document.createElement("div")
	eles.gridContainer.classList.add("gridContainer")
	eles.myList = document.createElement("div")
	eles.btn = document.createElement("button")
	//eles.gameArea.textContent = "Game Ready";
	eles.gameArea.append(eles.gridContainer)
	eles.gameArea.append(eles.myList)
	eles.gameArea.append(eles.message)
	eles.gameArea.append(eles.btn)
	eles.btn.textContent = "Start the game."
	eles.btn.addEventListener("click", startGame)
}

const startGame = () => {
	console.log("game started")
	game.arr.length = game.r * game.c
	for (let index = 0; index < game.arr.length; index++) {
		game.arr[index] = "-"
	}

	for (let ix = 0; ix < game.c; ix++) {
		game.x += " auto "
	}

	for (let iy = 0; iy < game.r; iy++) {
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

const placeWord = (word) => {
	console.log(word)
	let placedOk = false
	let cnt = 300
	word = word.split("")
	console.log(word)
	while (!placedOk && cnt > 0) {
		cnt--
		let pos = { col: 0, row: 0 }
		let dir = (Math.random() > 0, 5) ? true : false
		if (dir && word.length <= game.c) {
			pos.col = findStartPos(word.length, game.c)
			pos.row = Math.floor(Math.random() * game.r)

			placedOk = xPlace(pos, word)
		} else if (!dir && word.length <= game.r) {
			pos.row = findStartPos(word.length, game.r)
			pos.col = Math.floor(Math.random() * game.c)

			placedOk = yPlace(pos, word)
		}
	}
}
const yPlace = (cor, word) => {
	let start = cor.row * game.c + cor.col
	let isOkCounter = 0
	for (let i = 0; i < word.length; i++) {
		if (game.arr[start + i * game.c] == "-") {
			isOkCounter++
		}
	}
	if (isOkCounter == word.length) {
		for (let i = 0; i < word.length; i++) {
			if (game.arr[start + i * game.c] == "-") {
				game.arr[start + i * game.c] = word[i]
			}
		}
		return true
	}
	return false
}

const xPlace = (cor, word) => {
	let start = cor.row * game.c + cor.col
	let isOkCounter = 0
	for (let i = 0; i < word.length; i++) {
		if (game.arr[start + i] == "-") {
			isOkCounter++
		}
	}
	if (isOkCounter == word.length) {
		for (let i = 0; i < word.length; i++) {
			if (game.arr[start + i] == "-") {
				game.arr[start + i] = word[i]
			}
		}
		return true
	}
	return false
}

const findStartPos = (wordVal, totalVal) => {
	return Math.floor(Math.random() * (totalVal - wordVal + 1))
}

const buildBoard = () => {
	eles.gridContainer.innerHTML = ""
	game.arr.forEach((e, i) => {
		let div = document.createElement("div")
		div.textContent = e
		div.classList.add("grid-item")
		eles.gridContainer.append(div)
	})
}
