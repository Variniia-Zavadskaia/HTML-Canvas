'use strict'
var gElCanvas
var gCtx
var gCurrShape
var gBckg
var gShpColor
var isDrawing

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    isDrawing = false;
    console.log('gCtx:', gCtx)
    onSetShpColor()
    onSetShape();
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
}

// function drawArc(x, y) {
//     gCtx.beginPath()
//     gCtx.lineWidth = 3

//     //* The x,y cords of the center , The radius, The starting angle, The ending angle, in radians
//     // gCtx.arc(x, y, 70, 0, Math.PI) //* draws a circle
//     gCtx.arc(x, y, 70, 0, Math.PI * 2) //* draws a circle
//     // gCtx.fillStyle = ' '
//     // gCtx.fill()
//     gCtx.strokeStyle = gShpColor
//     gCtx.stroke()
// }

// function drawRect(x, y) {
//     gCtx.beginPath()
//     gCtx.strokeStyle = gShpColor
//     // gCtx.fillStyle = 'black'

//     gCtx.lineWidth = 3
//     gCtx.rect(x, y, 120, 120)
//     // gCtx.fill()
//     gCtx.stroke()
//     //* THE SAME
//     // gCtx.fillRect(x, y, 120, 120)
//     // gCtx.strokeRect(x, y, 120, 120)
// }

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
    // console.log('ghj');
    const elShapeChoice = document.querySelector('.shape-choice')
    gCurrShape = elShapeChoice.value
    // elShapeChoice.innerText = capitalize(gCurrShape)
}

function drawShape(x, y) {
    gCtx.beginPath()
    gCtx.strokeStyle = gShpColor
    // gCtx.fillStyle = 'black'

    gCtx.lineWidth = 3

    switch (gCurrShape) {
        // case 'line':
        //     drawLine(offsetX, offsetY)
        //     break
        case 'circle':
            gCtx.arc(x, y, 70, 0, Math.PI * 2) //* draws a circle
            break
        case 'square':
            gCtx.rect(x, y, 120, 120)
            break
    }

    gCtx.stroke()
}

function onDraw(ev) {
    // const offsetX = ev.offsetX
    // const offsetY = ev.offsetY
    const { offsetX, offsetY } = ev
    // console.log('offsetX, offsetY:', offsetX, offsetY)
    
    drawShape(offsetX, offsetY)
    // switch (gCurrShape) {
    //     // case 'line':
    //     //     drawLine(offsetX, offsetY)
    //     //     break
    //     case 'circle':
    //         drawArc(offsetX, offsetY)
    //         break
    //     case 'square':
    //         drawRect(offsetX, offsetY)
    //         break
    // }
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

// const canvas = document.getElementById('drawCanvas');
// const ctx = canvas.getContext('2d');
// let isDrawing = false;

canvas.onmousedown = ({offsetX, offsetY}) => {
    isDrawing = true;
    gCtx.beginPath();
    gCtx.moveTo(offsetX, offsetY);
};

canvas.onmousemove = ({offsetX, offsetY}) => {
    if (isDrawing) {
        gCtx.lineTo(offsetX, offsetY);
        gCtx.stroke();
    }
};

canvas.onmouseup = () => {
    isDrawing = false;
};
