document.addEventListener("DOMContentLoaded", init)
const eles = {}

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
}
