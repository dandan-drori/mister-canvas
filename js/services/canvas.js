var gCanvas
var gCtx
var gCurrShape = 'square'
var gCurrColor = 'black'
var gStartPos
var gIsDrag

function createCanvas() {
	gCanvas = document.querySelector('.canvas')
	gCtx = gCanvas.getContext('2d')
}

function getCanvas() {
	return gCanvas
}

function getContext() {
	return gCtx
}

function setShape(shapeName) {
	gCurrShape = shapeName
}

function setColor(color) {
	gCurrColor = color
}

function getCurrShape() {
	return gCurrShape
}

function drawRect(x, y) {
	gCtx.beginPath()
	const size = getRandomInt(100, 150)
	gCtx.rect(x, y, size, size)
	gCtx.fillStyle = gCurrColor
	gCtx.fillRect(x, y, size, size)
	gCtx.strokeStyle = 'black'
	gCtx.stroke()
}

function drawCircle(x, y) {
	gCtx.beginPath()
	gCtx.lineWidth = 6
	const radius = getRandomInt(50, 100)
	gCtx.arc(x, y, radius, 0, 2 * Math.PI)
	gCtx.strokeStyle = 'black'
	gCtx.stroke()
	gCtx.fillStyle = gCurrColor
	gCtx.fill()
}

function drawTriangle(x, y) {
	gCtx.beginPath()
	gCtx.lineWidth = 2
	gCtx.moveTo(x, y)
	gCtx.lineTo(x - 50, y + 100)
	gCtx.lineTo(x + 50, y + 100)
	gCtx.closePath()
	gCtx.fillStyle = gCurrColor
	gCtx.fill()
	gCtx.strokeStyle = 'black'
	gCtx.stroke()
}

function drawDots(x, y) {
	gCtx.beginPath()
	gCtx.lineWidth = 2
	gCtx.moveTo(x, y)
	gCtx.lineTo(x + 1, y + 1)
	gCtx.closePath()
	gCtx.strokeStyle = gCurrColor
	gCtx.stroke()
}

function draw(ev) {
	const x = ev.offsetX
	const y = ev.offsetY

	switch (gCurrShape) {
		case 'square':
			drawRect(x, y)
			break
		case 'circle':
			drawCircle(x, y)
			break
		case 'triangle':
			drawTriangle(x, y)
			break
	}
}

function clearCanvas() {
	gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
}

function resizeCanvas(elContainer) {
	gCtx.canvas.width = elContainer.offsetWidth
	gCtx.canvas.height = elContainer.offsetHeight
}

function setStartPos(pos) {
	gStartPos = pos
}

function getStartPos() {
	if (!gStartPos) return { x: 0, y: 0 }
	return gStartPos
}

function setIsDrag(val) {
	gIsDrag = val
}

function getIsDrag() {
	return gIsDrag
}

function getCurrPos() {
	return { x: gCurrX, y: gCurrY }
}

function setCurrPos(x, y) {
	gCurrX = x
	gCurrY = y
}

function setPrevPos(x, y) {
	gPrevX = x
	gPrevY = y
}

function downloadImg(elLink) {
	const imgContent = gCanvas.toDataURL('image/jpeg')
	elLink.href = imgContent
}
