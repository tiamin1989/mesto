const titles = document.querySelectorAll('.photo-grid__title');
const personProfile = document.querySelector('.profile__person');
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
  document.querySelector('.popup').style = 'display: none;';
}

// Поведение при открытии редактирования персоны и закрытии popup
function popupLoad() {
  if (document.querySelector('.popup').style.display === 'none' ||
      !document.querySelector('.popup').hasAttribute('style')) {
    // Загрузим имя и деятельность персоны в popup
    personName.value = personProfile.querySelector('.profile__name').textContent;
    personActivity.value = personProfile.querySelector('.profile__activity').textContent;
    document.querySelector('.popup').style.display = 'block';
  } else document.querySelector('.popup').style.display = 'none';
}

// Добавим поведение закрытия по кнопке для popup
closePopup.addEventListener('click', popupLoad);

// Добавим поведение открытия popup по кнопке редактирования
profileEdit.addEventListener('click', popupLoad);

// Поведение при нажатии Сохранить для popup
popupForm.addEventListener('submit', formSubmitHandler);
