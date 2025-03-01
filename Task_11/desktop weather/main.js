let container = document.querySelector(".container");
let weatherWrappper = document.querySelector(".weatherWrappper");
let searchInput = document.querySelector(".searchInput");
let weatherInfo = document.querySelector(".weatherInfo_details_list_title"); 
let tempDeg = document.querySelector(".weatherWrappper_degree");
let cityName = document.querySelector(".weatherWrappper_center_city");
let weatherDate = document.querySelector(".weatherWrappper_center_date");
let tempDegMax = document.querySelector(".maxDeg");
let tempDegMin = document.querySelector(".minDeg");
let humadityPer = document.querySelector(".humidity");
let cloudyPer = document.querySelector(".cloudy");
let windDeg = document.querySelector(".windy");
let weatherWrappper_icon = document.querySelector(".weatherWrappper_icon");
let warning = document.querySelector(".warning");
let date = new Date();

let hours = Number(date.getHours().toString().padStart(2, "0"));
let minutes = date.getMinutes().toString().padStart(2, "0");
let day = date.getDate().toString().padStart(2, "0");
let monthNumber = date.getMonth() + 1;
let weekNumber = date.getDay();
let month;
let weekDay;
switch (monthNumber) {
  case 1:
    month = "Yanvar";

    break;
  case 2:
    month = "Fevral";

    break;
  case 3:
    month = "Mart";

    break;
  case 4:
    month = "Aprel";

    break;
  case 5:
    month = "May";

    break;
  case 6:
    month = "İyun";

    break;
  case 7:
    month = "İyul";

    break;
  case 8:
    month = "Avqust";

    break;
  case 9:
    month = "Sentyabr";

    break;
  case 10:
    month = "Oktyabr";

    break;
  case 11:
    month = "Noyabr";

    break;
  case 12:
    month = "Dekabr";

    break;

  default:
    break;
}
switch (weekNumber) {
  case 0:
    weekDay = "Bazar";

    break;
  case 1:
    weekDay = "Bazar ertəsi";

    break;
  case 2:
    weekDay = "Çərşənbə axşamı";

    break;
  case 3:
    weekDay = "Çərşənbə";

    break;
  case 4:
    weekDay = "Cümə axşamı";

    break;
  case 5:
    weekDay = "Cümə";

    break;
  case 6:
    weekDay = "Şənbə";

    break;

  default:
    break;
}
let year = date.getFullYear();

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    let cityValue = searchInput.value.toLowerCase();
    getCity(cityValue);
    searchInput.value = null;
  }
});

async function getCity(city) {
  try {
    let res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7decc221988aba5d2cdfc373ce8e3b3b&units=metric&lang=az`
    );
    let data = await res.json();
    console.log(data);
    let action = data.weather[0].main;
    warning.innerHTML = "";
    cityName.innerHTML = data.name;
    tempDeg.innerHTML = Math.round(data.main.temp);
    weatherDate.innerHTML = `${hours}:${minutes}-${weekDay} ,${day} ${month} ${year}`;
    weatherInfo.innerHTML = data.weather[0].description.toUpperCase();
    weatherWrappper_icon.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
    );
    tempDegMax.innerHTML = Math.round(data.main.temp_max);
    tempDegMin.innerHTML = Math.round(data.main.temp_min);
    humadityPer.innerHTML = `${data.main.humidity}%`;
    cloudyPer.innerHTML = `${data.clouds.all}%`;
    windDeg.innerHTML = `${Math.round(data.wind.speed)} km/s`;
    if (action === "Snow") {
      container.style.backgroundImage = 'url("images/winter.jpg")';
      getSnow();
      if ((hours >= 19 && hours <= 24) || (hours >= 0 && hours <= 6)) {
        container.style.backgroundImage = 'url("images/nightWinter.jpg")';
      } else if (hours < 19 && hours > 6) {
        container.style.backgroundImage = 'url("images/clear.jpg")';
      }
    } else if (action === "Rain") {
      getRainy();
    } else {
      container.style.backgroundImage = 'url("images/clear.jpg")';
      getClearSky();
    }
  } catch (error) {
    warning.innerHTML = "Zəhmət olmasa düzgün şəhər adı daxil edin";
  }
}

getCity("bakı");

const canvas = document.getElementById("weatherCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
let weatherType = "clear";

class Particle {
  constructor(x, y, speedX, speedY, size, color) {
    this.x = x;
    this.y = y;
    this.speedX = speedX;
    this.speedY = speedY;
    this.size = size;
    this.color = color;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.y > canvas.height) {
      this.y = 0;
      this.x = Math.random() * canvas.width;
    }
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function createParticles() {
  particles = [];
  let color, speedY, size;

  if (weatherType === "rain") {
    color = "rgba(173, 216, 230, 0.8)";
    for (let i = 0; i < 100; i++) {
      let x = Math.random() * canvas.width;
      let y = Math.random() * canvas.height;
      speedY = Math.random() * 4 + 2;
      size = Math.random() * 2 + 1;
      particles.push(new Particle(x, y, 0, speedY, size, color));
    }
  } else if (weatherType === "snow") {
    color = "white";
    for (let i = 0; i < 100; i++) {
      let x = Math.random() * canvas.width;
      let y = Math.random() * canvas.height;
      speedY = Math.random() * 7 + 0.5;
      size = Math.random() * 4 + 2;
      particles.push(new Particle(x, y, 0, speedY, size, color));
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle) => {
    particle.update();
    particle.draw();
  });

  requestAnimationFrame(animate);
}

function getSnow() {
  weatherType = "snow";
  createParticles();
}

function getRainy() {
  weatherType = "rain";
  createParticles();
}

function getClearSky() {
  weatherType = "clear";
  particles = [];
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  createParticles();
});

animate();
getCity("Bakı");
