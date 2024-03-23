export function LoginValidation(values) {
  let errors = {};

  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/;
  // const password_pattern =
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;

  if (values.email === "") {
    errors.email = "Email is required*";
  } else if (!email_pattern.test(values.email)) {
    errors.email = "Enter valid email*";
  }

  if (values.password === "") {
    errors.password = "Password is required*";
  }

  // errors.role = '';

  return errors;
}
