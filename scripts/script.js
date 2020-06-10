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

// Очистка popup
function cleanPopup(popup) {
  const inputs = popup.querySelectorAll('.popup__input');
  inputs.forEach(input => {
    input.value = '';
    input.classList.remove('popup__input_type_error');
    const errorElement = popup.querySelector(`#${input.id}-error`);
    errorElement.value = '';
    errorElement.classList.remove('popup__error_visible');
  });
  document.removeEventListener('keydown', keyHandler);
}

// Переключатель видимости popup
function togglePopup(block) {
  block.classList.toggle('page_opened');
}

// Открытие popup
function openPopup(block) {
  togglePopup(block);
  document.addEventListener('keydown', keyHandler);
}

// Сохранение персоны
function saveProfile(evt) {
  evt.preventDefault();
  personProfile.name.textContent = profileElement.name.value;
  personProfile.activity.textContent = profileElement.activity.value;
  togglePopup(profileElement.block);
  cleanPopup(profileElement.block);
}

// Сохранение карточки
function saveCard(evt) {
  evt.preventDefault();
  addCards({
    name: cardElement.name.value,
    link: cardElement.activity.value
  });
  togglePopup(cardElement.block);
  cleanPopup(cardElement.block);
}

// Удаление карточки по кнопке
function deleteCard(evt) {
  evt.target.closest('.photo-grid__item').remove();
}

// Слушатель keydown для popup
function keyHandler(evt) {
  if (evt.key === 'Escape') {
    const opened = document.querySelector('.page_opened');
    if (opened) {
      togglePopup(opened);
      cleanPopup(opened);
    };
  }
}

// Показываем фото по клике на картинку
function showPhoto(evt) {
  photoPopup.image.setAttribute('src', evt.target.getAttribute('src'));
  photoPopup.image.setAttribute('alt', evt.target.getAttribute('alt'));
  photoPopup.caption.textContent = evt.target.getAttribute('alt');
  togglePopup(photoPopup.block);
  document.addEventListener('keydown', keyHandler);
}

// Лайкаем карточку (или дизлайкаем)
function likeCard(evt) {
  evt.target.classList.toggle('photo-grid__heart_liked');
}

// Добавление карточек из массива и навешивание обработчиков
function addCards(...cards) {
  cards.forEach((object) => {
    const cardTemplate = document.querySelector('#photo').content;
    const card = cardTemplate.cloneNode(true);
    card.querySelector('.photo-grid__delete').addEventListener('click', deleteCard);
    card.querySelector('.photo-grid__photo').setAttribute('src', object.link);
    card.querySelector('.photo-grid__photo').setAttribute('alt', object.name);
    card.querySelector('.photo-grid__photo').addEventListener('click', showPhoto);
    card.querySelector('.photo-grid__title').textContent = object.name;
    card.querySelector('.photo-grid__heart').addEventListener('click', likeCard);
    photoGrid.prepend(card);
  });
}

// Слушатель кнопки открытия редактирования профиля
profileEdit.addEventListener('click', evt => {
  if (evt.target.classList.contains('profile__edit')) {
    profileElement.name.value = personProfile.name.textContent;
    profileElement.activity.value = personProfile.activity.textContent;
    openPopup(profileElement.block);
  }
});

// Слушатель кнопки открытия добавления карточки
photoAdd.addEventListener('click', evt => {
  openPopup(cardElement.block);
});

// Submit карточки
cardElement.form.addEventListener('submit', saveCard);
// Submit персоны
profileElement.form.addEventListener('submit', saveProfile);

// Вешаем listeners на popup
popups.forEach(popup => {
  popup.addEventListener('click', evt => {
    if (evt.target.classList.contains('page__close') || evt.target.classList.contains('popup')) {
      togglePopup(evt.target.closest('.popup'));
      cleanPopup(evt.target.closest('.popup'));
    }
  });
});

addCards(...initialCards);
