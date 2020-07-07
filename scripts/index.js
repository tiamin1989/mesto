import Card from './Card.js';
import Section from './Section.js';
import { changeProfileValidate, addCardValidate } from './utils.js';
import initialCards from './initialCards.js';
import { togglePopup } from './utils.js';

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

// Сохранение персоны
function saveProfile(evt) {
  evt.preventDefault();
  personProfile.name.textContent = profileElement.name.value;
  personProfile.activity.textContent = profileElement.activity.value;
  togglePopup(profileElement.block, changeProfileValidate);
  changeProfileValidate.formCheck();
}

// Сохранение карточки
function saveCard(evt) {
  evt.preventDefault();
  const cardItem = new Section({
    items: [{
      name: cardElement.name.value,
      link: cardElement.activity.value
    }],
    renderer: function (item) {
      const card = new Card(item, '#photo', photoPopup.block);
      this.addItem(card.generateCard());
    }
  }, '.photo-grid');
  cardItem.renderItems();
  togglePopup(cardElement.block, addCardValidate);
  addCardValidate.formCheck();
}

function addCards(...cards) {
  cards.forEach((object) => {
    const card = new Card(object, '#photo', photoPopup.block);
    photoGrid.prepend(card.generateCard());
  });
}

// Слушатель кнопки открытия редактирования профиля
profileEdit.addEventListener('click', evt => {
  profileElement.name.value = personProfile.name.textContent;
  profileElement.activity.value = personProfile.activity.textContent;
  togglePopup(profileElement.block, changeProfileValidate);
});

// Слушатель кнопки открытия добавления карточки
photoAdd.addEventListener('click', evt => {
  togglePopup(cardElement.block, addCardValidate);
});

// Submit карточки
cardElement.form.addEventListener('submit', saveCard);
// Submit персоны
profileElement.form.addEventListener('submit', saveProfile);

// Слушатели клика по крестику и popup
cardElement.block.addEventListener('mousedown', evt => {
  if (evt.target.classList.contains('page__close') || evt.target.classList.contains('popup'))
    togglePopup(cardElement.block, addCardValidate);
});

profileElement.block.addEventListener('mousedown', evt => {
  if (evt.target.classList.contains('page__close') || evt.target.classList.contains('popup'))
    togglePopup(profileElement.block, changeProfileValidate);
});

photoPopup.block.addEventListener('mousedown', evt => {
  if (evt.target.classList.contains('page__close') || evt.target.classList.contains('popup'))
    togglePopup(photoPopup.block);
});

// Отрисовка начальных карточек
const carditems = new Section({
  items: initialCards,
  renderer: function (item) {
    const card = new Card(item, '#photo', photoPopup.block);
    this.addItem(card.generateCard());
  }
}, '.photo-grid');
carditems.renderItems();

changeProfileValidate.enableValidation();
addCardValidate.enableValidation();
