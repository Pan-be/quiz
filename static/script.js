document.addEventListener("DOMContentLoaded", init)

const elems = {}

function init() {
	elems.gameBoard = document.querySelector(".game-board")
	// elems.gameContainer = document.createElement("div")
	// elems.wordsList = document.createElement("div")
	elems.btn = document.createElement("button")

	elems.gameBoard.appendChild(elems.btn)

	elems.gameBoard.textContent = "Game start"
	console.log(elems)
}
