import moment from "moment";

const TimeFormate = (createdAt) => {
  const now = moment();
  const postTime = moment(createdAt);

  const secondsDiff = now.diff(postTime, "seconds");
  if (secondsDiff < 60) return `${secondsDiff} seconds ago`;

  const minutesDiff = now.diff(postTime, "minutes");
  if (minutesDiff < 60) return `${minutesDiff} minutes ago`;

  const hoursDiff = now.diff(postTime, "hours");
  if (hoursDiff < 24) return `${hoursDiff} hours ago`;

  const daysDiff = now.diff(postTime, "days");
  if (daysDiff === 1) return "Yesterday";

  return postTime.format("MMMM Do YYYY");
};

export default TimeFormate;
