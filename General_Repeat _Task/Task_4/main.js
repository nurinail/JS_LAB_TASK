let toDoListes = document.querySelector(".add_section_lista_ul");
let form = document.querySelector(".add_section_form");
let headerDate=document.querySelector(".header_left_date")
let accountList=document.querySelector(".container_header_rightCircle_span")
let listMessageArr = [];
// let listItemData=[];
let date=new Date();
headerDate.innerHTML=`${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`

function refreshScreen() {
  toDoListes.innerHTML = listMessageArr
    .map(
      (list, index) =>
        `
    <li class="add_section_lista_ul_item" data-mainListId="${index}">
      <input class="add_section_lisl_item_text" type="text" value="${list}" readonly><button class="add_section_lista_ul_item_button"><i class="fa-solid fa-bars"></i></button>
      <div class="add_section_lista_ul_item_popap activee">
        <button class="add_section_lista_ul_item_popap_btn remove" data-listId="${index}">Remove</button>
        <button class="add_section_lista_ul_item_popap_btn change">Change</button>
      </div>
    </li>
    `
    )
    .join("");
}
function getAccountList(){
  accountList.innerHTML = listMessageArr.length;
}
function activeToggle() {
  document.addEventListener("click", (event) => {
    if (event.target.closest(".add_section_lista_ul_item_button")) {
      let list = event.target.closest(".add_section_lista_ul_item").querySelector(".add_section_lista_ul_item_popap");
      list.classList.toggle("activee");
    }
  });
};
function removeItem(event) {
  if (event.target.classList.contains("remove")) {
    let removeId = event.target.getAttribute("data-listId");
    listMessageArr.splice(removeId, 1);
    getAccountList();
    refreshScreen();
  }
};
function changeItem(ev){
let changeBtn=document.querySelectorAll(".change");
changeBtn.forEach(change=>{
  change.addEventListener("click",(e)=>{
   let itemInput=e.target.parentElement.parentElement.children[0];
   itemInput.toggleAttribute("readonly");
  })
  
})

}
function sendData(e) {
  e.preventDefault();
  let inputText = document.querySelector(".add_section_form_input");
  if (inputText.value.trim() !== "") {
  listMessageArr.push(inputText.value);
    getAccountList();
    refreshScreen();
  }
  inputText.value = "";
};
toDoListes.addEventListener("click", removeItem);
toDoListes.addEventListener("click", changeItem);
form.addEventListener("submit", sendData);
activeToggle();











// function activeToggle(){
//   let toggleBtn=document.querySelectorAll(".add_section_lista_ul_item_button");
//   toggleBtn.forEach(e=>{
//     e.addEventListener("click",()=>{
//       let list=e.nextElementSibling;
//       list.classList.toggle("activee")
//     })
//   });
// }
// function remove(){
//   removeBtn=document.querySelectorAll(".remove");
//   removeBtn.forEach(remove=>{
//     remove.addEventListener("click",()=>{
//      let removeId=remove.getAttribute("data-listId");
//      let filterList=listItemData.filter(list=>list.getAttribute("data-mainListId")!=removeId);
//      let newListMessageArr=[];
//      filterList.map(item=>(
//       newListMessageArr.push(item.children[0].innerHTML)
//      ));
//      listMessageArr=newListMessageArr;
//      refreshScreen();
  
//     })
//   })

// }

// function getListData(){
//   let listItem=document.querySelectorAll(".add_section_lista_ul_item");
//   listItemData.push(listItem[listItem.length-1]);

// }


// function sendData(e) {
//   e.preventDefault();
//   let inputText = document.querySelector(".add_section_form_input");
//   listMessageArr.push(inputText.value);
//   accountList.innerHTML=listMessageArr.length
//   refreshScreen();
//   getListData();
//   activeToggle();
//   remove();
//   console.log(listMessageArr)
// }

// form.addEventListener("submit", sendData);
