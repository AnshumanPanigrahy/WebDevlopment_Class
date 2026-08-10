import { authenticateUser } from '../db/loginDb';

export function validateLogin({ email, password }) {
  return email.trim().length > 0 && password.trim().length > 0;
}

export function loginUser({ email, password }) {
  return authenticateUser(email, password);
}
