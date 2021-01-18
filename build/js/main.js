'use strict';

(function () {
  const ESCAPE = `Escape`;
  const body = document.querySelector(`.page-body`);
  const header = body.querySelector(`.page-header`);
  const headerNav = header.querySelector(`.page-header__nav`);
  const menuToggle = headerNav.querySelector(`button`);

  const closeMenuInFlow = () => {
    header.classList.remove(`page-header--nojs`);
    headerNav.classList.remove(`page-header__nav--nojs`);
  };

  closeMenuInFlow();

  const showMenu = () => {
    headerNav.classList.add(`page-header__nav--open`);
    body.classList.add(`page-body--modal-open`);
    headerNav.addEventListener(`keydown`, onEscPress);
    body.addEventListener(`click`, onOverlayClick);
  };

  const hideMenu = () => {
    headerNav.classList.remove(`page-header__nav--open`);
    body.classList.remove(`page-body--modal-open`);
    headerNav.removeEventListener(`keydown`, onEscPress);
    body.removeEventListener(`click`, onOverlayClick);
  };

  const toggleMenu = () => {
    return headerNav.classList.contains(`page-header__nav--open`) ? hideMenu() : showMenu();
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

  menuToggle.addEventListener(`click`, onMenuTogglePress);

  window.main = {
    body,
    ESCAPE
  };
})();

(function () {
  const URL = `https://echo.htmlacademy.ru`;
  const HttpRequestMethod = {
    POST: `POST`
  };
  const main = window.main.body.querySelector(`main`);
  const form = main.querySelector(`.feedback__form`);
  const name = form.querySelector(`#input-name`);
  const tel = form.querySelector(`#input-tel`);

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

  name.addEventListener(`input`, onNameInput);
  tel.addEventListener(`input`, onTelInput);

  const resetForm = () => {
    name.value = ``;
    tel.value = ``;
  };

  const showMessage = (message) => {
    const loadingResult = document.createElement(`div`);
    loadingResult.classList.add(`loading-message`);
    loadingResult.style = `z-index: 1;`;
    loadingResult.style.position = `fixed`;
    loadingResult.style.top = `50%`;
    loadingResult.style.left = `50%`;
    loadingResult.style.transform = `translate(-50%, -50%)`;
    loadingResult.style.width = `fit-content`;
    loadingResult.style.padding = `20px 40px`;
    loadingResult.style.fontSize = `18px`;
    loadingResult.style.color = `#1f1f1f`;
    loadingResult.style.textAlign = `center`;
    loadingResult.textContent = message;
    loadingResult.style.backgroundColor = `white`;
    loadingResult.style.border = `2px solid #0ad9c6`;
    loadingResult.style.borderRadius = `10px`;
    main.insertAdjacentElement(`afterbegin`, loadingResult);

    window.main.body.classList.add(`page-body--modal-open`);

    loadingResult.addEventListener(`click`, onMessageClick);
    document.addEventListener(`keydown`, onEscapePress);
    document.addEventListener(`click`, onOverlayClick);
  };

  const hideMessage = () => {
    main.querySelector(`div.loading-message`).remove();
    window.main.body.classList.remove(`page-body--modal-open`);
    document.removeEventListener(`keydown`, onEscapePress);
    document.removeEventListener(`click`, onOverlayClick);
  };

  const onFormSuccess = () => {
    resetForm();
    showMessage(`Данные успешно отправлены`);
  };

  const onFormError = () => {
    showMessage(`Ошибка отправки данных`);
  };

  const onMessageClick = (evt) => {
    evt.preventDefault();
    hideMessage();
  };

  const onEscapePress = (evt) => {
    if (evt.key === window.main.ESCAPE) {
      evt.preventDefault();
      hideMessage();
    }
  };

  const onOverlayClick = (evt) => {
    if (evt.target !== main.querySelector(`.loading-message`)) {
      evt.preventDefault();
      hideMessage();
    }
  };

  const upload = (data, onSuccess, onError) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, () => {
      if (xhr.status === 200) {
        onSuccess();
        return;
      }
      onError();
    });

    xhr.addEventListener(`error`, () => {
      onError();
    });

    xhr.open(HttpRequestMethod.POST, URL);
    xhr.send(data);
  };

  const onFormSubmit = (evt) => {
    if (!name.validity.valid || !tel.validity.valid) {
      evt.preventDefault();
    } else {
      upload(new FormData(form), onFormSuccess, onFormError);
      evt.preventDefault();
    }
  };

  form.addEventListener(`submit`, onFormSubmit);
})();
