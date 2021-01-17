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
    body.classList.add(`page-body--menu-open`);
    headerNav.addEventListener(`keydown`, onEscPress);
    body.addEventListener(`click`, onOverlayClick);
  };

  const hideMenu = () => {
    headerNav.classList.remove(`page-header__nav--open`);
    body.classList.remove(`page-body--menu-open`);
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
    body
  };
})();

(function () {
  const form = window.main.body.querySelector(`.feedback__form`);
  const name = form.querySelector(`#input-name`);
  const tel = form.querySelector(`#input-tel`);

  const onNameInput = () => {
    if (name.value === ``) {
      name.setCustomValidity(`Поле обязательно для заполнения.`)
    } else {
      name.setCustomValidity(``);
    }
    name.reportValidity();
  };

  name.addEventListener(`input`, onNameInput);

  const onTelInput = () => {
    const re = /^[^a-zA-Z]\d*$/g;
    if (tel.value.length !== 0 && !re.test(tel.value)) {
      tel.setCustomValidity(`Номер телефона должен содержать только цифры.`)
    } else if (tel.value.length === 0) {
      tel.setCustomValidity(`Поле обязательно для заполнения.`)
    } else {
      tel.setCustomValidity(``);
    }
    tel.reportValidity();
  };

  tel.addEventListener(`input`, onTelInput);

  // const resetForm = () => {
  //   name.value = ``;
  //   tel.value = ``;
  // };

  const onFormSubmit = (evt) => {
    if (!name.validity.valid || !tel.validity.valid) {
      evt.preventDefault();
    }
    // } else {
      // upload(new FormData(form), onSuccess, onError);
      // evt.preventDefault();
    // }
  }
  //
  // const showMessage = (message) => {
  //   const loadingResult = document.createElement(`div`);
  //   loadingResult.style = `z-index: 1;`;
  //   loadingResult.style.position = `absolute`;
  //   loadingResult.style.top = `50%`;
  //   loadingResult.style.left = `50%`;
  //   loadingResult.style.transform = `translate(-50%, -50%)`;
  //   loadingResult.style.width = `max-content`;
  //   loadingResult.style.padding = `20px 40px`;
  //   loadingResult.style.fontSize = `18px`;
  //   loadingResult.style.color = `#1f1f1f`;
  //   loadingResult.style.textTransform = `none`;
  //   loadingResult.textContent = message;
  //   loadingResult.style.backgroundColor = `white`;
  //   loadingResult.style.border = `2px solid #0ad9c6`;
  //   loadingResult.style.borderRadius = `10px`;
  //   document.body.insertAdjacentElement(`afterbegin`, loadingResult);
  //
  //   loadingResult.addEventListener(`click`, onMessageClick);
  // };

  // const hideMessage = () => {
  //   console.log(`hide`);
  //   window.main.body.querySelector(`main`).removeChild(`div.first-child`);
  // };

  // const onMessageClick = () => {
  //   hideMessage();
  // };

  // const onSuccess = () => {
  //   resetForm();
  //   showMessage(`Данные успешно отправлены`);
  // };
  //
  // const onError = () => {
  //   showMessage(`Ошибка отправки данных`);
  // };
  //
  // const upload = (data, onSuccess, onError) => {
  //   const xhr = new XMLHttpRequest();
  //   xhr.responseType = `json`;
  //
  //   xhr.addEventListener(`load`, () => {
  //     if (xhr.status === 200) {
  //       onSuccess();
  //       return;
  //     }
  //     onError();
  //   });
  //
  //   xhr.addEventListener(`error`, () => {
  //     onError();
  //   });
  //
  //   xhr.open(`POST`, `https://echo.htmlacademy.ru`);
  //   xhr.send(data);
  // };

  form.addEventListener(`submit`, onFormSubmit);
})();
