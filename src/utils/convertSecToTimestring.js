export default function (timeInSec) {
  const timeString = new Date(timeInSec * 1000).toISOString().slice(11, 23);
  // console.log(timeString.replace(".", ","));
  return timeString.replace(".", ",");
}
