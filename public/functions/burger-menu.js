let menu = document.getElementsByClassName('burger-menu')
function changeBurgerMenu(index){
  // console.log(index);
  menu[index].classList.toggle('open-menu')
}

let com_menu = document.getElementsByClassName('comment-menu')
function commentMenu(index){
  // console.log(index);
  com_menu[index].classList.toggle('open-menu')
}
