const isValidPassword = (password: string): boolean => {
  const hasLetter = /[a-zA-Zа-яА-Я]/.test(password);
  const hasDigit = /\d/.test(password);
  return hasLetter && hasDigit;
};

export {isValidPassword};
