export class FormValidator {
    constructor(config, formElement) {
        this._config = config;
        this._formElement = formElement;
    }

    enableValidation() {
        const inputs = this._formElement.querySelectorAll(this._config.inputSelector); 
        inputs.forEach(element => {
            element.addEventListener('input', (event) => this._validateFormInput(event.target));
        });
    }

    _validateFormInput(input) {
        this._toggleErrorMessage(input);
        this._toggleButton(this._formElement, this._config);
    }

    _toggleErrorMessage(input) {
        const errorNode = document.querySelector(`#${input.id}-error`);
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
        const button = this._formElement.querySelector(this._config.buttonSelector);
        button.disabled = !this._formElement.checkValidity();
        button.classList.toggle(this._config.inactiveButtonClass, !this._formElement.checkValidity());
    }
}