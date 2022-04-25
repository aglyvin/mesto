function enableValidation(config) {
    const form = document.querySelector(config.formSelector);
    const inputs = form.querySelectorAll(config.inputSelector); 

    inputs.forEach(element => {
        element.addEventListener('input', (event) => handleFormInput(event, form, config));
    });
}

function toggleButtonByConfig(form, config) {
    const button = form.querySelector(config.buttonSelector);
    toggleButtonByConfig(form, button);
}

function toggleButton(form, button) {
    button.disabled = !form.checkValidity();
    button.classList.toggle('popup__save-button_disabled', !form.checkValidity());
}

function handleFormInput(event, form, config) {
    const input = event.target;
    const errorNode = document.querySelector(`#${input.id}-error`);
    if (input.validity.valid) {
        errorNode.textContent = '';
    } else {
        errorNode.textContent = input.validationMessage;
    }
    toggleButtonByConfig(form, config);

}

enableValidation({
    formSelector: '.popup__form[name=edit-profile]',
    inputSelector: '.popup__input',
    buttonSelector: '.popup__save-button'
});

enableValidation({
    formSelector: '.popup__form[name=add-place]',
    inputSelector: '.popup__input',
    buttonSelector: '.popup__save-button'
});