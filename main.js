const Btn = document.querySelectorAll(".btn");
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

function addTodo(e) {
  // console.log(e.target);
  if (
    e.target.parentElement.parentElement.parentElement.classList.contains(
      "todos"
    )
  ) {
    if (e.target.classList.contains("fa-angle-right")) {
      state.progress.push(
        e.target.parentElement.parentElement.textContent.trim()
      );
      e.target.parentElement.parentElement.classList.add("disable");
      showProgressUI();
    }
  } else if (
    e.target.parentElement.parentElement.parentElement.classList.contains(
      "progress-todos"
    )
  ) {
    if (e.target.classList.contains("fa-angle-right")) {
      console.log(e.target.parentElement.parentElement.textContent.trim());
      state.complete.push(
        e.target.parentElement.parentElement.textContent.trim()
      );
      e.target.parentElement.parentElement.classList.add("disable");
      showCompleteUI();
      showProgressUI();
    }
  }
  console.log(state.progress);
  console.log(state.complete);
}

// Add Event Listeners
Btn.forEach((item) => item.addEventListener("click", addTodo));
