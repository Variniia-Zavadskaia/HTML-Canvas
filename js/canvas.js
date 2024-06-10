'use strict'
var gElCanvas
var gCtx
var gCurrShape
var gBckg
var gShpColor
var isDrawing
var gPrevPos
var gCanvas
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    isDrawing = false;
    addListeners()

    onSetShpColor()
    onSetShape();
    resizeCanvas()
    // window.addEventListener('resize', resizeCanvas)
}


function onClearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.clientWidth - 40   
}

function onSetBckGrnd() {
    const elClrChoice = document.getElementById('bcg')
    gBckg = elClrChoice.value
    const elCanvas = document.querySelector('canvas')
    elCanvas.style.backgroundColor = gBckg
}

function onSetShpColor(){
    const elClrChoice = document.getElementById('shpColor')
    gShpColor = elClrChoice.value
}

function onSetShape() {
    const elShapeChoice = document.querySelector('.shape-choice')
    gCurrShape = elShapeChoice.value
}

function drawShape(x, y) {
    gCtx.beginPath()
    gCtx.strokeStyle = gShpColor

    gCtx.lineWidth = 1

    switch (gCurrShape) {
        case 'pencil':
            gCtx.lineWidth = 1
            gCtx.moveTo(gPrevPos.x, gPrevPos.y)
            gCtx.lineTo(x,y)
            // gCtx.rect(x, y, 1, 1)
            break
        case 'circle':
            var dist = Math.sqrt( Math.abs(gPrevPos.x - x)**2 + Math.abs(gPrevPos.y - y)**2)

            gCtx.arc(x, y, dist/2, 0, Math.PI * 2) //* draws a circle
            break
        case 'square':
            var dist = Math.sqrt( Math.abs(gPrevPos.x - x)**2 + Math.abs(gPrevPos.y - y)**2)
            // gCtx.rect(x, y, dist, dist)
            gCtx.rect(x, y, dist, 5*dist)
            break
    }

    gCtx.stroke()
}

function onDraw(ev) {
    const { offsetX, offsetY } = ev
    drawShape(offsetX, offsetY)
}

function getCanvasCenter() {
    return {
        x: gElCanvas.width / 2,
        y: gElCanvas.height / 2
    }
}


function onDown(ev) {
    const pos = getEvPos(ev)
    isDrawing = true;
    gPrevPos = {x: pos.x, y: pos.y}
    
    // drawShape(pos.x, pos.y)
};

function onMove(ev) {
    if (isDrawing) {
        const pos = getEvPos(ev)

        drawShape(pos.x, pos.y)
        gPrevPos = {x: pos.x, y: pos.y}

    }
};

function onUp() {
    isDrawing = false;
};

function addListeners() {
    addMouseListeners()
    // addTouchListeners()
    //* Listen for resize ev
    window.addEventListener('resize', () => {
        resizeCanvas()
        //* Calc the center of the canvas
        const center = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }
        //* Create the circle in the center
        // createCircle(center)
        // renderCanvas()
    })
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchend', onUp)
}

function getEvPos(ev) {

    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }

    // if (TOUCH_EVS.includes(ev.type)) {
    //     //* Prevent triggering the mouse ev
    //     ev.preventDefault()
    //     //* Gets the first touch point
    //     ev = ev.changedTouches[0]
    //     //* Calc the right pos according to the touch screen
    //     pos = {
    //         x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
    //         y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
    //     }
    //     // console.log('pos:', pos)
    // }
    return pos
}

// download ////////////////////////////////////////////////

// function onSelectImg(elImg) {
//     gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height)
// }

function onDownloadCanvas(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg') // image/jpeg the default format
    elLink.href = imgContent
}