export const getIsoStringFromDate = (date: Date): string => {
  return date?.toISOString()?.split("T")[0] || "";
}
