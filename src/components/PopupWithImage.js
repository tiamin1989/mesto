import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }
  open(link, name) {
    const image = this._popup.querySelector('.popup__image');
    image.setAttribute('src', link);
    image.setAttribute('alt', name);
    this._popup.querySelector('.popup__caption').textContent = name;
    super.open();
  }
}
