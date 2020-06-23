import Card from './Card.js';
import FormValidator from './FormValidator.js';
import initialCards from './cards.js';

const profileEdit = document.querySelector('.profile__edit');
const photoAdd = document.querySelector('.profile__photo-add');
const photoGrid = document.querySelector('.photo-grid');

const personProfile = {
  name: document.querySelector('.profile__name'),
  activity: document.querySelector('.profile__activity')
}

const cardElement = {
  form: document.forms.card,
  block: document.querySelector('#card'),
  name: document.querySelector('#card #card-name'),
  activity: document.querySelector('#card #card-link')
}

const profileElement = {
  form: document.forms.profile,
  block: document.querySelector('#profile'),
  name: document.querySelector('#profile #profile-name'),
  activity: document.querySelector('#profile #profile-activity')
}

const photoPopup = {
  block: document.querySelector('#photo-popup'),
  image: document.querySelector('.popup__image'),
  caption: document.querySelector('.popup__caption')
}

// Все popup
const popups = document.querySelectorAll('.popup');

const changeProfileValidate = new FormValidator({
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}, profileElement.form);

const addCardValidate = new FormValidator({
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}, cardElement.form);

// Очистка popup
function cleanInputErrors(popup) {
  const inputs = popup.querySelectorAll('.popup__input');
  inputs.forEach(input => {
    input.value = '';
    input.classList.remove('popup__input_type_error');
    const errorElement = popup.querySelector(`#${input.id}-error`);
    errorElement.value = '';
    errorElement.classList.remove('popup__error_visible');
  });
}

// Переключатель видимости popup
function togglePopup(block) {
  block.classList.toggle('page_opened');
  if (block.classList.contains('page_opened')) document.addEventListener('keydown', keyHandler);
  else document.removeEventListener('keydown', keyHandler);
}

// Сохранение персоны
function saveProfile(evt) {
  evt.preventDefault();
  personProfile.name.textContent = profileElement.name.value;
  personProfile.activity.textContent = profileElement.activity.value;
  togglePopup(profileElement.block);
  cleanInputErrors(profileElement.block);
}

// Сохранение карточки
function saveCard(evt) {
  evt.preventDefault();
  addCards({
    name: cardElement.name.value,
    link: cardElement.activity.value
  });
  togglePopup(cardElement.block);
  cleanInputErrors(cardElement.block);
}

// Слушатель keydown для popup
export function keyHandler(evt) {
  if (evt.key === 'Escape') {
    const opened = document.querySelector('.page_opened');
    if (opened) {
      togglePopup(opened);
      cleanInputErrors(opened);
    };
  }
}

function addCards(...cards) {
  cards.forEach((object) => {
    const card = new Card(object, '#photo');
    photoGrid.prepend(card.generateCard());
  });
}

// Слушатель кнопки открытия редактирования профиля
profileEdit.addEventListener('click', evt => {
  if (evt.target.classList.contains('profile__edit')) {
    profileElement.name.value = personProfile.name.textContent;
    profileElement.activity.value = personProfile.activity.textContent;
    togglePopup(profileElement.block);
  }
});

// Слушатель кнопки открытия добавления карточки
photoAdd.addEventListener('click', evt => {
  togglePopup(cardElement.block);
});

// Submit карточки
cardElement.form.addEventListener('submit', saveCard);
// Submit персоны
profileElement.form.addEventListener('submit', saveProfile);

// Вешаем listeners на popup
popups.forEach(popup => {
  popup.addEventListener('mousedown', evt => {
    if (evt.target.classList.contains('page__close') || evt.target.classList.contains('popup')) {
      togglePopup(evt.target.closest('.popup'));
      cleanInputErrors(evt.target.closest('.popup'));
    }
  });
});

addCards(...initialCards);
changeProfileValidate.enableValidation();
addCardValidate.enableValidation();
