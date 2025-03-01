// src/utils/formValidation.js

// export const validateFields = (fields, formType) => {
//     let errors = {};

//     if (!fields.email) {
//       errors.email = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(fields.email)) {
//       errors.email = "Email is invalid";
//     }

//     if (!fields.password) {
//       errors.password = "Password is required";
//     } else if (fields.password.length < 6) {
//       errors.password = "Password must be at least 6 characters";
//     }

//     if (formType === "register") {
//       if (!fields.confirmPassword) {
//         errors.confirmPassword = "Confirm password is required";
//       } else if (fields.password !== fields.confirmPassword) {
//         errors.confirmPassword = "Passwords do not match";
//       }

//       if (!fields.username) {
//         errors.username = "Username is required";
//       }
//     }

//     return errors;
//   };
export const validateFields = (formData) => {
  let errors = {};

  if (!formData.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = "Email is invalid";
  }

  if (!formData.password) {
    errors.password = "Password is required";
  } else if (formData.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  if (formData.confirmPassword) {
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
  }

  if (!formData.username) {
    errors.username = "Username is required";
  } else if (formData.username.length < 3) {
    errors.username = "Username must be at least 6 characters";
  }

  return errors;
};
