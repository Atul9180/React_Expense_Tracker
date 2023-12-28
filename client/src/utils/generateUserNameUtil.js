export const generateUserName = (email) => {
  const userName = email.substring(0, email.indexOf("@")); // Extract username before '@'
  return capitalizeFirstLetter(userName);
};

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
