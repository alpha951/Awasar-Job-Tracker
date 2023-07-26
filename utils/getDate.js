module.exports = function getDate(s) {
  console.log(s);
  if (!s) return "10-Jan-2021";

  let monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let year = s.substr(0, 4);

  let monthIndex = Number(s.substr(5, 2)) - 1;
  let monthName = monthNames[monthIndex];

  let day = s.substr(8, 2);
  return `${day}-${monthName}-${year}`;
};
