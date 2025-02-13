let toDoListesUl = document.querySelector(".add_section_lista_ul");
let form = document.querySelector(".add_section_form");
let headerDate=document.querySelector(".header_left_date")
let accountList=document.querySelector(".container_header_rightCircle_span")
let listMessageArr = []; 
let date=new Date(); 
headerDate.innerHTML=`${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`

function getWrite(){
  toDoListesUl.innerHTML=listMessageArr.map((msg,index)=>(
    `
    <li class="add_section_lista_ul_item" data-mainListId="${index}">
      <input class="add_section_lisl_item_text" type="text" value="${msg}" readonly>
      <button class="add_section_lista_ul_item_button"><i class="fa-solid fa-bars"></i></button>
      <div class="active">
        <button class="remove add_section_lista_ul_item_popap_btn" data-listId="${index}">Remove</button>
        <button class="change add_section_lista_ul_item_popap_btn">Change</button>
      </div>
    </li>
    `
  )).join("");
  accountList.innerHTML=`${listMessageArr.length}`
}
getWrite();

function getAdd(e){
e.preventDefault()
let formInput=document.querySelector(".add_section_form_input");
listMessageArr.push(formInput.value);
getWrite();
formInput.value="";
}
toDoListesUl.addEventListener("click",(e)=>{
  if(e.target.classList.contains("remove")){
    let removeId=Number(e.target.getAttribute("data-listId"));
    listMessageArr.splice(removeId,1);
    getWrite();
  }
  if(e.target.classList.contains("change")){
    let listText=e.target.parentElement.previousElementSibling.previousElementSibling;
    listText.toggleAttribute("readonly");
  }
  if(e.target.classList.contains("fa-bars")){
    let toggleItem=e.target.parentElement.nextElementSibling;
    toggleItem.classList.toggle("active");
    toggleItem.classList.toggle("add_section_lista_ul_item_popap");

  }
})

form.addEventListener("submit",getAdd);
