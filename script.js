const container = document.getElementById('container')
const arrSquareIds = []


function renderSquares() {
    for (let x=0; x<10; x++) {
        for (let y=0; y<10; y++) {
            let slot = document.createElement('div')
            slot.setAttribute('id', `x:${x} y:${y}`)
            arrSquareIds.push(`x:${x} y:${y}`)
            container.appendChild(slot)
        }
    }
}

renderSquares() 

