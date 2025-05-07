import { isValidPassword } from './validatePassword';


describe('Function: isValidPassword', () => {

  it('should return true when password contains letters and digits', () => {
    expect(isValidPassword('password1')).toBe(true);
    expect(isValidPassword('пароль1')).toBe(true);
    expect(isValidPassword('Pass@123')).toBe(true);
  });

  it('should return false when password has no digits', () => {
    expect(isValidPassword('password')).toBe(false);
    expect(isValidPassword('пароль')).toBe(false);
  });

  it('should return false when password has no letters', () => {
    expect(isValidPassword('123456')).toBe(false);
  });

  it('should return false for empty string', () => {
    expect(isValidPassword('')).toBe(false);
  });

});
