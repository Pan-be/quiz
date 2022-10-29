const video = document.getElementById("entVid")

video.addEventListener("ended", () => {
	closeVid()
})

const closeVid = () => {
	video.parentNode.removeChild(video)
}
