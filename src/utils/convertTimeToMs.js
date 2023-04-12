export default function (timeString) {
  // timestring format is hh:mm:ss,mmm

  const parts = timeString.split(":");

  // minutes are worth 60 seconds. Hours are worth 60 minutes.
  const ms =
    parseFloat(parts[0]) * 60 * 60 +
    parseFloat(parts[1]) * 60 +
    parseFloat(parts[2].replace(",", "."));

  const shortFormat =
    Math.floor(ms / 60) +
    ":" +
    ("0" + Math.floor(ms % 60)).slice(-2) +
    "," +
    parseFloat(parts[2]);

  //console.log(shortFormat);

  return {
    ms: ms,
    shortFormat: shortFormat,
  };
}
