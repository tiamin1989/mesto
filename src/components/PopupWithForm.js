import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submit, validator) {
    super(popupSelector);
    this._submit = submit;
    this._validator = validator;
  }
  close() {
    super.close();
    this._popup.querySelectorAll('.popup__input')
      .forEach(input => {
        const errorElement = this._popup.querySelector(`#${input.id}-error`);
        input.value = '';
        this._validator.cleanError(input, errorElement);
      });
    this._validator.formCheck();
  }
  _getInputValues() {
    const values = {};
    this._popup.querySelectorAll('.popup__input')
      .forEach(input => {
        values[input.name] = input.value;
      });
    return values;
  }
  setEventListeners() {
    this._popup.addEventListener('submit', evt => this._submit(evt, this._getInputValues()));
    super.setEventListeners();
  }
}
