let form=document.querySelector(".form");
let btnClick=document.querySelector(".btnClick")
let input=document.querySelector(".input")
let isExist=false;
btnClick.addEventListener("click",(e)=>{
    e.preventDefault();
    if(!isExist){
        input.setAttribute("type","text");
        isExist=true
    }else{
        input.setAttribute("type","password");
        isExist=false
    }
    
})