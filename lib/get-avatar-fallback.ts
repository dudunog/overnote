export const getAvatarFallback = (name: string) => {
  const splittedName = name.split(" ");

  if (splittedName.length === 1) {
    return splittedName[0].charAt(0);
  }

  const firstLetter = splittedName[0].charAt(0);
  const lastLetter = splittedName[splittedName.length - 1].charAt(0);

  return `${firstLetter}${lastLetter}`;
};
