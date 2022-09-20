const Btn = document.querySelectorAll(".btn");

let progress_arr = [];
let complete_arr = [];

let state = {
  progress: [],
  complete: [],
};

// Functions
function addTodo(e) {
  console.log(e.target.parentElement.parentElement.textContent.trim());
  progress_arr.push(e.target.parentElement.parentElement.textContent.trim());
  console.log(progress_arr);
}

// Add Event Listeners
Btn.forEach((item) => item.addEventListener("click", addTodo));
