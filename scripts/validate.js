const popups = Array.from(document.querySelectorAll('.popup'));

function closePopup(evt) {
  if (evt.target.classList.contains('popup')) {
    evt.target.classList.remove('popup_opened');
    evt.target.querySelectorAll('.popup__input').forEach(input => {
      input.value = '';
      input.classList.remove('popup__input_type_error');
      const errorElement = evt.target.querySelector(`#${input.id}-error`);
      errorElement.value = '';
      errorElement.classList.remove('popup__error_visible');
    });
  }
}

function inputCheck(event, inputErrorClass, errorClass) {
  const input = event.target;
  const errorElement = document.querySelector(`#${input.id}-error`);

  if (!input.checkValidity()) {
    errorElement.textContent = input.validationMessage;
    input.classList.add(inputErrorClass);
    errorElement.classList.add(errorClass);
  } else {
    errorElement.textContent = '';
    input.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
  }
}

function formCheck(form, saveButton, inactiveButtonClass) {
  const isValid = !form.checkValidity();

  saveButton.disabled = isValid;
  saveButton.classList.toggle(inactiveButtonClass, isValid);
}

function enableValidation(options) {
  const forms = Array.from(document.querySelectorAll(options.formSelector));
  forms.forEach(form => {
    const formInputs = Array.from(form.querySelectorAll(options.inputSelector));
    const saveButton = form.querySelector(options.submitButtonSelector);

    form.addEventListener('input', () => formCheck(form, saveButton, options.inactiveButtonClass));
    formInputs.forEach(input => {
      input.addEventListener('input', event => inputCheck(event, options.inputErrorClass, options.errorClass));
    });
  });
}

popups.forEach(popup => popup.addEventListener('click', evt => closePopup(evt)));

enableValidation({
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});
