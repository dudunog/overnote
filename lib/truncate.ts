export function truncate(str: string, maxLength: number = 50) {
  if (str.length > maxLength) {
    return str.slice(0, maxLength) + "...";
  }
  return str;
}
