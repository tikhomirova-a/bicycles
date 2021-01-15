'use strict';

(function () {
  const ESCAPE = 'Escape';
  const body = document.querySelector('.page-body');
  const header = body.querySelector('.page-header');
  const headerNav = header.querySelector('.page-header__nav');
  const menuToggle = headerNav.querySelector('button');

  const closeMenuInFlow = () => {
    header.classList.remove('page-header--nojs');
    headerNav.classList.remove('page-header__nav--nojs');
  }

  closeMenuInFlow();

  const showMenu = () => {
    headerNav.classList.add('page-header__nav--open');
    body.classList.add('page-body--menu-open');
    headerNav.addEventListener('keydown', onEscPress);
  }

  const hideMenu = () => {
    headerNav.classList.remove('page-header__nav--open');
    body.classList.remove('page-body--menu-open');
    headerNav.removeEventListener('keydown', onEscPress);
  }

  const toggleMenu = () => {
    return headerNav.classList.contains('page-header__nav--open') ? hideMenu() : showMenu();
  }

  const onMenuTogglePress = (evt) => {
    evt.preventDefault();
    toggleMenu();
  }

  const onEscPress = (evt) => {
    if (evt.key === ESCAPE) {
      evt.preventDefault();
      toggleMenu();
    }
  }

  menuToggle.addEventListener('click', onMenuTogglePress);
})();
