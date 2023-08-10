window.onscroll = function(){
    scroll = document.documentElement.scrollTop;
    header = document.getElementById("header");

    if(scroll > 20 ){
        header.classList.add('nav_mod');
    }
    else if(scroll < 20){
        header.classList.remove('nav_mod');
    }

}

document.getElementById("btn_menu").addEventListener("click", mostrar_menu);
let menu = document.getElementById("header");
let nav = document.getElementById("nav");
let body = document.getElementById("container_all")

function mostrar_menu(){
    
    menu.classList.toggle("move_content");
    nav.classList.toggle("move_nav");
    body.classList.toggle("move_content");
}

window.addEventListener("resize",function(){
    if(window.innerWidth > 760){
        menu.classList.remove("move_content");
        nav.classList.remove("move_nav");
        body.classList.remove("move_content");
    }
})