const personProfile = document.querySelector('.profile__person');
const popupElement = document.querySelector('.popup');
const personName = document.querySelector('.popup__name');
const personActivity = document.querySelector('.popup__activity');
const closePopup = document.querySelector('.popup__close');
const profileEdit = document.querySelector('.profile__edit');
const popupForm = document.querySelector('.popup__container');

// Сохранение данных по кнопке Сохранить
function formSubmitHandler(evt) {
  evt.preventDefault();
  personProfile.querySelector('.profile__name').textContent = personName.value;
  personProfile.querySelector('.profile__activity').textContent = personActivity.value;
  popupElement.classList.remove('popup_opened');
}

// Поведение при открытии редактирования персоны и закрытии popup
function popupLoad() {
  personName.value = personProfile.querySelector('.profile__name').textContent;
  personActivity.value = personProfile.querySelector('.profile__activity').textContent;
  popupElement.classList.add('popup_opened');
}

// Добавим поведение закрытия по кнопке для popup
closePopup.addEventListener('click', () => {
  popupElement.classList.remove('popup_opened');
});

// Добавим поведение открытия popup по кнопке редактирования
profileEdit.addEventListener('click', popupLoad);

// Поведение при нажатии Сохранить для popup
popupForm.addEventListener('submit', formSubmitHandler);
