
import FormValidator from './FormValidator.js';

const validateConfig = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}
/* если делать это в index.js, то надо экспортировать из index.js. как тогда в keyHandler использовать, вся загвоздка в нем
а keyHandler нельзя в index.js, ведь он вызывается из разных файлов...
замкнутый круг */
export const changeProfileValidate = new FormValidator(validateConfig, document.forms.profile);
export const addCardValidate = new FormValidator(validateConfig, document.forms.card);

// Очистка popup
function cleanInputs(popup, validator) {
  popup.querySelectorAll('.popup__input')
    .forEach(input => {
      const errorElement = popup.querySelector(`#${input.id}-error`);
      input.value = '';
      validator.cleanError(input, errorElement);
      validator.formCheck();
    });
}

// Переключатель видимости popup
export function togglePopup(popup, validator) {
  popup.classList.toggle('page_opened');
  if (popup.classList.contains('page_opened'))
    document.addEventListener('keydown', keyHandler);
  else {
    if (validator) cleanInputs(popup, validator);
    document.removeEventListener('keydown', keyHandler);
  }
}

// Слушатель Ecs для popup
export function keyHandler(evt) {
  if (evt.key === 'Escape') {
    const opened = document.querySelector('.page_opened');
    switch (opened.id) {
      /* если убрать, то при Esc не будут чиститься ошибки */
      case 'card': togglePopup(opened, addCardValidate); break;
      case 'profile': togglePopup(opened, changeProfileValidate); break;
      case 'photo-popup': togglePopup(opened);
    }
  }
}
