'use strict'
var gElCanvas
var gCtx
var gCurrShape

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    console.log('gCtx:', gCtx)
    onSetShape();
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
}

function drawArc(x, y) {
    gCtx.beginPath()
    gCtx.lineWidth = 3

    //* The x,y cords of the center , The radius, The starting angle, The ending angle, in radians
    // gCtx.arc(x, y, 70, 0, Math.PI) //* draws a circle
    gCtx.arc(x, y, 70, 0, Math.PI * 2) //* draws a circle
    // gCtx.fillStyle = ' '
    // gCtx.fill()
    gCtx.strokeStyle = 'black'
    gCtx.stroke()
}

function drawRect(x, y) {
    gCtx.beginPath()
    gCtx.strokeStyle = 'purple'
    // gCtx.fillStyle = 'royalblue'

    gCtx.lineWidth = 3
    gCtx.rect(x, y, 120, 120)
    // gCtx.fill()
    gCtx.stroke()
    //* THE SAME
    // gCtx.fillRect(x, y, 120, 120)
    // gCtx.strokeRect(x, y, 120, 120)
}

function onClearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
    //* We may clear part of the canvas
    // gCtx.clearRect(0, 0, gElCanvas.width / 2, gElCanvas.height / 2)
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    //* Changing the canvas dimension clears the canvas
    gElCanvas.width = elContainer.clientWidth - 40  //* Subtracting 20px padding from each side
    // drawText('Drawing text!', gElCanvas.width / 2, gElCanvas.height / 2)
}

function onSetShape() {
    // console.log('ghj');
    const elShapeChoice = document.querySelector('.shape-choice')
    gCurrShape = elShapeChoice.value
    // elShapeChoice.innerText = capitalize(gCurrShape)
}

function onDraw(ev) {
    // const offsetX = ev.offsetX
    // const offsetY = ev.offsetY
    const { offsetX, offsetY } = ev
    // console.log('offsetX, offsetY:', offsetX, offsetY)

    switch (gCurrShape) {
        // case 'line':
        //     drawLine(offsetX, offsetY)
        //     break
        case 'circle':
            drawArc(offsetX, offsetY)
            break
        case 'square':
            drawRect(offsetX, offsetY)
            break
    }
}

function getCanvasCenter() {
    return {
        x: gElCanvas.width / 2,
        y: gElCanvas.height / 2
    }
}

function capitalize(txt) {
    return txt.charAt(0).toUpperCase() + txt.substring(1)
}
