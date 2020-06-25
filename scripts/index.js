import Card from './Card.js';
import FormValidator from './FormValidator.js';
import initialCards from './initialCards.js';

const validateConfig = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

const photoGrid = document.querySelector('.photo-grid');

// Слушатель keydown для popup
export function keyHandler(evt) {
  if (evt.key === 'Escape') {
    const opened = document.querySelector('.page_opened');
    opened.classList.toggle('page_opened');
    document.removeEventListener('keydown', keyHandler);
  }
}

function addCards(...cards) {
  cards.forEach((object) => {
    const card = new Card(object, '#photo', document.querySelector('#photo-popup'));
    photoGrid.prepend(card.generateCard());
  });
}

class Popup {
  constructor(templateSelector) {
    this._popup = document.querySelector(templateSelector);
    this._form = this._popup.querySelector('.popup__container');
  }
  _enableValidation() {
    this._validator = new FormValidator(validateConfig, this._form);
    this._validator.enableValidation();
  }
  _setEventListeners() {
    this._popup.querySelector('.page__close')
      .addEventListener('click', evt => {
        if (evt.target.classList.contains('page__close')) {
          this.togglePopup();
          this._cleanPopup();
        }
      });
    this._popup.addEventListener('mousedown', evt => {
      if (evt.target.classList.contains('popup')) {
        this.togglePopup();
        this._cleanPopup();
      }
    });
  }
  _togglePopup() {
    this._popup.classList.toggle('page_opened');
    document.addEventListener('keydown', keyHandler);
  }
  _cleanPopup() {
    this._popup.querySelectorAll('.popup__input')
      .forEach(input => {
        const errorElement = this._popup.querySelector(`#${input.id}-error`);
        this._validator.cleanError(input, errorElement);
        input.value = '';
      });
  }
}

class ProfilePopup extends Popup {
  constructor(templateSelector) {
    super(templateSelector);
  }
  _setEventListener() {
    this._form.addEventListener('submit', evt => {
      evt.preventDefault();
      this._saveData();
      super._togglePopup();
      super._cleanPopup();
    });
  }
  _saveData() {
    document.querySelector('.profile__name')
      .textContent = this._popup.querySelector('#profile-name').value;
    document.querySelector('.profile__activity')
      .textContent = this._popup.querySelector('#profile-activity').value;
  }
  togglePopup() {
    this._popup.querySelector('#profile-name')
      .value = document.querySelector('.profile__name').textContent;
    this._popup.querySelector('#profile-activity')
      .value = document.querySelector('.profile__activity').textContent;
    super._togglePopup();
  }
  enablePopup() {
    super._enableValidation();
    this._setEventListener();
    super._setEventListeners();
  }
}

class CardPopup extends Popup {
  constructor(templateSelector) {
    super(templateSelector);
  }
  _setEventListener() {
    this._form.addEventListener('submit', evt => {
      evt.preventDefault();
      addCards({
        name: this._form.querySelector('#card-name').value,
        link: this._form.querySelector('#card-link').value
      });
      super._togglePopup();
      super._cleanPopup();
    });
  }
  togglePopup() {
    super._togglePopup();
  }
  enablePopup() {
    super._enableValidation();
    this._setEventListener();
    super._setEventListeners();
  }
}

class PhotoPopup extends Popup {
  constructor(templateSelector) {
    super(templateSelector);
  }
  togglePopup() {
    super._togglePopup();
  }
  enablePopup() {
    super._setEventListeners();
  }
}

const profilePopup = new ProfilePopup('#profile');
profilePopup.enablePopup();

const cardPopup = new CardPopup('#card');
cardPopup.enablePopup();

const photoPopup = new PhotoPopup('#photo-popup');
photoPopup.enablePopup();

document.querySelector('.profile__edit').addEventListener('click', () => profilePopup.togglePopup());
document.querySelector('.profile__photo-add').addEventListener('click', () => cardPopup.togglePopup());

addCards(...initialCards);
