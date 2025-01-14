// format date from new Date() like "Friday, 01:00 PM"
export const formatDate = (date) => {
  const options = {
    weekday: "long",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  return new Date(date).toLocaleDateString("en-US", options);
};
