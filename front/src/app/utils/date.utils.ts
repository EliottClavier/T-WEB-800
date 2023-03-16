export const getDateFromIsoString = (date: Date): string => {
  return date.toISOString().split("T")[0];
}
