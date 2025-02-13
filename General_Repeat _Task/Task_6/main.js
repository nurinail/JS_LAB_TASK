let users = [
  {
    id: 1,
    imgSrc: "images/img1.png",
    name: "Lelah Nichols",
    position: "Troy, Ml",
    tags: ["clothes", "steam"],
  },
  {
    id: 2,
    imgSrc: "images/img2.png",
    name: "Jesus Weiss",
    position: "Fort Worth, TX",
    tags: ["headset", "gadget", "speed", "winter"],
  },
  {
    id: 3,
    imgSrc: "images/img3.png",
    name: "Annie Rice",
    position: "Austin, TX",
    tags: ["road", "mountain", "trip", "earth", "nature"],
  },
  {
    id: 4,
    imgSrc: "images/img4.png",
    name: "Robert Brower",
    position: "Cincinnati, OH",
    tags: ["maintance", "gears", "frames", "repair"],
  },
  {
    id: 5,
    imgSrc: "images/img5.png",
    name: "Amy Campbell",
    position: "Warrior, AL",
    tags: ["music", "disks"],
  },
  {
    id: 6,
    imgSrc: "images/img6.png",
    name: "Anthony S. Morin",
    position: "Lyndhurst, NJ",
    tags: ["vintage", "electric"],
  },
];
let filteredUser = users;
let mainUsers = document.querySelector(".main_users");
let form = document.querySelector(".header_navigation_form");
let formInput = document.querySelector(".header_navigation_form_input");
function getWrite() {
  mainUsers.innerHTML = users
    .map(
      (user, index) =>
        `
        <div class="main_users_item" data-useId="${index + 1}">
                    <img class="main_users_item_img" src="${
                      user.imgSrc
                    }" alt="img">
                    <div class="main_users_item_about">
                        <h2 class="main_users_item_about_name">${user.name}</h2>
                        <span class="main_users_item_about_position">${
                          user.position
                        }</span>
                        <div class="main_users_item_about_hobby">
                        ${user.tags
                          .map(
                            (item) =>
                              `
                            <span class="main_users_item_about_hobby_item">${item}</span>
                            `
                          )
                          .join("")}
                            
                        </div>
                    </div>
                </div>
        `
    )
    .join("");
}

let arr = new Set();
users.map((item) => item.tags.map((e) => arr.add(e)));
let filteredTag = document.querySelector(".formFilteredTags");
function getFilter() {
  filteredTag.innerHTML = Array.from(arr)
    .map(
      (item) =>
        ` <li class="formFilteredTagsItem"><label for="${item}">${item}</label> <input class="checkBox" id="${item}" value="${item}" type="checkbox"></li>
        `
    )
    .join("");
}
getFilter();
filteredTag.addEventListener("change", filterUsersByTag);
function filterUsersByTag() {
  let checkedTags = Array.from(
    document.querySelectorAll(".checkBox:checked")
  ).map((checkbox) => checkbox.value);
  if (checkedTags.length === 0) {
    users = filteredUser;
  } else {
    users = filteredUser.filter((user) =>
      checkedTags.every((tag) => user.tags.includes(tag))
    );
  }
  getWrite();
}

getWrite();
formInput.addEventListener("input", getSearch);
function getSearch(e) {
  e.preventDefault();
  let inputValue = formInput.value.trim().toLowerCase();
  if (inputValue === "") {
    users = filteredUser;
    getWrite();
  } else {
    let filterArr = users.filter(
      (item) => item.name.trim().toLowerCase().startsWith(inputValue) == true
    );
    users = filterArr;
    getWrite();
  }
}
let filterBtn = document.querySelector(".header_navigation_form_filterBtn");
filterBtn.addEventListener("click", () => {
  filteredTag.classList.toggle("filter");
  filteredTag.classList.toggle("filteredActive");
});
