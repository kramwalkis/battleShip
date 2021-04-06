const container = document.getElementById("container");
const score = document.getElementById("score");
const playAgain = document.getElementById("playAgain");
const start = document.getElementById("start");

let points = 120;
let counter = 0;
let pcCounter = 0;
let arrSquareIds = [];
let arrayOfShips4 = [];
let arrayOfShips3 = [];
let arrayOfShips2 = [];
let arrayOfShips1 = [];
let randomSelectedShip = [];
let selectedShips = [];
let arrOfHitShips = [];

playAgain.addEventListener("click", reRender);
start.addEventListener("click", reRender);

function reRender() {
  score.style.display = "block";
  start.style.display = "none";
  playAgain.style.display = "none";
  container.style.display = "flex";
  container.innerHTML = "";
  points = 120;
  score.innerText = `Score: ${points}`;
  renderSquares();
  selectedShips = renderShips(
    arrSquareIds,
    arrayOfShips2,
    arrayOfShips3,
    arrayOfShips4
  );
  arrOfHitShips = [...selectedShips];
}

const renderFunc = {
  renderSquares: () => {
    for (let x = 0; x < 100; x++) {
      let slot = document.createElement("div");
      slot.classList.add("teal");
      slot.setAttribute("id", x);
      slot.addEventListener("click", shotTarget);
      arrSquareIds.push(x);
      container.appendChild(slot);
    }
  },
  renderShips: (arrOfId, arr2, arr3, arr4) => {
    let selected = [];
    let returnArray = [];

    selected = renderFunc.randomSelectFromArr(arr4);
    returnArray.push(selected);

    arrOfId = renderFunc.updateEmptySlots(selected, arrOfId);
    arr3 = renderFunc.updateArrOfShips(arr3, arrOfId);
    selected = renderFunc.randomSelectFromArr(arr3);
    returnArray.push(selected);

    arrOfId = renderFunc.updateEmptySlots(selected, arrOfId);
    arr3 = renderFunc.updateArrOfShips(arr3, arrOfId);
    selected = renderFunc.randomSelectFromArr(arr3);
    returnArray.push(selected);

    arrOfId = renderFunc.updateEmptySlots(selected, arrOfId);
    arr2 = renderFunc.updateArrOfShips(arr2, arrOfId);
    selected = renderFunc.randomSelectFromArr(arr2);
    returnArray.push(selected);

    arrOfId = renderFunc.updateEmptySlots(selected, arrOfId);
    arr2 = renderFunc.updateArrOfShips(arr2, arrOfId);
    selected = renderFunc.randomSelectFromArr(arr2);
    returnArray.push(selected);

    arrOfId = renderFunc.updateEmptySlots(selected, arrOfId);
    arr2 = renderFunc.updateArrOfShips(arr2, arrOfId);
    selected = renderFunc.randomSelectFromArr(arr2);
    returnArray.push(selected);

    arrOfId = renderFunc.updateEmptySlots(selected, arrOfId);
    returnArray.push([renderFunc.randomSelectFromArr(arrOfId)]);
    arrOfId = renderFunc.updateEmptySlots(
      returnArray[returnArray.length - 1],
      arrOfId
    );

    returnArray.push([renderFunc.randomSelectFromArr(arrOfId)]);
    arrOfId = renderFunc.updateEmptySlots(
      returnArray[returnArray.length - 1],
      arrOfId
    );

    returnArray.push([renderFunc.randomSelectFromArr(arrOfId)]);
    arrOfId = renderFunc.updateEmptySlots(
      returnArray[returnArray.length - 1],
      arrOfId
    );
    returnArray.push([renderFunc.randomSelectFromArr(arrOfId)]);

    return returnArray;
  },
  renderPossiblePositions: (arr, times) => {
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
  },
  findNeighbors: (num) => {
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
  },
  randomSelectFromArr: (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
  },
  updateEmptySlots: (ship, arr) => {
    let arrWithNeighbors = [];
    ship.map((item) => {
      arrWithNeighbors = [
        ...arrWithNeighbors,
        ...renderFunc.findNeighbors(item),
      ];
    });
    arrWithNeighbors = [...new Set(arrWithNeighbors)];
    return arr.filter((item) => !arrWithNeighbors.includes(item));
  },
  updateArrOfShips: (shipArray, arr) => {
    let array = shipArray.filter(
      (item) => !renderFunc.checkIfIncludes(item, arr)
    );
    return array;
  },
  checkIfIncludes: (arr, checker) => {
    let returnArray = arr.filter((item) => checker.includes(item));
    return returnArray.length !== arr.length ? true : false;
  },
};

function color(id, arr) {
  let trigger = false;
  arr.map((item) => {
    item.includes(Number(id)) ? (trigger = true) : null;
  });
  trigger ? changeColor(id, arrOfHitShips) : missedShot(id, container.children);
}

