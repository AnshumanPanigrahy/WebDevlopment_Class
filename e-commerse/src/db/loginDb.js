export function authenticateUser(email, password) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(email.trim().length > 0 && password.trim().length > 0);
    }, 300);
  });
}
