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
let allPositions = [];
let positionCounter = {};
let arrOfChance = [];
let shot;
let injuredPositions = [];
let arrOfHitSpots = [];

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
  renderFunc.renderSquares();
  selectedShips = renderFunc.renderShips(
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
      slot.addEventListener("click", colorFunc.shotTarget);
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
  renderArrayForPosition1: () => {
    let arr = [];
    for (let x = 0; x < 100; x++) {
      arr.push([x]);
    }
    return arr;
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

const colorFunc = {
  color: (id, arr) => {
    let trigger = false;
    arr.map((item) => {
      item.includes(Number(id)) ? (trigger = true) : null;
    });
    trigger
      ? colorFunc.changeColor(id, arrOfHitShips)
      : colorFunc.missedShot(id, container.children);
  },
  changeColor: (id, shipArr) => {
    let shot = Number(id);
    shipArr.map((item) => {
      if (item.includes(shot)) {
        document.getElementById(id).classList.add("injured");
        document
          .getElementById(id)
          .removeEventListener("click", colorFunc.shotTarget);
        colorFunc.checkIfFullShipIsHit(item);
        counter++;
        if (counter === 20) {
          let array = Array.from(container.children);
          for (let x = 0; x <= 99; x++) {
            array[x].removeEventListener("click", colorFunc.shotTarget);
            playAgain.style.display = "block";
          }
        }
      }
    });
  },
  checkIfFullShipIsHit: (ship) => {
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
  },
  missedShot: (id, arr) => {
    let array = Array.from(arr);
    array.map((slot) => {
      if (slot.id === id) {
        document.getElementById(slot.id).classList.add("missed");
        document
          .getElementById(slot.id)
          .removeEventListener("click", colorFunc.shotTarget);
      }
    });
    points -= 1;
    score.innerText = `Score: ${points}`;
  },
  shotTarget: (e) => {
    let id = e.target.id;
    colorFunc.color(id, selectedShips);
  },
};

const pcFunc = {
  positionStart: (counter) => {
    for (let x = 0; x <= 99; x++) {
      let id = x.toString();
      counter = {
        ...counter,
        [id]: 0,
      };
    }
    return counter;
  },
  calculateSquareProbability: (arr, obj) => {
    arr.map((item) => {
      item.map((el) => {
        let id = el.toString();
        obj[id]++;
      });
    });
    return obj;
  },
  renderPossibilityArrayAll: (obj) => {
    let arr = [];
    for (let option in obj) {
      for (let x = 0; x < obj[option]; x++) {
        arr.push(option);
      }
    }
    return arr;
  },
  filterDownRegular: (arr, shot) => {
    return arr.filter((item) => !item.includes(Number(shot)));
  },
  filterDownInjured: (arr, sortingArray) => {
    let returnArray = [...arr];
    sortingArray.map((item) => {
      returnArray = returnArray.filter((el) => el.includes(Number(item)));
    });
    return returnArray;
  },
  filterDownWhenFullShipIsDown: (arr, sortingArray) => {
    let returnArray = [...arr];
    sortingArray.map((item) => {
      returnArray = returnArray.filter((el) => !el.includes(Number(item)));
    });
    return returnArray;
  },
  removeWhatIsHitFromNextShot: (obj, sortingArr) => {
    sortingArr.map((item) => {
      obj[item] = 0;
    });
    return obj;
  },
  sortByProbability: (obj) => {
    let arr = [];
    for (let number in obj) {
      arr.push([number, obj[number]]);
    }
    arr.sort((a, b) => {
      return b[1] - a[1];
    });
    return arr;
  },
  addNeighborsToArr: (arr) => {
    let arrOfHit = [];
    let arrOfNeighbors = [];
    arr.map((item, index) => {
      item.classList.contains("hit") ? arrOfHit.push(index) : null;
    });
    arrOfHit.map((item) => {
      arrOfNeighbors = [...arrOfNeighbors, ...renderFunc.findNeighbors(item)];
    });
    return (arrOfNeighbors = [...new Set(arrOfNeighbors)]);
  },
};

renderFunc.renderSquares();
arrayOfShips4 = renderFunc.renderPossiblePositions(arrayOfShips4, 4);
arrayOfShips3 = renderFunc.renderPossiblePositions(arrayOfShips3, 3);
arrayOfShips2 = renderFunc.renderPossiblePositions(arrayOfShips2, 2);
arrayOfShips1 = renderFunc.renderArrayForPosition1();
selectedShips = renderFunc.renderShips(
  arrSquareIds,
  arrayOfShips2,
  arrayOfShips3,
  arrayOfShips4
);
positionCounter = pcFunc.positionStart(positionCounter);
arrOfHitShips = [...selectedShips];
allPositions = [
  ...arrayOfShips1,
  ...arrayOfShips2,
  ...arrayOfShips3,
  ...arrayOfShips4,
];
positionCounter = pcFunc.calculateSquareProbability(
  allPositions,
  positionCounter
);
arrOfChance = pcFunc.renderPossibilityArrayAll(positionCounter);
shot = renderFunc.randomSelectFromArr(arrOfChance);
let injuredTrigger = false;
let shotCount = 0;
while (shotCount < 20) {
  console.log(shot, shotCount);
  
  colorFunc.color(shot, selectedShips);
  
  let array = Array.from(container.children);
  if (array[shot].classList.contains("missed")) {
    if (injuredTrigger === false) {
      allPositions = pcFunc.filterDownRegular(allPositions, shot);
      positionCounter = pcFunc.positionStart(positionCounter);
      positionCounter = pcFunc.calculateSquareProbability(
        allPositions,
        positionCounter
      );
      arrOfChance = pcFunc.renderPossibilityArrayAll(positionCounter);
      shot = renderFunc.randomSelectFromArr(arrOfChance);
    } else {
      allPositions = pcFunc.filterDownRegular(allPositions, shot);
      injuredPositions = pcFunc.filterDownInjured(allPositions, arrOfHitSpots);
      positionCounter = pcFunc.positionStart(positionCounter);
      positionCounter = pcFunc.calculateSquareProbability(
        injuredPositions,
        positionCounter
      );
      positionCounter = pcFunc.removeWhatIsHitFromNextShot(
        positionCounter,
        arrOfHitSpots
      );
      arrOfChance = pcFunc.sortByProbability(positionCounter);
      shot = arrOfChance[0][0];
      injuredTrigger = true;
      // shotCount++;

    }
  } else if (array[shot].classList.contains("hit")) {
    arrOfHitSpots = pcFunc.addNeighborsToArr(array);
    
    allPositions = pcFunc.filterDownWhenFullShipIsDown(allPositions, arrOfHitSpots);

    injuredTrigger = false;
    shotCount++;
    arrOfHitSpots = []
    positionCounter = pcFunc.positionStart(positionCounter);
      positionCounter = pcFunc.calculateSquareProbability(
        allPositions,
        positionCounter
      );
      arrOfChance = pcFunc.renderPossibilityArrayAll(positionCounter);
      shot = renderFunc.randomSelectFromArr(arrOfChance);
  } else if (array[shot].classList.contains("injured")) {
    arrOfHitSpots.push(shot);
    injuredPositions = pcFunc.filterDownInjured(allPositions, arrOfHitSpots);
    positionCounter = pcFunc.positionStart(positionCounter);
    positionCounter = pcFunc.calculateSquareProbability(
      injuredPositions,
      positionCounter
    );
    positionCounter = pcFunc.removeWhatIsHitFromNextShot(
      positionCounter,
      arrOfHitSpots
    );
    arrOfChance = pcFunc.sortByProbability(positionCounter);
    shot = arrOfChance[0][0];
    injuredTrigger = true;
    shotCount++;
  }
}

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
