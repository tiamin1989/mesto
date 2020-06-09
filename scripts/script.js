const profileEdit = document.querySelector('.profile__edit');
const profileAdd = document.querySelector('.profile__add');
const photoGrid = document.querySelector('.photo-grid');

const personProfile = {
  name: document.querySelector('.profile__name'),
  activity: document.querySelector('.profile__activity')
}

const cardElement = {
  form: document.forms.card,
  block: document.querySelector('#card'),
  name: document.querySelectorAll('#card .popup__input')[0],
  activity: document.querySelectorAll('#card .popup__input')[1],
  close: document.querySelector('#card .popup__close')
}

const profileElement = {
  form: document.forms.profile,
  block: document.querySelector('#profile'),
  name: document.querySelectorAll('#profile .popup__input')[0],
  activity: document.querySelectorAll('#profile .popup__input')[1],
  close: document.querySelector('#profile .popup__close')
}

const photoPopup = {
  block: document.querySelector('.photo-popup'),
  image: document.querySelector('.photo-popup__image'),
  caption: document.querySelector('.photo-popup__caption'),
  close: document.querySelector('.photo-popup__close')
}

const popups = Array.from(document.querySelectorAll('.popup'));

// Закрытие popup
function cleanPopup(popup) {
  popup.classList.remove('popup_opened');
  popup.querySelectorAll('.popup__input').forEach(input => {
    input.value = '';
    input.classList.remove('popup__input_type_error');
    const errorElement = popup.querySelector(`#${input.id}-error`);
    errorElement.value = '';
    errorElement.classList.remove('popup__error_visible');
  });
  document.removeEventListener('keydown', keyHandler);
}

// Закрытие фото
function closePhoto(evt) {
  evt.target.classList.remove('photo-popup_opened');
}

// Сохранение данных по кнопке Сохранить
function saveProfile(evt) {
  evt.preventDefault();
  if (profileElement.form.checkValidity()) {
    personProfile.name.textContent = profileElement.name.value;
    personProfile.activity.textContent = profileElement.activity.value;
    cleanPopup(profileElement.block);
  }
}

// Добавление карточек из массива и навешивание обработчиков
function addCards(...cards) {
  cards.forEach((object) => {
    const cardTemplate = document.querySelector('#photo').content;
    const card = cardTemplate.cloneNode(true);
    card.querySelector('.photo-grid__delete').addEventListener('click', evt => evt.target.closest('.photo-grid__item').remove());
    card.querySelector('.photo-grid__photo').setAttribute('src', object.link);
    card.querySelector('.photo-grid__photo').setAttribute('alt', object.name);
    card.querySelector('.photo-grid__photo').addEventListener('click', evt => {
      photoPopup.image.setAttribute('src', evt.target.getAttribute('src'));
      photoPopup.image.setAttribute('alt', evt.target.getAttribute('alt'));
      photoPopup.caption.textContent = evt.target.getAttribute('alt');
      photoPopup.block.classList.add('photo-popup_opened');
    });
    card.querySelector('.photo-grid__title').textContent = object.name;
    card.querySelector('.photo-grid__heart').addEventListener('click', evt => evt.target.classList.toggle('photo-grid__heart_liked'));
    photoGrid.prepend(card);
  });
}

// Слушатель keydown дл форм
function keyHandler(evt, element) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    if (popup) cleanPopup(popup);
  }
}

// Поведение при открытии редактирования персоны
function editProfilePopup() {
  profileElement.name.value = personProfile.name.textContent;
  profileElement.activity.value = personProfile.activity.textContent;
  profileElement.block.classList.add('popup_opened');
  document.addEventListener('keydown', keyHandler);
}

// Поведение открытия popup по кнопке добавления
function newCardPopup() {
  cardElement.name.value = '';
  cardElement.activity.value = '';
  cardElement.block.classList.add('popup_opened');
  document.addEventListener('keydown', keyHandler);
}

profileEdit.addEventListener('click', editProfilePopup);
profileAdd.addEventListener('click', newCardPopup);

// Закрытие по крестику добавления карточки
cardElement.close.addEventListener('click', evt => {
  evt.preventDefault();
  if (evt.target.classList.contains('popup__close')) cleanPopup(cardElement.block);
});

// Закрытие по крестику редактировани профиля
profileElement.close.addEventListener('click', evt => {
  evt.preventDefault();
  if (evt.target.classList.contains('popup__close')) cleanPopup(profileElement.block);
});

// Закрытие popup по внешней области
popups.forEach(popup => popup.addEventListener('click', evt => {
  if (evt.target.classList.contains('popup')) cleanPopup(popup);
}));

// Закрытие фотографии
photoPopup.close.addEventListener('click', evt => photoPopup.block.classList.remove('photo-popup_opened'));
photoPopup.block.addEventListener('click', closePhoto);

// Создание новой карточки по кнопке Создать
cardElement.form.addEventListener('submit', evt => {
  evt.preventDefault();
  if (cardElement.form.checkValidity()) {
    addCards({
      name: cardElement.name.value,
      link: cardElement.activity.value
    });
    cleanPopup(cardElement.block);
  }
});

// Редактирование профиля по кнопке Сохранить
profileElement.form.addEventListener('submit', saveProfile);

addCards(...initialCards);
