'use strict'

function onDownloadCanvas(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg') 
    elLink.href = imgContent
    elLink.download = 'my-img'
}