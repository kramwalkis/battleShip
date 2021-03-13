const container = document.getElementById("container");
const arrSquareIds = [];
let arrayOfShips4 = [];
let arrayOfShips3 = [];
let arrayOfShips2 = [];
let arrayOfShips1 = [];

function renderSquares() {
  for (let x = 0; x < 100; x++) {
    let slot = document.createElement("div");
    slot.setAttribute("id", x);
    slot.innerText = x;
    arrSquareIds.push(x);
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
      positionHorizontal.push(item + x);
      positionVertical.push(item + x * 10);
    }
    let horizontalConditions = [
      item.toString()[item.toString().length - 1] !== "7",
      item.toString()[item.toString().length - 1] !== "8",
      item.toString()[item.toString().length - 1] !== "9",
    ];
    let verticalConditions = [
      item.toString()[0] !== "7",
      item.toString()[0] !== "8",
      item.toString()[0] !== "9",
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
    if (item.toString().length === 1) {
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
arrayOfShips1 = [...arrSquareIds];

function findNeighbors(num) {
  if (num === 0) {
    return [1, 10, 11];
  }
  if (num === 9) {
    return [8, 18, 19];
  }
  if (num === 90) {
    return [80, 81, 91];
  }
  if (num === 99) {
    return [88, 89, 98];
  }
  if (num >= 1 && num <= 8) {
    return [num - 1, num + 1, num + 9, num + 10, num + 11];
  }
  if (num >= 91 && num <= 98) {
    return [num - 1, num - 11, num - 10, num - 9, num + 1];
  }
  if (num !== 90 && num !== 0 && num.toString()[1] === "0") {
    return [num - 10, num - 9, num + 1, num + 11, num + 10];
  }
  if (num !== 9 && num !== 99 && num.toString()[1] === "9") {
    return [num - 10, num - 11, num - 1, num + 9, num + 10];
  }
  return [
    num - 11,
    num - 10,
    num - 9,
    num + 1,
    num + 11,
    num + 10,
    num + 9,
    num - 1,
  ];
}


