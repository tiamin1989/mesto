import Popup from './Popup.js';
import { api } from '../pages/index.js'

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector/* , submit */) {
    super(popupSelector);
    /* this._submit = submit; */
  }
  confirmDel(card) {/* это неправильно, но не получается просто сабмит добавлять */
    this._popup.addEventListener('submit', evt => {
      evt.preventDefault();
      api.deleteCardData(card._id)
        .then(() => {
          card.deleteCard();
          super.close();
        })
    });
    super.open();
  }
}
