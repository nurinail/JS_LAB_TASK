let menuBtn = document.querySelector(".container_header_menu_button");
let afterClick = document.querySelector(".container_header_after_click");
let closeBtn = document.querySelector(
  ".container_header_after_click_top_closeBtn"
);
let listItem = document.querySelectorAll(
  ".container_header_after_click_ul_item"
);

menuBtn.addEventListener("click", () => {
  afterClick.classList.add("active");
});
closeBtn.addEventListener("click", () => {
  afterClick.classList.remove("active");
});
document.addEventListener("click", function (e) {
  if (
    afterClick.classList.contains("active") &&
    !afterClick.contains(e.target) &&
    !menuBtn.contains(e.target)
  ) {
    afterClick.classList.remove("active");
  }
});

listItem.forEach((item) => {
  item.addEventListener("mouseover", () => {
    item.style.backgroundColor = "#E1E1E2";
  });
  item.addEventListener("mouseout", () => {
    item.style.background = "transparent";
  });
});
