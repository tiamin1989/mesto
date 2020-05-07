const titles = document.querySelectorAll('.photo-grid__title');

const personProfile = document.querySelector('.profile__person');
const personName = document.querySelector('.popup__name');
const personActivity = document.querySelector('.popup__activity');

// Загрузим имя и деятельность персоны в popup
personName.value = personProfile.querySelector('.profile__name').textContent;
personActivity.value = personProfile.querySelector('.profile__activity').textContent;

// Добавим поведение закрытия по кнопке для popup
const closePopup = document.querySelector('.popup__close');
closePopup.addEventListener('click', function () {
  document.querySelector('.popup').style = 'display: none;'
});

// Добавим поведение открытия popup по кнопке редактирования
const profileEdit = document.querySelector('.profile__edit');
profileEdit.addEventListener('click', function () {
  document.querySelector('.popup').style = 'display: block;';
});

// Укоротим длинные заголовки
for (let i = 0; i < titles.length; i++) {
  if (titles[i].textContent.length > 12) {
    titles[i].textContent = titles[i].textContent.substring(0, 11) + '...';
  }
}

const formElement = document.querySelector('.popup__container');

function formSubmitHandler(evt) {
  evt.preventDefault();
  personProfile.querySelector('.profile__name').textContent = personName.value;
  personProfile.querySelector('.profile__activity').textContent = personActivity.value;
  document.querySelector('.popup').style = 'display: none;';
}

formElement.addEventListener('submit', formSubmitHandler);
