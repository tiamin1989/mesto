const profileEdit = document.querySelector('.profile__edit');
const profileAdd = document.querySelector('.profile__add');
const photoGrid = document.querySelector('.photo-grid');

const personProfile = { 
  name: document.querySelector('.profile__name'),
  activity: document.querySelector('.profile__activity')
}

const cardElement = {
  block: document.querySelector('#card'),
  name: document.querySelector('#card .popup__name'),
  activity: document.querySelector('#card .popup__activity'),
  close: document.querySelector('#card .popup__close')
}

const profileElement = {
  block: document.querySelector('#profile'),
  name: document.querySelector('#profile .popup__name'),
  activity: document.querySelector('#profile .popup__activity'),
  close: document.querySelector('#profile .popup__close')
}

const photoPopup = {
  block: document.querySelector('.photo-popup'),
  image: document.querySelector('.photo-popup__image'),
  caption: document.querySelector('.photo-popup__caption'),
  close: document.querySelector('.photo-popup__close')
}

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Сохранение данных по кнопке Сохранить
function saveProfile(evt) {
  evt.preventDefault();
  personProfile.name.textContent = profileElement.name.value;
  personProfile.activity.textContent = profileElement.activity.value;
  profileElement.block.classList.remove('popup_opened');
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

// Поведение при открытии редактирования персоны
function editProfilePopup() {
  profileElement.name.value = personProfile.name.textContent;
  profileElement.activity.value = personProfile.activity.textContent;
  profileElement.block.classList.add('popup_opened');
}

// Поведение открытия popup по кнопке добавления (******button type="reset" не работает******)
function newCardPopup() {
  cardElement.name.value = '';
  cardElement.activity.value = '';
  cardElement.block.classList.add('popup_opened');
}

profileEdit.addEventListener('click', editProfilePopup);
profileAdd.addEventListener('click', newCardPopup);

// Закрытие по по крестику добавления карточки
cardElement.close.addEventListener('click', evt => {
  evt.preventDefault();
  cardElement.block.classList.remove('popup_opened');
});

// Закрытие по по крестику редактировани профиля
profileElement.close.addEventListener('click', evt => {
  evt.preventDefault();
  profileElement.block.classList.remove('popup_opened');
});

// Закрытие по по крестику фотографии
photoPopup.close.addEventListener('click', evt => photoPopup.block.classList.remove('photo-popup_opened'));

// Создание новой карточки по кнопке Создать
cardElement.block.addEventListener('submit', evt => {
  evt.preventDefault();
  addCards({
    name: cardElement.name.value,
    link: cardElement.activity.value
  });
  cardElement.block.classList.remove('popup_opened');
});

// Редактирование профиля по кнопке Сохранить
profileElement.block.addEventListener('submit', saveProfile);

addCards(...initialCards);