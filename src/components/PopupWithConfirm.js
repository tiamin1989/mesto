import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, submit) {
    super(popupSelector);
    this._submit = submit;
  }
  confirm(instance) {
    this.instance = instance;
    this._popup.addEventListener('submit', evt => this._submit(evt, this.instance));
    super.open();
  }
}
