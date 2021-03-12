const container = document.getElementById("container");
const arrSquareIds = [];

function renderSquares() {
  let number = 0;
  for (let x = 0; x < 100; x++) {    
      let slot = document.createElement("div");
      slot.setAttribute("id", x);
      slot.innerText = number;
      number++;
      arrSquareIds.push(x);
      container.appendChild(slot);
    
  }
}

renderSquares();

function allPlacesFor4Piece() {
  let verticalPositions = [];
  arrSquareIds.map((item, index) => {});
}
allPlacesFor4Piece();
