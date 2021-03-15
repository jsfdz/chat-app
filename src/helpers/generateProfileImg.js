export const generateProfileImg = (username) => {
  const intials = username
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase();
  return intials;
};
