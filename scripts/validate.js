function enableValidation(config) {
    document.querySelectorAll(config.formSelector).forEach(form => {
        const inputs = form.querySelectorAll(config.inputSelector); 
        inputs.forEach(element => {
            element.addEventListener('input', (event) => validateFormInput(form, event.target, config)(event, form, config));
        });
    });
}

function toggleButton(form, config) {
    const button = form.querySelector(config.buttonSelector);
    button.disabled = !form.checkValidity();
    button.classList.toggle(config.inactiveButtonClass, !form.checkValidity());
}

function toggleErrorMessage(input) {
    const errorNode = document.querySelector(`#${input.id}-error`);
    const invalid = !input.validity.valid;
    if (input.validity.valid) {
        errorNode.textContent = '';
    } else {
        errorNode.textContent = input.validationMessage;
    }
    errorNode.classList.toggle(config.errorClass, invalid);
    input.classList.toggle(config.inputErrorClass, invalid);
}

function validateFormInput(form, input, config) {
    toggleErrorMessage(input);
    toggleButton(form, config);
}

function validateForm(form, config) {
    form.querySelectorAll(config.inputSelector).forEach(input => {
        validateFormInput(form, input, config);
    });
    toggleButton(form, config);
}

// включение валидации вызовом enableValidation
// все настройки передаются при вызове
const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    buttonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  };
enableValidation(config);