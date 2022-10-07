import { slideDown, slideUp } from './utils.es6.js';

let invocation = 0;

const Bar = () => {
  invocation++;
  return `barfoo ${invocation}`;
};

// header activities init
const headerActivity = function () {
  const burgerIcon = document.querySelector('.burger-icon');
  const burgerMenu = document.querySelector('.burger-menu');
  const bodyPage = document.querySelector('body');
  const header = document.querySelector('header');

  burgerIcon.addEventListener('click', () => {
    if (
      burgerMenu.classList.contains('burger-menu--close') &&
      !burgerMenu.classList.contains('burger-menu--collapsing')
    ) {
      burgerMenu.classList.add('burger-menu--collapsing');
      burgerMenu.classList.remove('burger-menu--close');
      bodyPage.classList.add('blocked');
      slideDown(burgerMenu, 400, () => {
        burgerMenu.classList.remove('burger-menu--collapsing');
      });
    } else if (
      !burgerMenu.classList.contains('burger-menu--close') &&
      !burgerMenu.classList.contains('burger-menu--collapsing')
    ) {
      burgerMenu.classList.add('burger-menu--collapsing');
      burgerMenu.classList.add('burger-menu--close');
      bodyPage.classList.remove('blocked');
      slideUp(burgerMenu, 400, () => {
        burgerMenu.classList.remove('burger-menu--collapsing');
      });
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1296 && burgerMenu.style.display === 'none') {
      burgerMenu.style.display = 'block';
    } else if (
      window.innerWidth <= 1296 &&
      !burgerMenu.classList.contains('burger-menu--close')
    ) {
      burgerMenu.classList.contains('burger-menu--close');
    }
  });

  header.addEventListener('animationstart', () => {
    header.classList.add('animation-collapsing');
  });
  header.addEventListener('animationend', () => {
    header.classList.remove('animation-collapsing');
    header.style.top = 0;
  });

  const headerHeight = header.getBoundingClientRect().height;
  window.addEventListener('scroll', () => {
    const topScrolled = window.pageYOffset;
    if (!header.classList.contains('header--scrolled')) {
      if (topScrolled < headerHeight) {
        header.style.top = `-${topScrolled}px`;
      } else {
        header.classList.add('header--scrolled');
      }
    } else if (
      topScrolled === 0 &&
      !header.classList.contains('animation-collapsing')
    ) {
      header.classList.remove('header--scrolled');
    }
  });
};

//vacancy-menu functional
const vacHiddenListHide = function (evt) {
  const vacHiddenMenus = document.querySelectorAll('.vac-functional__more');
  if (
    vacHiddenMenus.length &&
    !(
      evt.target.classList.contains('vac-functional__hidden-list') ||
      evt.target.closest('.vac-functional__hidden-list')
    )
  ) {
    vacHiddenMenus.forEach((el) => el.classList.remove('open'));
    document.removeEventListener('click', vacHiddenListHide);
  }
};

const userActivitiesSubmenuInit = function () {
  const blockOverflowed = function (
    block,
    blockChildren,
    gap,
    additionalBlock = 0
  ) {
    let sumWidth = 0;
    Array.from(blockChildren).forEach((el, ind) => {
      sumWidth += el.clientWidth;
      if (ind !== blockChildren.length - 1) {
        sumWidth += gap;
      }
    });
    if (additionalBlock > 0) {
      sumWidth += additionalBlock;
    }
    return sumWidth > block.clientWidth;
  };

  const vacFunctionalBlocks = document.querySelectorAll('.vac-functional');
  if (vacFunctionalBlocks.length) {
    document.addEventListener('click', vacHiddenListHide);
    vacFunctionalBlocks.forEach((vacFunctionalBlock) => {
      const vacVisibleList = vacFunctionalBlock.querySelector(
        '.vac-functional__visible-list'
      );
      const vacFuncItems = vacVisibleList.getElementsByTagName('li');
      const vacHiddenBlock = vacFunctionalBlock.querySelector(
        '.vac-functional__more'
      );
      const vacHiddenList = vacFunctionalBlock.querySelector(
        '.vac-functional__hidden-list'
      );
      const hiddenMenuTrigger = vacHiddenBlock.querySelector('span');
      if (blockOverflowed(vacFunctionalBlock, vacFuncItems, 10)) {
        vacHiddenBlock.style.display = 'block';
        if (hiddenMenuTrigger.getAttribute('data-init') !== '1') {
          hiddenMenuTrigger.setAttribute('data-init', '1');
          hiddenMenuTrigger.addEventListener('click', (evt) => {
            evt.stopPropagation();
            if (vacHiddenBlock.classList.contains('open')) {
              vacHiddenBlock.classList.remove('open');
              document.removeEventListener('click', vacHiddenListHide);
            } else {
              vacHiddenBlock.classList.add('open');
              document.addEventListener('click', vacHiddenListHide);
            }
          });
        }
        Array.from(vacFuncItems).forEach(() => {
          if (
            blockOverflowed(
              vacFunctionalBlock,
              vacFuncItems,
              10,
              vacHiddenBlock.clientWidth + 10
            )
          ) {
            vacHiddenList.prepend(vacFuncItems[vacFuncItems.length - 1]);
          }
        });
      }
      window.addEventListener('resize', () => {
        let subMenuWidth = 0;
        const paddingItem = 10;
        if (vacHiddenBlock.style.display === 'block') {
          subMenuWidth = vacHiddenBlock.clientWidth + paddingItem;
        }
        if (
          blockOverflowed(vacFunctionalBlock, vacFuncItems, 10, subMenuWidth)
        ) {
          vacHiddenBlock.style.display = 'block';
          if (hiddenMenuTrigger.getAttribute('data-init') !== '1') {
            hiddenMenuTrigger.setAttribute('data-init', '1');
            hiddenMenuTrigger.addEventListener('click', (evt) => {
              evt.stopPropagation();
              if (vacHiddenBlock.classList.contains('open')) {
                vacHiddenBlock.classList.remove('open');
                document.removeEventListener('click', vacHiddenListHide);
              } else {
                vacHiddenBlock.classList.add('open');
                document.addEventListener('click', vacHiddenListHide);
              }
            });
          }
          Array.from(vacFuncItems).forEach(() => {
            if (
              blockOverflowed(
                vacFunctionalBlock,
                vacFuncItems,
                10,
                subMenuWidth
              )
            ) {
              vacHiddenList.prepend(vacFuncItems[vacFuncItems.length - 1]);
            }
          });
        }
      });
    });
  }
};

