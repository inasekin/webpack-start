require('../../assets/scss/main.scss');
require('./page.scss');
import Swiper, { Navigation, Pagination } from 'swiper';
import { headerActivity } from '../../assets/js/bar.es6.js';

Swiper.use([Navigation, Pagination]);

document.addEventListener('DOMContentLoaded', () => {
  headerActivity();

  new Swiper('.region-info__wrapper .swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: false,
    allowTouchMove: true,
    slidesPerView: 1.1,
    grid: {
      rows: 1,
      fill: 'row',
    },
    breakpoints: {
      768: {
        allowTouchMove: false,
        slidesPerView: 3,
        grid: {
          rows: 2,
          fill: 'row',
        },
      },
      1100: {
        allowTouchMove: false,
        slidesPerView: 4,
        grid: {
          rows: 4,
          fill: 'row',
        },
      },
    },
  });

  const regionBlock = document.querySelector('.region-info__wrapper');
  if (regionBlock) {
    const regionVacBtn = regionBlock.querySelector('.region-info__show-btn');
    const regionVacsSwiper = regionBlock.querySelector(
      '.region-info__boxes .swiper-wrapper'
    );
    if (regionVacBtn && regionVacsSwiper) {
      regionVacBtn.addEventListener('click', (evt) => {
        evt.preventDefault();
        if (
          !regionVacsSwiper.classList.contains('swiper-wrapper--show-elements')
        ) {
          regionVacsSwiper.classList.add('swiper-wrapper--show-elements');
          regionVacBtn.style.display = 'none';
        }
      });
    }
  }

  const friendBlock = document.querySelector('.friends__content');
  if (friendBlock) {
    const friendsPersons = friendBlock.querySelectorAll('.friends__person');
    const friendsComments = friendBlock.querySelectorAll('.friend-comment');
    if (friendsPersons.length && friendsComments.length) {
      friendsPersons.forEach((person) => {
        person.addEventListener('click', () => {
          if (!person.classList.contains('friends__person--active')) {
            const idCurrent = person.getAttribute('data-person');
            const personActive = friendBlock.querySelector(
              '.friends__person--active'
            );
            const commentActive = friendBlock.querySelector(
              '.friend-comment--show'
            );
            const commentNew = friendBlock.querySelector(
              `.friend-comment[data-person="${idCurrent}"]`
            );
            if (personActive && commentActive) {
              personActive.classList.remove('friends__person--active');
              commentActive.classList.remove('friend-comment--show');
            }
            person.classList.add('friends__person--active');
            commentNew.classList.add('friend-comment--show');
          }
        });
      });
    }
  }

  const rollerBlocks = document.querySelectorAll('.roller-block');
  if (rollerBlocks.length) {
    rollerBlocks.forEach((roller) => {
      const rollerHidden = roller.querySelector('.roller-block__hidden');
      const rollerBtn = roller.querySelector('.roller-block__btn');
      if (rollerBtn && rollerHidden) {
        rollerBtn.addEventListener('click', (evt) => {
          evt.preventDefault();
          rollerHidden.style.display = 'block';
          rollerBtn.style.display = 'none';
        });
      }
    });
  }
});
