export function SignupValidation(values) {
  let errors = {};

  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/;
  const password_pattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;

  if (values.name === "") {
    errors.name = "Name is required*";
  }

  if (values.email === "") {
    errors.email = "Email is required*";
  } else if (!email_pattern.test(values.email)) {
    errors.email = "Enter valid email*";
  }

  if (values.password == "") {
    errors.password = "Password is required*";
  } else if (!password_pattern.test(values.password)) {
    errors.password =
      "Must have 1 small,1 cap,1 special,1 number, Min. 8 chars.*";
  }

  // errors.role = '';

  return errors;
}
