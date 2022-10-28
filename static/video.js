const video = document.getElementById("entVid")

video.addEventListener("ended", () => {
	closeVid()
})

const closeVid = () => {
	setTimeout(video.parentNode.removeChild(video), 3000)
}
