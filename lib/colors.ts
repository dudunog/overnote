export const COLORS = {
  orange: "#FFAB91",
  yellow: "#FFCC80",
  green: "#E7ED9C",
  blue: "#82DEEA",
  lightBlue: "#B7D8F9",
  lightBlue2: "#B7C6F5",
  lightTeal: "#A0E4E0",
  lightGreen: "#D3E8B5",
  lightRed: "#F5B2B2",
  purple: "#CF94DA",
  lightPurple: "#EAB8E0",
  lightPurple2: "#D1C6F9",
  lightPink: "#F1B2D1",
  lightGray: "#D7D2C8",
};

export const getRandomColor = () => {
  const colors = Object.values(COLORS);
  return colors[Math.floor(Math.random() * colors.length)];
};
