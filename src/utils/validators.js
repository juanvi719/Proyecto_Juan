function isValidGmail(email) {
    // Check if email contains @ and ends with gmail.com
    const gmailRegex = /^[a-zA-Z0-9._-]+@gmail\.com$/;
    return gmailRegex.test(email);
}

module.exports = {
    isValidGmail
};