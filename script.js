import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// Firebase config (SAMO URL – demo mode)
const firebaseConfig = {
  databaseURL: "https://smart-room-monitoring-d71cd-default-rtdb.europe-west1.firebasedatabase.app/"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);


const roomRef = ref(db, "room");
const tempEl = document.getElementById("temp");
const humEl = document.getElementById("hum");
const motionEl = document.getElementById("motion");
const lightEl = document.getElementById("light");
const ledEl = document.getElementById("ledIndicator");

// Listen real-time
onValue(roomRef, (snapshot) => {
  const data = snapshot.val();
  if (!data) return;

  tempEl.textContent = `${data.temperature ?? "--"} °C`;
  humEl.textContent = `${data.humidity ?? "--"} %`;

  motionEl.textContent = data.motion ? "Detected" : "No motion";
  motionEl.className = "status";

  lightEl.textContent = data.dark ? "Dark" : "Bright";
  lightEl.className = "status";

  ledEl.className = data.led ? "led-on" : "led-off";
});