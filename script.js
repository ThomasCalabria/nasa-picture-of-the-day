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

async function getTodayPicture(date = "") {
    loading.style.display = "block";
    content.style.display = "none";
    errorDiv.style.display = "none";

    try {
        let url = API_URL;
        if (date) url += `&date=${date}`;

        const res = await fetch(url);
        if (!res.ok) throw new Error("Error fetching picture");

        const data = await res.json();

        titleEl.textContent = data.title;
        dateEl.textContent = data.date;
        explanationEl.textContent = data.explanation;
        imageEl.src = data.hdurl || data.url;
        imageEl.alt = data.title;

        content.style.display = "block";
    } catch (e) {
        errorDiv.textContent = "Couldn't load picture – try another date";
        errorDiv.style.display = "block";
    } finally {
        loading.style.display = "none";
    }
}

// Buttons now actually work this time
todayBtn.onclick = () => getTodayPicture();                   // today
dateBtn.onclick = () => {
    const picked = datePicker.value;
    if (!picked) {
        errorDiv.textContent = "Please pick a date first!";
        errorDiv.style.display = "block";
        return;
    }
    getTodayPicture(picked);                                    // chosen date
};

// Loads today's picture
window.onload = () => getTodayPicture();