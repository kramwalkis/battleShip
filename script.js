const container = document.getElementById("container");
const arrSquareIds = [];
let arrayOfShips4 = []

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

function allPlacesFor4Piece(arr, times) {
  let verticalArr = [];
  let horizontalArr = [];
  arrSquareIds.map((item) => {      
    let positionHorizontal = [item, item + 1, item + 2, item + 3];
    let positionVertical = [item, item + 10, item + 20, item + 30];
    let number = item.toString();
    if (
      number[number.length - 1] !== "7" &&
      number[number.length - 1] !== "8" &&
      number[number.length - 1] !== "9"
    ) {
      horizontalArr.push(positionHorizontal);
    }
    if (number.length === 1) {
        verticalArr.push(positionVertical);
    } else if (number[0] !== "7" && number[0] !== "8" && number[0] !== "9") {
        verticalArr.push(positionVertical);
    }    
  });
  arr = [...horizontalArr, ...verticalArr]
  return arr
    
}
arrayOfShips4 = allPlacesFor4Piece(arrayOfShips4, 4);

console.log(arrayOfShips4);
