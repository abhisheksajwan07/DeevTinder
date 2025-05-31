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
  const data = req.body
  const allowedEditFields = [
    "firstName",
    "lastName",
    "emailId",
    "photoUrl",
    "gender",
    "age",
    "about",
    "skills",
  ];
  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );
  if (data.skills && Array.isArray(data.skills) && data.skills.length > 10) {
    throw new Error("Skills can't be more than 10");
  }
  return isEditAllowed;
};
module.exports = { validateSignUpData, validateEditProfileData };
