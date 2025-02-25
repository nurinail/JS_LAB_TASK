let input = document.querySelector(".headerInput");
let tempDeg = document.querySelector(".degree");
let cityName = document.querySelector(".headerForecastCenterCity");
let dateForScreen = document.querySelector(".headerForecastCenterDate");
let forecastImg = document.querySelector(".headerForecastImg");
let mainCenterAction = document.querySelector(".mainCenterAction");
let maxDeg = document.querySelector(".maxDeg");
let minDeg = document.querySelector(".minDeg");
let humadityPer = document.querySelector(".humadityPer");
let cloudyPer = document.querySelector(".cloudyPer");
let windSpeed = document.querySelector(".windSpeed");
let warning = document.querySelector(".warning");
let btn = document.querySelector(".btn");
let date = new Date();
let hours = date.getHours().toString().padStart(2, "0");
let minutes = date.getMinutes().toString().padStart(2, "0");
let weekDayNumber = date.getDay();
let monthDayNumber = date.getMonth() + 1;
let year = date.getFullYear().toString().slice(2, 4);
let weekDay;
let monthDay;
switch (weekDayNumber) {
  case 1:
    weekDay = "Monday";
    break;
  case 2:
    weekDay = "Tuesday";
    break;
  case 3:
    weekDay = "Wednesdsy";
    break;
  case 4:
    weekDay = "Thursday";
    break;
  case 5:
    weekDay = "Friday";
    break;
  case 6:
    weekDay = "Saturday";
    break;
  case 7:
    weekDay = "Sunday";
    break;
}
switch (monthDayNumber) {
  case 1:
    monthDay = "Jan";
    break;
  case 2:
    monthDay = "Feb";
    break;
  case 3:
    monthDay = "Mar";
    break;
  case 4:
    monthDay = "Apr";
    break;
  case 5:
    monthDay = "May";
    break;
  case 6:
    monthDay = "Jun";
    break;
  case 7:
    monthDay = "Jul";
    break;
  case 8:
    monthDay = "Aug";
    break;
  case 9:
    monthDay = "Sep";
    break;
  case 10:
    monthDay = "Oct";
    break;
  case 11:
    monthDay = "Nov";
    break;
  case 12:
    monthDay = "Dec";
    break;
}

console.log(year);
function getCity(e) {
  e.preventDefault();
  value = input.value.trim().toLowerCase();
  getData(value);
  input.value = null;
}
input.addEventListener("keydown", () => {
  if (e.key === "Enter") {
    getCity();
  }
});
btn.addEventListener("click", getCity);

async function getData(city) {
  try {
    warning.innerHTML = "";
    let res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7decc221988aba5d2cdfc373ce8e3b3b&units=metric&lang=az`
    );
    let data = await res.json();
    console.log(data);
    tempDeg.innerHTML = Math.trunc(data.main.temp);
    cityName.innerHTML = data.name;
    dateForScreen.innerHTML = `${hours}:${minutes} ${weekDay},${monthDay}'${year}`;
    mainCenterAction.innerHTML = data.weather[0].description
      .toString()
      .toUpperCase();
    maxDeg.innerHTML = Math.trunc(data.main.temp_max);
    minDeg.innerHTML = Math.trunc(data.main.temp_min);
    humadityPer.innerHTML = `${data.main.humidity}%`;
    cloudyPer.innerHTML = `${data.clouds.all}%`;
    windSpeed.innerHTML = `${Math.trunc(data.wind.speed)}km/h`;
    forecastImg.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png
  `
    );
    if (data.weather[0].main === "Rain") {
      rainEffect();
    }
    if (data.weather[0].main === "Snow") {
      snowEffect();
    } else {
      clearEffect();
    }
  } catch (error) {
    warning.innerHTML = "Düzgün şəhər adı daxil edin";
  }
}
getData("bakı");

function createEffect(type) {
  const container = document.getElementById("effectContainer");
  container.innerHTML = "";
  for (let i = 0; i < 100; i++) {
    let element = document.createElement("div");
    element.style.position = "absolute";
    element.style.top = Math.random() * window.innerHeight + "px";
    element.style.left = Math.random() * window.innerWidth + "px";
    if (type === "rain") {
      element.style.width = "2px";
      element.style.height = "15px";
      element.style.backgroundColor = "deepskyblue";
      element.style.opacity = Math.random() * 0.7 + 0.3;
    } else {
      element.style.width = "5px";
      element.style.height = "5px";
      element.style.backgroundColor = "white";
      element.style.borderRadius = "50%";
      element.style.opacity = Math.random() * 0.8 + 0.2;
    }
    container.appendChild(element);
    animateElement(element, type);
  }
}

function animateElement(element, type) {
  let speed = type === "rain" ? 4 : 2;
  function fall() {
    let top = parseFloat(element.style.top);
    if (top > window.innerHeight) {
      element.style.top = "-10px";
      element.style.left = Math.random() * window.innerWidth + "px";
    } else {
      element.style.top = top + speed + "px";
    }
    requestAnimationFrame(fall);
  }
  fall();
}

function rainEffect() {
  createEffect("rain");
}

function snowEffect() {
  createEffect("snow");
}

function clearEffect() {
  document.getElementById("effectContainer").innerHTML = "";
}
