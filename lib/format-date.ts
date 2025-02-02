import { formatDistanceToNow } from "date-fns";

export function formatDate(dateString: string) {
  const date = new Date(dateString);
  return formatDistanceToNow(date, { addSuffix: true });
}