//modal-forms init
const modalFormInit = function () {
  const modalForms = document.querySelectorAll('.modal-form');
  if (modalForms.length) {
    modalForms.forEach((modalForm) => {
      const modalFormClose = modalForm.querySelector('.modal-form__close');
      if (modalFormClose) {
        modalFormClose.addEventListener('click', () => {
          modalForm.style.display = 'none';
        });
      }
    });
  }
};

// coverLetter
const coverMenuInit = function () {
  const coverLetters = document.querySelectorAll('.cover-letter');
  if (coverLetters.length) {
    coverLetters.forEach((letter) => {
      const addBodyBtn = letter.querySelector('.cover-letter__open-btn');
      const bodyLetter = letter.querySelector('.cover-letter__body');
      const closeBodyBtn = letter.querySelector('.cover-letter__close');
      if (addBodyBtn && bodyLetter) {
        addBodyBtn.addEventListener('click', (evt) => {
          evt.preventDefault();
          bodyLetter.style.display = 'block';
          addBodyBtn.style.display = 'none';
        });
      }
      if (closeBodyBtn) {
        closeBodyBtn.addEventListener('click', (evt) => {
          evt.preventDefault();
          bodyLetter.style.display = 'none';
          addBodyBtn.style.display = 'block';
        });
      }
    });
  }
};

//changing text in block on mobile
const changeMobileTextInBlock = function () {
  const blocksToChangeText = document.querySelectorAll('.change-mob-text');
  if (blocksToChangeText.length) {
    blocksToChangeText.forEach((blockToChangeText) => {
      const textForChange = blockToChangeText.getAttribute('data-alttext');
      if (window.innerWidth <= 767.98 && textForChange) {
        blockToChangeText.textContent = textForChange;
      }
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth <= 767.98) {
        blocksToChangeText.forEach((blockToChangeText) => {
          const textForChange = blockToChangeText.getAttribute('data-alttext');
          if (textForChange !== blockToChangeText.textContent) {
            blockToChangeText.textContent = textForChange;
          }
        });
      }
    });
  }
};

//функционал поля загрузки файла
const fileFormFunctional = function (element) {
  const fileForm = element;
  const fileLabel = fileForm.querySelector('label');
  const fileInput = fileForm.querySelector('input');
  if (fileInput) {
    fileInput.addEventListener('change', () => {
      if (fileInput.value !== '') {
        const fileNameArray = fileInput.value.split('\\');
        const fileName = fileNameArray[fileNameArray.length - 1];
        let fileNameForDisplay = fileName;
        if (fileName.length > 9) {
          fileNameForDisplay = fileName.substr(0, 20).padEnd(9, '.');
        }
        fileLabel.textContent = fileNameForDisplay;
      }
    });
  }
};

export {
  Bar,
  headerActivity,
  userActivitiesSubmenuInit,
  modalFormInit,
  coverMenuInit,
  changeMobileTextInBlock,
  fileFormFunctional,
};
