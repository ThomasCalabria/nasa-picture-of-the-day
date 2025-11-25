// script.js - rough draft
console.log("script loaded!");

const todayBtn = document.getElementById("todayBtn");
const dateBtn = document.getElementById("dateBtn");
const datePicker = document.getElementById("datePicker");

todayBtn.addEventListener("click", () => {
  alert("Today button works!");
});

dateBtn.addEventListener("click", () => {
  if (datePicker.value) {
    alert("You picked: " + datePicker.value);
  } else {
    alert("pick a date first dummy");
  }
});