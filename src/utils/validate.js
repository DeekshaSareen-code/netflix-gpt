const checkValidData = (email, password, name) => {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  const passwordRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(
      password
    );
  const nameRegex =
    /(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})/.test(
      name
    );

  if (name && !nameRegex) {
    return "Invalid fullname.";
  }
  if (!emailRegex) {
    return "Invalid email address.";
  }
  if (!passwordRegex) {
    return "Invalid password.";
  }

  return null;
};

export default checkValidData;
