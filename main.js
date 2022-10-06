import { v4 as uuidv4 } from "https://jspm.dev/uuid";

const taskUl = document.querySelector(".todos");
const progressUl = document.querySelector(".progress-todos");
const completeUl = document.querySelector(".complete-todos");

let state = {
  task: [
    {
      name: "AAA",
      id: uuidv4(),
      room: 1,
      moveForward: true,
      moveBackward: false,
    },
    {
      name: "BBB",
      id: uuidv4(),
      room: 1,
      moveForward: true,
      moveBackward: false,
    },
    {
      name: "CCC",
      id: uuidv4(),
      room: 1,
      moveForward: true,
      moveBackward: false,
    },
  ],

  progress: [],
  complete: [],
};

let roomNames = {
  1: "task",
  2: "progress",
  3: "complete",
};

function renderTask() {
  let lis = state.task.reduce((acc, curr) => {
    return (
      acc +
      `
    <li class="todo" data-id=${curr.id}>
            ${curr.name}
            <button class="btn next">
              <i class="fa-solid fa-angle-right"></i>
            </button>
          </li>
    `
    );
  }, "");

  let progressLis = state.progress.reduce((acc, curr) => {
    return (
      acc +
      `
      <li class="todo" data-id=${curr.id}>
      <button class="btn previous">
        <i class="fa-solid fa-angle-left"></i>
      </button>
      ${curr.name}
      <button class="btn next">
        <i class="fa-solid fa-angle-right"></i>
      </button>
    </li>
    `
    );
  }, "");

  let completeLis = state.complete.reduce((acc, curr) => {
    return (
      acc +
      `
      <li class="todo" data-id=${curr.id}>
            <button class="btn previous">
              <i class="fa-solid fa-angle-left"></i>
            </button>
            ${curr.name}
          </li>
    `
    );
  }, "");

  taskUl.innerHTML = lis;
  progressUl.innerHTML = progressLis;
  completeUl.innerHTML = completeLis;
}

function taskClick(e) {
  if (e.target.classList.contains("fa-angle-right")) {
    let ulName = e.target.parentElement.parentElement.parentElement.className;
    let elId = e.target.parentElement.parentElement.getAttribute("data-id");
    let { foundElement, foundIdx } = findSpecificElement(elId, ulName);
    state[roomNames[foundElement.room]].splice(foundIdx, 1);
    moveTaskToSpecificRoom(foundElement, "right");
  } else if (e.target.classList.contains("fa-angle-left")) {
    let ulName = e.target.parentElement.parentElement.parentElement.className;
    let elId = e.target.parentElement.parentElement.getAttribute("data-id");
    let { foundElement, foundIdx } = findSpecificElement(elId, ulName);
    state[roomNames[foundElement.room]].splice(foundIdx, 1);
    moveTaskToSpecificRoom(foundElement, "left");
  }
}

function findSpecificElement(id, name) {
  let foundElement, foundIdx;

  if (name === "todos") {
    let totalMergedArr = [...state.task];
    foundElement = totalMergedArr.find((element, idx) => {
      foundIdx = idx;
      return element.id === id;
    });
  } else if (name === "progress-todos") {
    let totalMergedArr = [...state.progress];
    foundElement = totalMergedArr.find((element, idx) => {
      foundIdx = idx;
      return element.id === id;
    });
  } else {
    let totalMergedArr = [...state.complete];
    foundElement = totalMergedArr.find((element, idx) => {
      foundIdx = idx;
      return element.id === id;
    });
  }

  return {
    foundElement,
    foundIdx,
  };
}

function moveTaskToSpecificRoom(obj, direction) {
  if (direction === "right") {
    let modifiedObj = {
      ...obj,
      room: ++obj.room,
      moveForward: obj.room !== 3 ? true : false,
      moveBackward: obj.room !== 1 ? true : false,
    };

    let selectedRoom = roomNames[modifiedObj.room];
    state[selectedRoom].push(modifiedObj);
    renderTask();
  } else if (direction === "left") {
    let modifiedObj = {
      ...obj,
      room: --obj.room,
      moveForward: obj.room !== 3 ? true : false,
      moveBackward: obj.room !== 1 ? true : false,
    };

    let selectedRoom = roomNames[modifiedObj.room];
    state[selectedRoom].push(modifiedObj);
    renderTask();
  }
}

window.addEventListener("load", renderTask);
taskUl.addEventListener("click", taskClick);
progressUl.addEventListener("click", taskClick);
completeUl.addEventListener("click", taskClick);
