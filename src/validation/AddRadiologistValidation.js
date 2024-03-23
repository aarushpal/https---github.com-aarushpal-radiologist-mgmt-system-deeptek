export function AddRadiologistValidation(values) {
  let errors = {};

  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/;
  //   const password_pattern =
  //         /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
  // const contactNumber_pattern = /^\d{10}$/;
  const username_pattern = /^.{0,12}$/;

  if (values.name === "") {
    errors.name = "Name is required";
  }

  if (values.email === "") {
    errors.email = "Email is required";
  } else if (!email_pattern.test(values.email)) {
    errors.email = "Enter valid email";
  }

  if (values.username === "") {
    errors.username = "Username is required";
  } else if (!username_pattern.test(values.username)) {
    errors.username = "Enter maximum 12 characters";
  }

  // if (values.contactNumber === "") {
  //   errors.contactNumber = "Contact Number is required";
  // } else if (!contactNumber_pattern.test(values.contactNumber)) {
  //   errors.contactNumber = "Enter a valid Phone Number";
  // }

  //   if (values.password == "") {
  //     errors.password = "Password is required";
  //   } else if (!password_pattern.test(values.password)) {
  //     errors.password =
  //       "Password must contain 1 small,1 cap,1 special,1 number, Min. 8 characters";
  //   }

  // errors.role = '';

  return errors;
}
