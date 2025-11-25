const API_URL = "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY";

const todayBtn = document.getElementById("todayBtn");
const dateBtn = document.getElementById("dateBtn");
const datePicker = document.getElementById("datePicker");
const loading = document.getElementById("loading");
const content = document.getElementById("content");
const errorDiv = document.getElementById("error");

const titleEl = document.getElementById("title");
const dateEl = document.getElementById("date");
const imageEl = document.getElementById("image");
const explanationEl = document.getElementById("explanation");

async function getTodayPicture() {
  loading.style.display = "block";
  content.style.display = "none";
  errorDiv.style.display = "none";

  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    titleEl.textContent = data.title;
    dateEl.textContent = data.date;
    explanationEl.textContent = data.explanation;
    imageEl.src = data.hdurl || data.url;
    imageEl.alt = data.title;

    content.style.display = "block";
  } catch (e) {
    errorDiv.textContent = "API broke :(";
    errorDiv.style.display = "block";
  } finally {
    loading.style.display = "none";
  }
}

// buttons
todayBtn.onclick = getTodayPicture;
window.onload = getTodayPicture;   // auto load today
dateBtn.onclick = () => alert("date picker not done yet");









// Bunch of old unused code --> script.js - rough draft console.log("script loaded!"); const todayBtn = document.getElementById("todayBtn"); const dateBtn = document.getElementById("dateBtn"); const datePicker = document.getElementById("datePicker"); todayBtn.addEventListener("click", () => {  alert("Today button works!");}); dateBtn.addEventListener("click", () => { if (datePicker.value) {
    //alert("You picked: " + datePicker.value);
 // } else {
 //   alert("pick a date first dummy");;//