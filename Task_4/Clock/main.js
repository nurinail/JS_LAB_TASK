let digitalClock = document.querySelector(".digital_clock");

setInterval(() => {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let second = date.getSeconds();
  digitalClock.innerHTML = `${hours.toString().padStart(2,0)}:${minutes.toString().padStart(2,0)}:${second.toString().padStart(2,0)}`;
}, 1000);
