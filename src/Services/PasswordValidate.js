export const isPasswordValid = (password) => {
  if (password.length < 8) {
    return false;
  }
  if (
    !/[A-Z]/.test(password) ||
    !/[a-z]/.test(password) ||
    !/\d/.test(password) ||
    !/[@$!%*?&#]/.test(password)
  ) {
    return false;
  }

  return true;
};

export const isFormValid = (user) => {
  if (
    !isPasswordValid(user.password) ||
    user.password !== user.confirmPassword
  ) {
    return false;
  }
  return true;
};
