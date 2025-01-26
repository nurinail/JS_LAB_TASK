let btnClick = document.querySelectorAll(".main_option_select_btn");
let btnIcon = document.querySelectorAll(".btnIcon");
let selectText = document.querySelectorAll(".main_option_select_text");
btnClick.forEach((item) => {
  item.addEventListener("click", () => {
    item.nextElementSibling.classList.toggle("active");
    if (item.children[0].classList.contains("fa-chevron-down")) {
      item.children[0].classList.replace("fa-chevron-down", "fa-chevron-up");
    } else {
      item.children[0].classList.replace("fa-chevron-up", "fa-chevron-down");
    }
  });
});
