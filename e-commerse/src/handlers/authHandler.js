export function validateLogin({ email, password }) {
  return email.trim().length > 0 && password.trim().length > 0;
}
