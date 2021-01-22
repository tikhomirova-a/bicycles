'use strict';

(function () {
  const body = document.querySelector(`.page-body`);
  let header;
  let headerNav;
  let menuToggle;
  let headerNavList;

  const existsInPage = (node) => {
    return body.contains(node);
  };

  if (existsInPage(body.querySelector(`.page-header`))) {
    header = body.querySelector(`.page-header`);

    if (existsInPage(body.querySelector(`.page-header__nav`))) {
      headerNav = header.querySelector(`.page-header__nav`);

      if (existsInPage(headerNav.querySelector(`button`))) {
        menuToggle = headerNav.querySelector(`button`);
      }

      if (existsInPage(headerNav.querySelector(`ul`))) {
        headerNavList = headerNav.querySelector(`ul`);
      }
    }
  }

  window.util = {
    body,
    header,
    headerNav,
    menuToggle,
    headerNavList,
    existsInPage
  };
})();

(function () {
  const ESCAPE = `Escape`;
  const FIRST_LI_PADDING = 50;

  const closeMenuInFlow = () => {
    if (window.util.existsInPage(window.util.header) && window.util.existsInPage(window.util.headerNav)) {
      window.util.header.classList.remove(`page-header--nojs`);
      window.util.headerNav.classList.remove(`page-header__nav--nojs`);
    }
  };

  closeMenuInFlow();

  const showMenu = () => {
    window.util.headerNav.classList.add(`page-header__nav--open`);
    window.util.body.classList.add(`page-body--modal-open`);
    window.util.headerNav.addEventListener(`keydown`, onEscPress);
    window.util.headerNavList.addEventListener(`scroll`, onOpenMenuScroll);
    window.util.body.addEventListener(`click`, onOverlayClick);
  };

  const hideMenu = () => {
    window.util.headerNav.classList.remove(`page-header__nav--open`);
    window.util.body.classList.remove(`page-body--modal-open`);
    window.util.headerNav.removeEventListener(`keydown`, onEscPress);
    window.util.headerNavList.removeEventListener(`scroll`, onOpenMenuScroll);
    window.util.body.removeEventListener(`click`, onOverlayClick);
  };

  const toggleMenu = () => {
    return window.util.headerNav.classList.contains(`page-header__nav--open`) ? hideMenu() : showMenu();
  };

  const onMenuTogglePress = (evt) => {
    evt.preventDefault();
    toggleMenu();
  };

  const onEscPress = (evt) => {
    if (evt.key === ESCAPE) {
      evt.preventDefault();
      toggleMenu();
    }
  };

  const onOverlayClick = (evt) => {
    if (evt.target.parentElement.tagName !== `NAV`) {
      hideMenu();
    }
  };

  if (window.util.existsInPage(window.util.menuToggle)) {
    window.util.menuToggle.addEventListener(`click`, onMenuTogglePress);
  }

  const hideButton = () => {
    return window.util.menuToggle.classList.add(`button-hide`);
  };

  const showButton = () => {
    return window.util.menuToggle.classList.remove(`button-hide`);
  };

  const onOpenMenuScroll = () => {
    let scrollPosition = window.util.headerNavList.scrollTop;
    return scrollPosition >= FIRST_LI_PADDING ? hideButton() : showButton();
  };

  window.main = {
    ESCAPE
  };
})();

(function () {
  const URL = `https://echo.htmlacademy.ru`;
  const HttpRequestMethod = {
    POST: `POST`
  };
  let main;
  let form;
  let name;
  let tel;

  if (window.util.existsInPage(window.util.body.querySelector(`main`))) {
    main = window.util.body.querySelector(`main`);

    if (window.util.existsInPage(main.querySelector(`.feedback__form`))) {
      form = main.querySelector(`.feedback__form`);

      if (window.util.existsInPage(form.querySelector(`#input-name`))
      && window.util.existsInPage(form.querySelector(`#input-tel`))) {
        name = form.querySelector(`#input-name`);
        tel = form.querySelector(`#input-tel`);
      }
    }
  }

  const onNameInput = () => {
    if (name.value === ``) {
      name.setCustomValidity(`Поле обязательно для заполнения.`);
    } else {
      name.setCustomValidity(``);
    }
    name.reportValidity();
  };

  const onTelInput = () => {
    const re = /^[^a-zA-Z]\d*$/g;
    if (tel.value.length !== 0 && !re.test(tel.value)) {
      tel.setCustomValidity(`Номер телефона должен содержать только цифры.`);
    } else if (tel.value.length === 0) {
      tel.setCustomValidity(`Поле обязательно для заполнения.`);
    } else {
      tel.setCustomValidity(``);
    }
    tel.reportValidity();
  };

  if (window.util.existsInPage(name) && window.util.existsInPage(tel)) {
    name.addEventListener(`input`, onNameInput);
    tel.addEventListener(`input`, onTelInput);
  }

  const resetForm = () => {
    name.value = ``;
    tel.value = ``;
  };

  const upload = (data) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, () => {
      if (xhr.status === 200) {
        resetForm();
      }
    });

    xhr.open(HttpRequestMethod.POST, URL);
    xhr.send(data);
  };

  const onFormSubmit = (evt) => {
    if (!name.validity.valid || !tel.validity.valid) {
      evt.preventDefault();
    } else {
      upload(new FormData(form));
      evt.preventDefault();
    }
  };

  if (window.util.existsInPage(form)) {
    form.addEventListener(`submit`, onFormSubmit);
  }
})();
