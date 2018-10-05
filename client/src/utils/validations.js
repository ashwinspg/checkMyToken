const phoneNumberRegex = /^(0|[1-9][0-9]{9})$/i;

export const validatePhoneNumber = (phoneNumber) => {
    
    if(phoneNumber && !phoneNumberRegex.test(phoneNumber)){
        return `Invalid phone number, must be 10 digits`;
    }

    return;
};