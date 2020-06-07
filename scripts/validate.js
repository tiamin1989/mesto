// Проверка инпутов
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

// Проверка формы в целом
function formCheck(form, saveButton, inactiveButtonClass) {
  const isValid = !form.checkValidity();

  saveButton.disabled = isValid;
  saveButton.classList.toggle(inactiveButtonClass, isValid);
}

// Валидации форм
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

enableValidation({
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});
