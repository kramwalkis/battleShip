const container = document.getElementById("container");
const score = document.getElementById("score");
let points = 120;
let arrSquareIds = [];
let arrayOfShips4 = [];
let arrayOfShips3 = [];
let arrayOfShips2 = [];
let arrayOfShips1 = [];
let randomSelectedShip = [];
let selectedShips = [];

function renderSquares() {
  for (let x = 0; x < 100; x++) {
    let slot = document.createElement("div");
    slot.classList.add("teal");
    slot.setAttribute("id", x);
    slot.addEventListener("click", shotTarget);
    // slot.innerText = x;
    arrSquareIds.push(x);
    container.appendChild(slot);
  }
}

function shotTarget(e) {
  let id = e.target.id;
  color(id, selectedShips);
}

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

function findNeighbors(num) {
  if (num === 0) {
    return [num, 1, 10, 11];
  }
  if (num === 9) {
    return [num, 8, 18, 19];
  }
  if (num === 90) {
    return [num, 80, 81, 91];
  }
  if (num === 99) {
    return [num, 88, 89, 98];
  }
  if (num >= 1 && num <= 8) {
    return [num, num - 1, num + 1, num + 9, num + 10, num + 11];
  }
  if (num >= 91 && num <= 98) {
    return [num, num - 1, num - 11, num - 10, num - 9, num + 1];
  }
  if (num !== 90 && num !== 0 && num.toString()[1] === "0") {
    return [num, num - 10, num - 9, num + 1, num + 11, num + 10];
  }
  if (num !== 9 && num !== 99 && num.toString()[1] === "9") {
    return [num, num - 10, num - 11, num - 1, num + 9, num + 10];
  }
  return [
    num,
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

function randomSelectFromArr(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function updateEmptySlots(ship, arr) {
  let arrWithNeighbors = [];
  ship.map((item) => {
    arrWithNeighbors = [...arrWithNeighbors, ...findNeighbors(item)];
  });
  arrWithNeighbors = [...new Set(arrWithNeighbors)];
  return arr.filter((item) => !arrWithNeighbors.includes(item));
}

function updateArrOfShips(shipArray, arr) {
  let array = shipArray.filter((item) => !checkIfIncludes(item, arr));
  return array;
}

function checkIfIncludes(arr, checker) {
  let returnArray = arr.filter((item) => checker.includes(item));
  return returnArray.length !== arr.length ? true : false;
}

// function spreadSlotsToColor(arr) {
//   let returnArray = [];
//   arr.map((item) => {
//     returnArray = [...returnArray, ...item];
//   });
//   return returnArray;
// }

function color(id, arr) {
  console.log(arr);
  let trigger = false;
  arr.map((item) => {
    item.includes(Number(id)) ? (trigger = true) : null;
  });
  trigger
    ? changeColor(id, container.children, selectedShips)
    : missedShot(id, container.children);
}

function changeColor(id, arr, shipArr) {
  let array = Array.from(arr);
  array.map((slot) => {
    if (slot.id === id) {
      checkIfHitOrDead(id, shipArr)
      document.getElementById(slot.id).classList.add("injured");
      document.getElementById(slot.id).removeEventListener("click", shotTarget);
    }
  });
}

function checkIfHitOrDead(id, arr) {

}

function missedShot(id, arr) {
  let array = Array.from(arr);
  array.map((slot) => {
    if (slot.id === id) {
      document.getElementById(slot.id).classList.add("missed");
      document.getElementById(slot.id).removeEventListener("click", shotTarget);
    }
  });
  points -= 1;
  score.innerText = `Score: ${points}`;
}

function renderShips(arrOfId, arr2, arr3, arr4) {
  let selected = [];
  let returnArray = [];

  selected = randomSelectFromArr(arr4);
  returnArray.push(selected);

  arrOfId = updateEmptySlots(selected, arrOfId);
  arr3 = updateArrOfShips(arr3, arrOfId);
  selected = randomSelectFromArr(arr3);
  returnArray.push(selected);

  arrOfId = updateEmptySlots(selected, arrOfId);
  arr3 = updateArrOfShips(arr3, arrOfId);
  selected = randomSelectFromArr(arr3);
  returnArray.push(selected);

  arrOfId = updateEmptySlots(selected, arrOfId);
  arr2 = updateArrOfShips(arr2, arrOfId);
  selected = randomSelectFromArr(arr2);
  returnArray.push(selected);

  arrOfId = updateEmptySlots(selected, arrOfId);
  arr2 = updateArrOfShips(arr2, arrOfId);
  selected = randomSelectFromArr(arr2);
  returnArray.push(selected);

  arrOfId = updateEmptySlots(selected, arrOfId);
  arr2 = updateArrOfShips(arr2, arrOfId);
  selected = randomSelectFromArr(arr2);
  returnArray.push(selected);

  arrOfId = updateEmptySlots(selected, arrOfId);
  returnArray.push([randomSelectFromArr(arrOfId)]);
  arrOfId = updateEmptySlots(returnArray[returnArray.length - 1], arrOfId);

  returnArray.push([randomSelectFromArr(arrOfId)]);
  arrOfId = updateEmptySlots(returnArray[returnArray.length - 1], arrOfId);

  returnArray.push([randomSelectFromArr(arrOfId)]);
  arrOfId = updateEmptySlots(returnArray[returnArray.length - 1], arrOfId);
  returnArray.push([randomSelectFromArr(arrOfId)]);

  return returnArray;
}

renderSquares();
arrayOfShips4 = renderPossiblePositions(arrayOfShips4, 4);
arrayOfShips3 = renderPossiblePositions(arrayOfShips3, 3);
arrayOfShips2 = renderPossiblePositions(arrayOfShips2, 2);
selectedShips = renderShips(
  arrSquareIds,
  arrayOfShips2,
  arrayOfShips3,
  arrayOfShips4
);
// let slotsToColor = spreadSlotsToColor(selectedShips);
// color(container.children, slotsToColor);

console.log(selectedShips);

// randomSelectedShip = randomSelectFromArr(arrayOfShips4);
// selectedShips.push(randomSelectedShip);

// arrSquareIds = updateEmptySlots(randomSelectedShip, arrSquareIds);
// arrayOfShips3 = updateArrOfShips(arrayOfShips3, arrSquareIds);
// randomSelectedShip = randomSelectFromArr(arrayOfShips3);
// selectedShips.push(randomSelectedShip);

// arrSquareIds = updateEmptySlots(randomSelectedShip, arrSquareIds);
// arrayOfShips3 = updateArrOfShips(arrayOfShips3, arrSquareIds);
// randomSelectedShip = randomSelectFromArr(arrayOfShips3);
// selectedShips.push(randomSelectedShip);

// arrSquareIds = updateEmptySlots(randomSelectedShip, arrSquareIds);
// arrayOfShips2 = updateArrOfShips(arrayOfShips2, arrSquareIds);
// randomSelectedShip = randomSelectFromArr(arrayOfShips2);
// selectedShips.push(randomSelectedShip);

// arrSquareIds = updateEmptySlots(randomSelectedShip, arrSquareIds);
// arrayOfShips2 = updateArrOfShips(arrayOfShips2, arrSquareIds);
// randomSelectedShip = randomSelectFromArr(arrayOfShips2);
// selectedShips.push(randomSelectedShip);

// arrSquareIds = updateEmptySlots(randomSelectedShip, arrSquareIds);
// arrayOfShips2 = updateArrOfShips(arrayOfShips2, arrSquareIds);
// randomSelectedShip = randomSelectFromArr(arrayOfShips2);
// selectedShips.push(randomSelectedShip);

// arrSquareIds = updateEmptySlots(randomSelectedShip, arrSquareIds);
// selectedShips.push([randomSelectFromArr(arrSquareIds)]);
// arrSquareIds = updateEmptySlots(
//   selectedShips[selectedShips.length - 1],
//   arrSquareIds
// );

// selectedShips.push([randomSelectFromArr(arrSquareIds)]);
// arrSquareIds = updateEmptySlots(
//   selectedShips[selectedShips.length - 1],
//   arrSquareIds
// );

// selectedShips.push([randomSelectFromArr(arrSquareIds)]);
// arrSquareIds = updateEmptySlots(
//   selectedShips[selectedShips.length - 1],
//   arrSquareIds
// );

// selectedShips.push([randomSelectFromArr(arrSquareIds)]);

// let array = Array.from(arr);
//   array.map((item) => {
//     let pixel = document.getElementById(item.id);
//     if (slots.includes(Number(pixel.id))) {
//       pixel.classList.add("red");
//     }
//   });
