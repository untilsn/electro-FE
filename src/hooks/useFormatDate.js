export function useFormatDate(date) {
  const dateTime = date?.createAt?.seconds
    ? new Date(date?.createAt?.seconds * 1000)
    : new Date();
  const formatDate = new Date(dateTime).toLocaleDateString("vi-VI");

  return formatDate;
}
