const pcContainer = document.getElementById("pcContainer");
const myContainer = document.getElementById("myContainer");
const v4 = document.getElementById("v4");
const h4 = document.getElementById("h4");
const v3 = document.getElementById("v3");
const h3 = document.getElementById("h3");
const v2 = document.getElementById("v2");
const h2 = document.getElementById("h2");
const ship1 = document.getElementById("ship1");

let counter = 0;
let pcCounter = 0;
let arrSquareIds = [];
let arrayOfShips4 = [];
let arrayOfShips3 = [];
let arrayOfShips2 = [];
let arrayOfShips1 = [];
let myVertical4 = [];
let myHorizontal4 = [];
let myVertical3 = [];
let myHorizontal3 = [];
let myVertical2 = [];
let myHorizontal2 = [];
let ships1 = [];
let selectedArray = [];
let shipToColor = [];
let myShips = [];
let takenSlots = [];

let randomSelectedShip = [];
let selectedShips = [];
let arrOfHitShips = [];
let allPositions = [];
let positionCounter = {};
let arrOfChance = [];
let shot;
let injuredPositions = [];
let arrOfHitSpots = [];
let arrOfSuccessfulShots = [];

const renderFunc = {
  renderSquares: () => {
    for (let x = 0; x < 100; x++) {
      let slot = document.createElement("div");
      let mySlot = document.createElement("div");
      slot.classList.add("teal");
      mySlot.classList.add("teal");
      mySlot.classList.add("empty");
      slot.setAttribute("id", x);
      mySlot.setAttribute("id", `my${x}`);
      slot.addEventListener("click", colorFunc.shotTarget);
      arrSquareIds.push(x);
      pcContainer.appendChild(slot);
      myContainer.appendChild(mySlot);
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
      : colorFunc.missedShot(id, pcContainer.children);
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
          let array = Array.from(pcContainer.children);
          for (let x = 0; x <= 99; x++) {
            array[x].removeEventListener("click", colorFunc.shotTarget);
          }
        }
      }
    });
  },
  checkIfFullShipIsHit: (ship) => {
    let array = Array.from(pcContainer.children);
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

const shipAdd = {
  setArray: (array) => {
    shipAdd.removeListeners();
    selectedArray = [...array];
    selectedArray.map((item, index) => {
      document
        .getElementById(`my${item[0]}`)
        .addEventListener("mouseenter", shipAdd.colorOnHover);
      document
        .getElementById(`my${item[0]}`)
        .addEventListener("mouseleave", shipAdd.removeColorOnHover);
      document
        .getElementById(`my${item[0]}`)
        .addEventListener("click", shipAdd.addShip);
    });
  },
  addShip: (e) => {
    let id = Number(e.target.id.slice(2));
    shipToColor = selectedArray.filter((el) => el[0] === id);
    shipToColor[0].map((item) => {
      document.getElementById(`my${item}`).classList.add("gray");
    });
    myShips.push(shipToColor[0]);
    shipAdd.makeButtonsNormal();
    shipAdd.removeListeners();
    shipAdd.updatePossibleArrays(myShips);
    shipAdd.countShips(myShips);
  },
  countShips: (array) => {
    let counter3 = 0;
    let counter2 = 0;
    let counter1 = 0;
    array.map((item) => {
      item.length === 4
        ? (document.getElementById("shipAssign4").style.display = "none")
        : null;
      item.length === 3 ? counter3++ : null;
      item.length === 2 ? counter2++ : null;
      item.length === 1 ? counter1++ : null;
    });
    counter3 === 2
      ? (document.getElementById("shipAssign3").style.display = "none")
      : null;
    counter2 === 3
      ? (document.getElementById("shipAssign2").style.display = "none")
      : null;
    counter1 === 4
      ? (document.getElementById("shipAssign1").style.display = "none")
      : null;
  },
  updatePossibleArrays: (array) => {
    array.map((ship) => {
      ship.map((el) => {
        takenSlots = [...takenSlots, ...renderFunc.findNeighbors(el)];
        takenSlots = [...new Set(takenSlots)];
      });
    });
    myHorizontal4 = shipAdd.arrayClearing(takenSlots, myHorizontal4);
    myHorizontal3 = shipAdd.arrayClearing(takenSlots, myHorizontal3);
    myHorizontal2 = shipAdd.arrayClearing(takenSlots, myHorizontal2);
    myVertical4 = shipAdd.arrayClearing(takenSlots, myVertical4);
    myVertical3 = shipAdd.arrayClearing(takenSlots, myVertical3);
    myVertical2 = shipAdd.arrayClearing(takenSlots, myVertical2);
    ships1 = shipAdd.arrayClearing(takenSlots, ships1);
  },
  arrayClearing: (taken, array) => {
    let returnArray = [];
    let trigger = false;
    array.map((ship) => {
      ship.map((slot) => {
        taken.includes(slot) ? (trigger = true) : null;
      });
      !trigger ? returnArray.push(ship) : (trigger = false);
    });
    return returnArray;
  },

  makeButtonsNormal: () => {
    let buttons = document.getElementsByClassName("option");
    for (let x = 0; x < buttons.length; x++) {
      buttons[x].style.backgroundColor = "rgb(16, 122, 34)";
    }
  },
  colorOnHover: (e) => {
    let id = Number(e.target.id.slice(2));
    shipToColor = selectedArray.filter((el) => el[0] === id);
    shipToColor[0].map((item) => {
      document.getElementById(`my${item}`).classList.add("orange");
    });
  },
  removeColorOnHover: (e) => {
    let id = Number(e.target.id.slice(2));
    shipToColor = selectedArray.filter((el) => el[0] === id);
    if (shipToColor.length > 0) {
      shipToColor[0].map((item) => {
        document.getElementById(`my${item}`).classList.remove("orange");
      });
    }
  },
  removeListeners: () => {
    let array = Array(myContainer.children);
    for (let x = 0; x < array[0].length; x++) {
      document
        .getElementById(`my${x}`)
        .removeEventListener("mouseenter", shipAdd.colorOnHover);
    }
  },
  select: (e) => {
    let buttons = document.getElementsByClassName("option");
    for (let x = 0; x < buttons.length; x++) {
      buttons[x].style.backgroundColor = "rgb(16, 122, 34)";
    }
    document.getElementById(e.target.id).style.backgroundColor =
      "rgb(50, 235, 96)";
    e.target.id === "v4" ? shipAdd.setArray(myVertical4) : null;
    e.target.id === "h4" ? shipAdd.setArray(myHorizontal4) : null;
    e.target.id === "v3" ? shipAdd.setArray(myVertical3) : null;
    e.target.id === "h3" ? shipAdd.setArray(myHorizontal3) : null;
    e.target.id === "v2" ? shipAdd.setArray(myVertical2) : null;
    e.target.id === "h2" ? shipAdd.setArray(myHorizontal2) : null;
    e.target.id === "ship1" ? shipAdd.setArray(ships1) : null;
  },
};
v4.addEventListener("click", shipAdd.select);
h4.addEventListener("click", shipAdd.select);
v3.addEventListener("click", shipAdd.select);
h3.addEventListener("click", shipAdd.select);
h2.addEventListener("click", shipAdd.select);
v2.addEventListener("click", shipAdd.select);
ship1.addEventListener("click", shipAdd.select);

renderFunc.renderSquares();
arrayOfShips4 = renderFunc.renderPossiblePositions(arrayOfShips4, 4);
arrayOfShips3 = renderFunc.renderPossiblePositions(arrayOfShips3, 3);
arrayOfShips2 = renderFunc.renderPossiblePositions(arrayOfShips2, 2);
arrayOfShips1 = renderFunc.renderArrayForPosition1();
myHorizontal4 = arrayOfShips4.slice(0, arrayOfShips4.length / 2);
myVertical4 = arrayOfShips4.slice(arrayOfShips4.length / 2);
myHorizontal3 = arrayOfShips3.slice(0, arrayOfShips3.length / 2);
myVertical3 = arrayOfShips3.slice(arrayOfShips3.length / 2);
myHorizontal2 = arrayOfShips2.slice(0, arrayOfShips2.length / 2);
myVertical2 = arrayOfShips2.slice(arrayOfShips2.length / 2);
ships1 = [...arrayOfShips1];

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
  colorFunc.color(shot, selectedShips);
  let array = Array.from(pcContainer.children);
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
    allPositions = pcFunc.filterDownWhenFullShipIsDown(
      allPositions,
      arrOfHitSpots
    );
    injuredTrigger = false;
    shotCount++;
    arrOfHitSpots = [];
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
