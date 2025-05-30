const validator = require("validator");
const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("enter a valid first or last name");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("enter a valid Email ID");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("enter a strong password");
  }
};

const validateEditProfileData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "emailId",
    "photoUrl",
    "gender",
    "age",
  ];
  const isEditAllowed = Object.key(req.body).every((field) =>
    allowedEditFields.includes(field)
  );
};
module.exports = { validateSignUpData, validateEditProfileData };
