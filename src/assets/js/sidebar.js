const main = document.querySelector('.main');
const menuRight = main.querySelector('.right-menu');
const topMenuSize = menuRight.getBoundingClientRect().top;

let sideBottom;
let contBottom;

window.addEventListener('scroll', () => {
  sideBottom = menuRight.clientHeight + topMenuSize;
  contBottom = main.clientHeight;

  if (window.scrollY + sideBottom > contBottom) {
    menuRight.classList.add('lock-menu');
  } else {
    menuRight.classList.remove('lock-menu');
  }
});
