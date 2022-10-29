const questionModal = document.getElementById("question")
const content = document.querySelector(".modal-cont")
const btn = document.createElement("button")
const a = document.createElement("a")

ps = [
	"Świat Cię potrzebuje! Na mapie małopolski przebywają potrzebujące dzieci i młodzież, które uciekły z wojny. Nie mieli czasu na pakowanie, nie znają języka, są przestraszeni i nie wiedzą co robić.",
	"<span>Zagraj w grę</span> i aktywj pomoc superbohakera! Rozwiąż łamigłówki, poznaj możliwości wolontariatu <span>i dołącz do nas</span>",
]

ps.forEach((element) => {
	paragraph = document.createElement("p")
	paragraph.innerHTML = element
	content.append(paragraph)
})

btn.textContent = "chcę zagrać"
a.textContent = "chcę pomagać"
a.setAttribute("href", "https://zrzutka.pl/xg44xc")
a.classList.add = "extBtn"

content.append(btn)
content.append(a)

btn.addEventListener("click", () => {
	questionModal.style.display = "none"
})
