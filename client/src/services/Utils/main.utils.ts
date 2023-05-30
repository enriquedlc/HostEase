export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  return formattedDate;
};

export const formatHour = (date: Date) => {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

export const renderUsers = (number?: number) => {
  if (number) {
    if (number >= 1000000) {
      return (number / 1000000).toFixed(number % 1000000 !== 0 ? 1 : 0) + " M";
    } else if (number >= 1000) {
      return (number / 1000).toFixed(number % 1000 !== 0 ? 1 : 0) + " K";
    }
    return number.toString();
  }
};
