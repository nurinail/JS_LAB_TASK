let form = document.getElementById("form");
let main = document.querySelector(".main");
let warning = document.querySelector(".warning");
let parentElement = document.querySelector(".parent");

let date = new Date();
let todayDay = new Date().getDate();
let todayMonth = new Date().getMonth() + 1;
let todayYear = new Date().getFullYear();
let lastDay = 0;
let lastMonth = 0;
let lastYear = 0;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let dayInput = Number(document.querySelector("#dayInput").value);
  let monthInput = Number(document.querySelector("#monthInput").value) - 1;
  let yearInput = Number(document.querySelector("#yearInput").value);
  let birdtDay = new Date(yearInput, monthInput, dayInput, 0);
  lastYear = todayYear - birdtDay.getFullYear();
  lastMonth = todayMonth - (birdtDay.getMonth() + 1);
  lastDay = todayDay - birdtDay.getDate();
  if (lastMonth < 0) {
    lastYear--;
    lastMonth += 12;
  }
  if (lastDay < 0) {
    lastMonth--;
    let monthDay = new Date(yearInput, monthInput - 1, 0).getDate();
    lastDay += monthDay;
  }
  getWrite();
});

function getWrite() {
  main.innerHTML = `
  <p class="today">Today is: <span>${todayDay}.${todayMonth}.${todayYear}  ${date.getHours()}:${date.getMinutes()}</span></p>
  <div>
      <h2 class="calculated"><span>${lastYear}</span> years</h2>
      <h2 class="calculated"><span>${lastMonth}</span> months</h2>
      <h2 class="calculated"><span>${lastDay}</span> days</h2>
  </div>
`;
}
getWrite();
