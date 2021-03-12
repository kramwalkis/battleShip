const container = document.getElementById("container");
const arrSquareIds = [];
let arrayOfShips4 = [];
let arrayOfShips3 = [];
let arrayOfShips2 = [];
let arrayOfShips1 = []

function renderSquares() {  
  for (let x = 0; x < 100; x++) {
    let slot = document.createElement("div");
    slot.setAttribute("id", x);
    slot.innerText = x;    
    arrSquareIds.push(x.toString());
    container.appendChild(slot);
  }
}

renderSquares();

function renderPossiblePositions(arr, times) {
  let verticalArr = [];
  let horizontalArr = [];
  arrSquareIds.map((item) => {
    let positionHorizontal = [];
    let positionVertical = [];
    for (let x = 0; x < times; x++) {
      positionHorizontal.push((Number(item) + x).toString());
      positionVertical.push((Number(item) + x * 10).toString());
    }    
    let horizontalConditions = [
      item[item.length - 1] !== "7",
      item[item.length - 1] !== "8",
      item[item.length - 1] !== "9",
    ];
    let verticalConditions = [
      item[0] !== "7",
      item[0] !== "8",
      item[0] !== "9",
    ];
    while (times - horizontalConditions.length !== 1) {
      horizontalConditions.shift();
    }
    while (times - verticalConditions.length !== 1) {
      verticalConditions.shift();
    }
    if (horizontalConditions.every((e) => e === true)) {
      horizontalArr.push(positionHorizontal);
    }
    if (item.length === 1) {
      verticalArr.push(positionVertical);
    } else if (verticalConditions.every((e) => e === true)) {
      verticalArr.push(positionVertical);
    }
  });
  arr = [...horizontalArr, ...verticalArr];
  return arr;
}
arrayOfShips4 = renderPossiblePositions(arrayOfShips4, 4);
arrayOfShips3 = renderPossiblePositions(arrayOfShips3, 3);
arrayOfShips2 = renderPossiblePositions(arrayOfShips2, 2);
arrayOfShips1 = [...arrSquareIds]



