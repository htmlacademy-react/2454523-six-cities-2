const AUTH_EMAIL_KEY_NAME = 'six-cities-email';

export type Email = string;

export const getEmail = (): Email => {
  const email = localStorage.getItem(AUTH_EMAIL_KEY_NAME);
  return email ?? '';
};

export const saveEmail = (email: Email): void => {
  localStorage.setItem(AUTH_EMAIL_KEY_NAME, email);
};

export const dropEmail = (): void => {
  localStorage.removeItem(AUTH_EMAIL_KEY_NAME);
};
