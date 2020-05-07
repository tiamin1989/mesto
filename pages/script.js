let titles = document.querySelectorAll('.photo-grid__title');

let personProfile = document.querySelector('.profile__person');
let personName = document.querySelector('.popup__name');
let personActivity = document.querySelector('.popup__activity');

// Загрузим имя и деятельность персоны в popup
personName.value = personProfile.querySelector('.profile__name').textContent;
personActivity.value = personProfile.querySelector('.profile__activity').textContent;

// Добавим поведение закрытия по кнопке для popup
let closePopup = document.querySelector('.popup__close');
closePopup.addEventListener('click', function () {
  document.querySelector('.popup').style = 'display: none;'
});

// Добавим поведение открытия popup по кнопке редактирования
let profileEdit = document.querySelector('.profile__edit');
profileEdit.addEventListener('click', function () {
  document.querySelector('.popup').style = 'display: block;';
});

// Укоротим длинные заголовки
for (let i = 0; i < titles.length; i++) {
  if (titles[i].textContent.length > 12) {
    titles[i].textContent = titles[i].textContent.substring(0, 11) + '...';
  }
}

let formElement = document.querySelector('.popup__container');

function formSubmitHandler(evt) {
  evt.preventDefault();
  personProfile.querySelector('.profile__name').textContent = personName.value;
  personProfile.querySelector('.profile__activity').textContent = personActivity.value;
  document.querySelector('.popup').style = 'display: none;';
}

formElement.addEventListener('submit', formSubmitHandler);
