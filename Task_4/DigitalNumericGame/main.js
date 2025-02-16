let form = document.querySelector(".form");
let answer = document.querySelector(".parentQuestion");
let random = Math.trunc(Math.random() * 100);
let tryy = document.querySelector(".try");
let newGameSection = document.querySelector(".newMainGame");
let lastNumbers = document.querySelector(".lastNumbers");
let newGameBtn = document.querySelector(".newGameBtn");
let newWinnerGame = document.querySelector(".newWinnerGame");
let winnerBtn = document.querySelector(".winnerBtn");
let newGameTitle=document.querySelector(".newGameTitle")
let arr = [];
let account = 5;
function writeHistory() {
  lastNumbers.innerHTML = `Son yazdığın ədədlər: ${arr
    .map((e) => e)
    .join(",")}`;
}
function newGame() {
  location.reload();
}

console.log(random);
function getWrite(e) {
  e.preventDefault();
  let input = document.querySelector(".formInput");
  inputValue = Number(input.value);
  if (inputValue === random) {
    answer.innerHTML = "OOO Möhtəşəmm. Siz qalibsiz :)";
    answer.style.color = "green";
    input.value = "";
    setTimeout(() => {
      newWinnerGame.classList.remove("nonActive");
      newWinnerGame.classList.add("winner");
    }, 2000);
  }
  if (inputValue > random || (inputValue < random && inputValue)) {
    account--;
    arr.push(inputValue);
    answer.style.color = "yellow";
    tryy.innerHTML = `${account} cəhdin qalıb`;
    tryy.style.color = "red";
    input.value = "";
    writeHistory();
  }
  if (inputValue < random) {
    if (!inputValue) {
      answer.style.color = "purple";
      answer.innerHTML = "Lütfən 0 və 100 arası dəyər daxil edin";
    } else {
      answer.innerHTML = "Yuxarı ədəd seçin";
    }
  }
  if (inputValue > random) {
    answer.innerHTML = "Aşağı ədəd seçin";
  }
  if (account === 0) {
    answer.style.color = "red";
    answer.innerHTML = "Təəssüf edirəm. Siz Uduzdunuz :(";
    arr = [];
    setTimeout(() => {
      newGameTitle.innerHTML=`Məğlub oldunuz. Mənim tutduğum ədəd: ${random}`
      newGameTitle.style.color="red"
      newGameSection.classList.remove("nonActive");
      newGameSection.classList.add("newGame");
    }, 2000);
  }
}
newGameBtn.addEventListener("click", newGame);
winnerBtn.addEventListener("click", newGame);
form.addEventListener("submit", getWrite);
