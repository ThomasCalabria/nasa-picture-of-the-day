const API_URL = "https://api.nasa.gov/planetary/apod?api_key=fgmJ5pIs2VVcg5GOdGiX5YA5PbQcem6DXroE19wg";  //stupid demo key was the problem as to why the image wasnt loading, changed to my own generated API key

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

function showPicture(data) {
  titleEl.textContent = data.title;
  dateEl.textContent = data.date;
  explanationEl.textContent = data.explanation;

  // remove any old video iframe
  const oldIframe = content.querySelector("iframe");
  if (oldIframe) oldIframe.remove();

  if (data.media_type === "image") {
    imageEl.src = data.hdurl || data.url;
    imageEl.alt = data.title;
    imageEl.style.display = "block";
    // click image → open HD version in new tab
    imageEl.onclick = () => window.open(data.hdurl || data.url, "_blank");
  } else {
    // it's a video (rare, but happens)
    imageEl.style.display = "none";
    const iframe = document.createElement("iframe");
    iframe.width = "100%";
    iframe.height = "500";
    iframe.src = data.url;
    iframe.frameBorder = "0";
    iframe.allowFullscreen = true;
    content.appendChild(iframe);
  }

  content.style.display = "block";
}

async function getTodayPicture(date = "") {
  loading.style.display = "block";
  content.style.display = "none";
  errorDiv.style.display = "none";

  try {
    let url = API_URL;
    if (date) url += `&date=${date}`;

    const res = await fetch(url);
    if (!res.ok) throw new Error("Bad date or Server Error");

    const data = await res.json();
    showPicture(data);
  } catch (e) {
    errorDiv.textContent = "Error: " + e.message;
    errorDiv.style.display = "block";
  } finally {
    loading.style.display = "none";
  }
}

// Final polished button functions
todayBtn.onclick = () => getTodayPicture();
dateBtn.onclick = () => {
  const picked = datePicker.value;
  if (!picked) {
    errorDiv.textContent = "Please pick a date first!";
    errorDiv.style.display = "block";
    return;
  }
  getTodayPicture(picked);
};

// Loads today's picture
window.onload = () => getTodayPicture();

//new random button to satisfy 2nd endpoint requirement
const randomBtn = document.getElementById("randomBtn");
randomBtn.onclick = () => {
  getPictureByCount();  
};

async function getPictureByCount() {
  loading.style.display = "block";
  content.style.display = "none";
  errorDiv.style.display = "none";

  try {
    const res = await fetch(API_URL + "&count=1"); 
    if (!res.ok) throw new Error("API error");
    const data = await res.json();
    showPicture(data[0]); 
  } catch (e) {
    errorDiv.textContent = "Error: " + e.message;
    errorDiv.style.display = "block";
  } finally {
    loading.style.display = "none";
  }
}