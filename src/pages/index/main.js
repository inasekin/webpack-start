require('../../assets/scss/main.scss');
require('./page.scss');
import Swiper, { Navigation, Pagination } from 'swiper';
import '../../assets/img/test.svg';
import '../../assets/img/test2.svg';

Swiper.use([Navigation, Pagination]);

document.addEventListener('DOMContentLoaded', () => {
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
});
