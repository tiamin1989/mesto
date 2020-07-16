import arhyzImage from '../images/arkhyz.jpg';
import chelyabImage from '../images/chelyabinsk-oblast.jpg';
import ivanovoImage from '../images/ivanovo.jpg';
import kamchatkaImage from '../images/kamchatka.jpg';
import holmImage from '../images/kholmogorsky-rayon.jpg';
import baikalImage from '../images/baikal.jpg';

export const initialCards = [
  {
    first: 'Архыз',
    second: arhyzImage
  },
  {
    first: 'Челябинская область',
    second: chelyabImage
  },
  {
    first: 'Иваново',
    second: ivanovoImage
  },
  {
    first: 'Камчатка',
    second: kamchatkaImage
  },
  {
    first: 'Холмогорский район',
    second: holmImage
  },
  {
    first: 'Байкал',
    second: baikalImage
  }
];

export const profileEdit = document.querySelector('.profile__edit');
export const photoAdd = document.querySelector('.profile__photo-add');

export const validateConfig = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

export const profileElement = {
  name: document.querySelector('#profile #profile-name'),
  activity: document.querySelector('#profile #profile-activity')
};

export const changeAvatar = document.querySelector('.profile__pen');
