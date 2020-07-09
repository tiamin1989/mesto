export default class FormValidator {
  constructor(options, form) {
    this._options = options;
    this._form = form;
    this._saveButton = this._form.querySelector(this._options.submitButtonSelector);
  }
  _fillError(input, errorElement) {
    errorElement.textContent = input.validationMessage;
    input.classList.add(this._options.inputErrorClass);
    errorElement.classList.add(this._options.errorClass);
  }
  cleanError(input, errorElement) {
    errorElement.textContent = '';
    input.classList.remove(this._options.inputErrorClass);
    errorElement.classList.remove(this._options.errorClass);
  }
  _inputCheck(input) {
    const errorElement = document.querySelector(`#${input.id}-error`);

    !input.checkValidity() ? this._fillError(input, errorElement) :
      this.cleanError(input, errorElement);
  }
  formCheck() {
    const isInvalid = !this._form.checkValidity();

    this._saveButton.disabled = isInvalid;
    this._saveButton.classList.toggle(this._options.inactiveButtonClass, isInvalid);
  }
  enableValidation() {
    const formInputs = Array.from(this._form.querySelectorAll(this._options.inputSelector));

    this._form.addEventListener('input', () => this.formCheck());
    formInputs.forEach(input => {
      input.addEventListener('input', () => this._inputCheck(input));
    });
  }
}
