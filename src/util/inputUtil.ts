const sanitizeEmail = (email: string): string => {
    return email.trim().toLocaleLowerCase();
};

export { sanitizeEmail };
