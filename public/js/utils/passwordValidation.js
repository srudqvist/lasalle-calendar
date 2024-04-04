function isPasswordValid(password) {
  if (password.length > 0) {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@=$!%*?&])[A-Za-z\d@=$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  } else {
    return false;
  }
}

export { isPasswordValid };
