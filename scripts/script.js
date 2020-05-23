const personProfile = document.querySelector('.profile__person');
const popupElement = document.querySelector('.popup');
const personName = document.querySelector('.popup__name');
const personActivity = document.querySelector('.popup__activity');
const closePopup = document.querySelector('.popup__close');
const profileEdit = document.querySelector('.profile__edit');
const popupForm = document.querySelector('.popup__container');
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
function formSubmitHandler(evt) {
  evt.preventDefault();
  personProfile.querySelector('.profile__name').textContent = personName.value;
  personProfile.querySelector('.profile__activity').textContent = personActivity.value;
  popupElement.classList.remove('popup_opened');
}

// Поведение при открытии редактирования персоны и закрытии popup
function popupShow() {
  personName.value = personProfile.querySelector('.profile__name').textContent;
  personActivity.value = personProfile.querySelector('.profile__activity').textContent;
  popupElement.classList.add('popup_opened');
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

// Поведение закрытия по кнопке для popup
closePopup.addEventListener('click', () => {
  popupElement.classList.remove('popup_opened');
});

// Поведение открытия popup по кнопке редактирования
profileEdit.addEventListener('click', popupShow);

// Поведение при нажатии Сохранить для popup
popupForm.addEventListener('submit', formSubmitHandler);

addCards(...initialCards);