function changeColor(id, shipArr) {
  let shot = Number(id);
  shipArr.map((item) => {
    if (item.includes(shot)) {
      document.getElementById(id).classList.add("injured");
      document.getElementById(id).removeEventListener("click", shotTarget);
      checkIfFullShipIsHit(item);
      counter++;
      if (counter === 20) {
        let array = Array.from(container.children);
        for (let x = 0; x <= 99; x++) {
          array[x].removeEventListener("click", shotTarget);
          playAgain.style.display = "block";
        }
      }
    }
  });
}

function checkIfFullShipIsHit(ship) {
  let array = Array.from(container.children);
  let trigger = true;
  ship.map((item) => {
    array[item].classList.contains("injured") ? null : (trigger = false);
  });
  if (trigger) {
    ship.map((item) => {
      array[item].classList.remove("injured");
      array[item].classList.add("hit");
    });
  }
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

function shotTarget(e) {
  let id = e.target.id;
  color(id, selectedShips);
}

renderFunc.renderSquares();
arrayOfShips4 = renderFunc.renderPossiblePositions(arrayOfShips4, 4);
arrayOfShips3 = renderFunc.renderPossiblePositions(arrayOfShips3, 3);
arrayOfShips2 = renderFunc.renderPossiblePositions(arrayOfShips2, 2);
selectedShips = renderFunc.renderShips(
  arrSquareIds,
  arrayOfShips2,
  arrayOfShips3,
  arrayOfShips4
);
arrOfHitShips = [...selectedShips];

///////////////////////

/// Try to make AI
// let allPositions = [];
// let positionCounter = {};

// function allShipsCombine() {
//   for (let x = 0; x <= 99; x++) {
//     arrayOfShips1.push([x]);
//     let id = x.toString();
//     positionCounter = {
//       ...positionCounter,
//       [id]: 0,
//     };
//   }
//   allPositions = [
//     ...arrayOfShips1,
//     ...arrayOfShips2,
//     ...arrayOfShips3,
//     ...arrayOfShips4,
//   ];
// }
// allShipsCombine();
// let arrOfChance = [];
// calculateSquareProbability(allPositions);
// possibilityArray();
// let shotSelected = randomSelectFromArr(arrOfChance);
// let injuredTrigger = false;
// let positionsWhenHit = [];
// let injuredPositions = [];
// pcLogic(shotSelected);

// function calculateSquareProbability(arr) {
//   arr.map((item) => {
//     item.map((el) => {
//       let id = el.toString();
//       positionCounter[id]++;
//     });
//   });
// }

// function possibilityArray() {
//   for (let option in positionCounter) {
//     for (let x = 0; x < positionCounter[option]; x++) {
//       arrOfChance.push(option);
//     }
//   }
// }

// function makeValues0(obj) {
//   for (let position in obj) {
//     obj[position] = 0;
//   }
//   return obj;
// }

// function pcLogic(shotSelected) {
//   let interval = setInterval(() => {
//     color(shotSelected, selectedShips);
//     let array = Array.from(container.children);
//     if (array[shotSelected].classList.contains("missed")) {
//       allPositions = allPositions.filter(
//         (item) => !item.includes(Number(shotSelected))
//       );
//       positionCounter = makeValues0(positionCounter);
//       console.log(positionCounter);
//       calculateSquareProbability(allPositions);
//       console.log(positionCounter);
//       arrOfChance = [];
//       possibilityArray();
//       // console.log(arrOfChance);

//       shotSelected = randomSelectFromArr(arrOfChance);
//     } else if (array[shotSelected].classList.contains("injured")) {
//       pcLogicWhenInjured();
//     }
//   }, 5000);

//   // interval()
// }

// function pcLogicWhenInjured() {
//   injuredPositions.push(shotSelected);
//   console.log(injuredPositions);
//   if (injuredTrigger) {
//     positionsWhenHit = positionsWhenHit.filter((item) =>
//       item.includes(Number(shotSelected))
//     );
//   } else {
//     positionsWhenHit = allPositions.filter((item) =>
//       item.includes(Number(shotSelected))
//     );
//   }
//   positionCounter = makeValues0(positionCounter);
//   calculateSquareProbability(positionsWhenHit);
//   injuredPositions.map((item) => {
//     positionCounter[item] = 0;
//   });
//   arrOfChance = [];
//   arrOfChance = sortByProbability(positionCounter);
//   possibilityArray();
//   console.log(arrOfChance);
//   shotSelected = arrOfChance[1][0];
//   injuredTrigger = true;
// }

// function sortByProbability(obj) {
//   let arr = [];
//   for (let number in obj) {
//     arr.push([number, obj[number]]);
//   }
//   arr.sort((a, b) => {
//     return b[1] - a[1];
//   });
//   return arr;
// }
