document.addEventListener("DOMContentLoaded", init)
const eles = {}

// const myWords = ["kkkkk"]

const myWords = [
	"komunikatywność",
	"pracawgrupie",
	"empatia",
	"projektowanie",
	"zarządzanie",
]

const game = {
	r: 9,
	c: 15,
	w: 30,
	x: "",
	y: "",
	arr: [],
	placedWords: [],
	boardArr: [],
}

const placedWords = []

function init() {
	eles.gameArea = document.querySelector(".game-board")

	//create eles
	eles.gridContainer = document.createElement("div")
	eles.message = document.createElement("div")
	eles.myList = document.createElement("div")
	eles.btn = document.createElement("button")
	//eles.gameArea.textContent = "Game Ready";

	//add props
	eles.gridContainer.style.width = `${game.c * game.w + 50}px`
	eles.gridContainer.style.margin = "auto"
	eles.gridContainer.classList.add("gridContainer")
	eles.message.classList.add("message")
	eles.myList.classList.add("myList")

	//appends
	eles.gameArea.append(eles.myList)
	eles.gameArea.append(eles.gridContainer)
	eles.gameArea.append(eles.message)
	eles.gameArea.append(eles.btn)
	eles.btn.textContent = "Start the game."
	eles.btn.addEventListener("click", startGame)
}

const startGame = () => {
	game.r = 9
	game.c = 15
	game.rxc = 135
	game.x = ""
	game.y = ""
	game.boardArr.length = 0
	game.arr.length = 0
	game.arr.length = game.r * game.c
	game.placedWords.length = 0
	//console.log("game started")
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

	//console.log(game)
	eles.gridContainer.style.gridTemplateColumns = game.x
	eles.gridContainer.style.gridTemplateRows = game.y

	myWords.forEach((val, index) => {
		let temp = placeWord(val)
		if (temp) {
			game.placedWords.push({
				word: val,
				pos: temp,
			})
		}
	})

	addLetters()
	buildBoard()

	eles.myList.innerHTML = ""
	game.placedWords.forEach((wv) => {
		wv.ele = document.createElement("div")
		wv.ele.textContent = `${wv.word}, `
		wv.ele.arr = wv.pos
		eles.myList.append(wv.ele)
	})
	console.log(game)
}

const addLetters = () => {
	for (let i = 0; i < game.arr.length; i++) {
		if (game.arr[i] == "-") {
			game.arr[i] = randomLetter()
		}
	}
}

const randomLetter = () => {
	return "AĄBĆDEĘFGHIJKLŁMNOÓPRSŚTUWYZŻŹ".toUpperCase().split("")[
		Math.floor(Math.random() * 30)
	]
}

const placeWord = (word) => {
	//console.log(word)
	let placedOk = false
	let cnt = 300

	word =
		Math.random() > 0.5
			? word
					.toUpperCase()
					.split("")
					.filter((e) => e.trim().length)
					.join("")
			: word
					.toUpperCase()
					.split("")
					.filter((e) => e.trim().length)
					.reverse()
					.join("")

	//console.log(word)
	while (!placedOk && cnt > 0) {
		cnt--
		let pos = { col: 0, row: 0 }
		let dir = Math.random() > 0.5 ? true : false
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
	return placedOk
}
const yPlace = (cor, word) => {
	let start = cor.row * game.c + cor.col
	let isOkCounter = 0
	let indexPlaced = []
	for (let i = 0; i < word.length; i++) {
		if (game.arr[start + i * game.c] == "-") {
			isOkCounter++
		}
	}
	if (isOkCounter == word.length) {
		for (let i = 0; i < word.length; i++) {
			if (game.arr[start + i * game.c] == "-") {
				game.arr[start + i * game.c] = word[i]
				indexPlaced.push(start + i * game.c)
			}
		}
		return indexPlaced
	}
	return false
}

const xPlace = (cor, word) => {
	let start = cor.row * game.c + cor.col
	let isOkCounter = 0
	let indexPlaced = []
	for (let i = 0; i < word.length; i++) {
		if (game.arr[start + i] == "-") {
			isOkCounter++
		}
	}
	if (isOkCounter == word.length) {
		for (let i = 0; i < word.length; i++) {
			if (game.arr[start + i] == "-") {
				game.arr[start + i] = word[i]
				indexPlaced.push(start + i)
			}
		}
		return indexPlaced
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

		div.addEventListener("click", (e) => {
			console.log(i)
			console.log(game.arr[i])

			game.boardArr[i] = true

			let checker = { found: 0, word: "" }
			game.placedWords.forEach((w) => {
				if (w.pos.includes(i)) {
					checker.found++
					checker.word = w.word
				}
			})
			if (checker.found > 0) {
				div.style.backgroundColor = "white"
				div.style.color = "#372387"
			} else {
				div.style.backgroundColor = "white"
				div.style.color = "#372387"
			}
			foundChecker()
		})
	})
}
const foundChecker = () => {
	game.placedWords.forEach((w, ind) => {
		// console.log(w.pos)
		let checker = 0
		game.boardArr.forEach((value, index) => {
			// console.log(value)
			if (w.pos.includes(index)) {
				checker++
			}
		})
		if (checker == w.word.length) {
			w.ele.style.color = "RGB(236, 240, 0)"
			w.ele.style.textDecoration = "line-through"
		}
	})
	checkWinner()
}

const log = (message) => {
	eles.message.innerHTML = message
}

const checkWinner = () => {
	let counter = 0
	game.placedWords.forEach((w, ind) => {
		if (w.ele.style.textDecoration == "line-through") {
			// console.log("its ALIVE")
			counter++
		}
	})
	log(
		`Pozostało do znalezienia: <span>${
			game.placedWords.length - counter
		} słów</span>`
	)
	if (game.placedWords.length - counter == 0 || game.placedWords.length == 0) {
		// console.log("yupiii")
		log("Wygrana!<br><br>Naciśnij przycisk by zagrać ponownie.")
	}
}
