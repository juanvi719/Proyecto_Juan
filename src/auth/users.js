const { isValidGmail } = require('../utils/validators');

let registeredUser = null;

function registerUser(gmail, password) {
    if (!isValidGmail(gmail)) {
        return {
            success: false,
            message: 'Por favor, ingresa una dirección de Gmail válida (@gmail.com)'
        };
    }

    registeredUser = { gmail, password };
    return {
        success: true,
        message: 'Usuario registrado exitosamente'
    };
}

function validateLogin(gmail, password) {
    if (!registeredUser) return false;
    return registeredUser.gmail === gmail && registeredUser.password === password;
}

function getRegisteredUser() {
    return registeredUser;
}

module.exports = {
    registerUser,
    validateLogin,
    getRegisteredUser
};