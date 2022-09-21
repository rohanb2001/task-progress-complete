const Btn = document.querySelectorAll(".btn");
const todos = document.querySelector(".todos");
const li = document.querySelectorAll(".todo");
const progressUl = document.querySelector(".progress-todos");
const completeUl = document.querySelector(".complete-todos");

let state = {
  progress: [],
  complete: [],
};

// Functions
function showProgressUI() {
  if (state.progress.length) {
    let str = state.progress.reduce((acc, curr) => {
      return (
        acc +
        `
        <li class="todo">
            <button class="btn previous">
              <i class="fa-solid fa-angle-left"></i>
            </button>
            ${curr}
            <button class="btn next">
              <i class="fa-solid fa-angle-right"></i>
            </button>
          </li> 
        `
      );
    }, "");

    progressUl.innerHTML = str;
  } else {
    progressUl.innerHTML = "";
  }
}

function showCompleteUI() {
  if (state.complete.length) {
    let str = state.complete.reduce((acc, curr) => {
      return (
        acc +
        `
        <li class="todo">
        <button class="btn previous">
          <i class="fa-solid fa-angle-left"></i>
        </button>
        ${curr}
      </li>
        `
      );
    }, "");

    completeUl.innerHTML = str;
  } else {
    completeUl.innerHTML = "";
  }
}

function addToProgress(e) {
  if (e.target.classList.contains("fa-angle-right")) {
    if (
      !state.progress.includes(
        e.target.parentElement.parentElement.textContent.trim()
      )
    ) {
      state.progress.push(
        e.target.parentElement.parentElement.textContent.trim()
      );
      e.target.parentElement.parentElement.remove();

      showProgressUI();
    } else {
      state.complete.push(
        e.target.parentElement.parentElement.textContent.trim()
      );
      e.target.parentElement.parentElement.remove();
      showCompleteUI();
    }
  }
}

function addToComplete(e) {
  if (e.target.classList.contains("fa-angle-right")) {
    if (
      !state.complete.includes(
        e.target.parentElement.parentElement.textContent.trim()
      )
    ) {
      state.complete.push(
        e.target.parentElement.parentElement.textContent.trim()
      );
      state.progress.shift();
      e.target.parentElement.parentElement.remove();
      showCompleteUI();
    }
  }
}

// Add Event Listeners
li.forEach((item) => item.addEventListener("click", addToProgress));
progressUl.addEventListener("click", addToComplete);
