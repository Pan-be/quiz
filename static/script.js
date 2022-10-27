document.addEventListener("DOMContentLoaded", init)
const eles = {}

const myWords = [
	"komunikatywność",
	"Pracawgrupie",
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

	console.log(game)
	eles.gridContainer.style.grid
	buildBoard()
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
