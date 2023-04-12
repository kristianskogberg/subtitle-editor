export default function (timeInSec) {
  const timeString = new Date(timeInSec * 1000).toISOString().slice(11, 19);
  // console.log(timeString.replace(".", ","));
  return timeString;
}
