let paragraph=document.querySelector(".count");
let addBtn=document.querySelector(".add");
let reduceBtn=document.querySelector(".reduce");

let num=0;

addBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    num+=1
    paragraph.innerHTML=num
})
reduceBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    num-=1
    paragraph.innerHTML=num
})






