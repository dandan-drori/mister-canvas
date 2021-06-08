const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

function init() {
	createCanvas()
	const elContainer = document.querySelector('.canvas-container')
	addListeners(elContainer)
	onResizeCanvas()
	window.addEventListener('resize', onResizeCanvas)
}

function addListeners(elContainer) {
	addMouseListeners()
	addTouchListeners()
	window.addEventListener('resize', () => {
		resizeCanvas(elContainer)
		// renderCanvas()
	})
}

function addMouseListeners() {
	const canvas = getCanvas()
	canvas.addEventListener('mousemove', onMove)
	canvas.addEventListener('mousedown', onDown)
	canvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
	const canvas = getCanvas()
	canvas.addEventListener('touchmove', onMove)
	canvas.addEventListener('touchstart', onDown)
	canvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
	const currShape = getCurrShape()
	if (currShape !== 'dots') return
	const pos = getEvPos(ev)
	setStartPos(pos)
	setIsDrag(true)
	document.body.style.cursor = 'crosshair'
}

function onMove(ev) {
	const isDrag = getIsDrag()
	if (!isDrag) return
	const pos = getEvPos(ev)
	const { x, y } = getStartPos()
	if (!x || !y) return
	drawDots(pos.x, pos.y)
	setStartPos(pos)
}

function onUp() {
	document.body.style.cursor = 'default'
	setIsDrag(false)
}

function getEvPos(ev) {
	var pos = {
		x: ev.offsetX,
		y: ev.offsetY,
	}
	if (gTouchEvs.includes(ev.type)) {
		ev.preventDefault()
		ev = ev.changedTouches[0]
		pos = {
			x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
			y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
		}
	}
	return pos
}

function onSetShape(shapeName) {
	setShape(shapeName)
}

function onSetColor(color) {
	setColor(color)
}

function onDraw(ev) {
	draw(ev)
}

function onResizeCanvas() {
	const elContainer = document.querySelector('.canvas-container')
	resizeCanvas(elContainer)
}

function onClear() {
	clearCanvas()
}

function onDownloadImg(elLink) {
	downloadImg(elLink)
}

function renderImg(img) {
	gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}

function loadImageFromInput(ev, onImageReady) {
	document.querySelector('.share-container').innerHTML = ''
	var reader = new FileReader()

	reader.onload = function (event) {
		var img = new Image()
		img.onload = onImageReady.bind(null, img)
		img.src = event.target.result
		gImg = img
	}
	reader.readAsDataURL(ev.target.files[0])
}

function onImgInput(ev) {
	loadImageFromInput(ev, renderImg)
}

function renderCanvas() {
	gCtx.save()
	gCtx.fillStyle = 'deepskyblue'
	gCtx.fillRect(0, 0, gCanvas.width, gCanvas.height)
	gCtx.restore()
}
