import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }
  open(second, first) {
    this._popup.querySelector('.popup__image').setAttribute('src', second);
    this._popup.querySelector('.popup__image').setAttribute('alt', first);
    this._popup.querySelector('.popup__caption').textContent = first;
    super.open();
  }
}
