const personProfile = document.querySelector('.profile__person');
const cardElement = document.querySelector('#card');
const profileElement = document.querySelector('#profile');
const profileEdit = document.querySelector('.profile__edit');
const profileAdd = document.querySelector('.profile__add');
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
  personProfile.querySelector('.profile__name').textContent = profileElement.querySelector('.popup__name').value;
  personProfile.querySelector('.profile__activity').textContent = profileElement.querySelector('.popup__activity').value;
  profileElement.classList.remove('popup_opened');
}

// Добавление карточек из массива
function addCards(...cards) {
  cards.forEach((object) => {
    const cardTemplate = document.querySelector('#photo').content;
    const card = cardTemplate.cloneNode(true);
    card.querySelector('.photo-grid__photo').setAttribute('src', object.link);
    card.querySelector('.photo-grid__photo').setAttribute('alt', object.name);
    card.querySelector('.photo-grid__title').textContent = object.name;
    document.querySelector('.photo-grid').prepend(card);
  });
}

// Поведение при открытии редактирования персоны
function editProfilePopup() {
  profileElement.querySelector('.popup__name').value = personProfile.querySelector('.profile__name').textContent;
  profileElement.querySelector('.popup__activity').value = personProfile.querySelector('.profile__activity').textContent;
  profileElement.classList.add('popup_opened');
}

// Поведение открытия popup по кнопке редактирования
profileEdit.addEventListener('click', editProfilePopup);

// Поведение открытия popup по кнопке добавления
profileAdd.addEventListener('click', () => {
  cardElement.classList.add('popup_opened');
});

// Закрытие по по крестику
cardElement.querySelector('.popup__close').addEventListener('click', (evt) => {
  evt.preventDefault();
  cardElement.classList.remove('popup_opened');
});

// Закрытие по по крестику
profileElement.querySelector('.popup__close').addEventListener('click', (evt) => {
  evt.preventDefault();
  profileElement.classList.remove('popup_opened');
});

// Создание новой карточки по кнопке Создать
cardElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  addCards({
    name: cardElement.querySelector('.popup__name').value,
    link: cardElement.querySelector('.popup__activity').value
  });
  cardElement.classList.remove('popup_opened');
});

// Редактирование профиля по кнопке Сохранить
profileElement.addEventListener('submit', saveProfile);

addCards(...initialCards);