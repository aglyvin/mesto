export class FormValidator {
    constructor(config, formElement) {
        this._config = config;
        this._formElement = formElement;
        this._inputList = this._formElement.querySelectorAll(this._config.inputSelector);
        this._submitButton = this._formElement.querySelector(this._config.buttonSelector);
    }

    enableValidation() {
        this._inputList.forEach(element => {
            element.addEventListener('input', (event) => this._validateFormInput(event.target));
        });
    }

    _validateFormInput(input) {
        this._toggleErrorMessage(input);
        this._toggleButton();
    }

    _toggleErrorMessage(input) {
        const errorNode = this._formElement.querySelector(`#${input.id}-error`);
        const invalid = !input.validity.valid;
        if (input.validity.valid) {
            errorNode.textContent = '';
        } else {
            errorNode.textContent = input.validationMessage;
        }
        errorNode.classList.toggle(this._config.errorClass, invalid);
        input.classList.toggle(this._config.inputErrorClass, invalid);
    }

    _toggleButton() {
        this._submitButton.disabled = !this._formElement.checkValidity();
        this._submitButton.classList.toggle(this._config.inactiveButtonClass, !this._formElement.checkValidity());
    }

    _hideErrors(inputElement) {
        const errorSpan = this._formElement.querySelector(`#${inputElement.id}-error`);
        errorSpan.textContent = '';
        inputElement.classList.remove(this._config.inputErrorClass);
    }

    resetValidation() {
        this._toggleButton();
        this._inputList.forEach((inputElement) => {
            this._hideErrors(inputElement)
        });
    }
}