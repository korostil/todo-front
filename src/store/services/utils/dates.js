export const monthMap = [
  { shortName: "Jan", value: 1 },
  { shortName: "Feb", value: 2 },
  { shortName: "Mar", value: 3 },
  { shortName: "Apr", value: 4 },
  { shortName: "May", value: 5 },
  { shortName: "Jun", value: 6 },
  { shortName: "Jul", value: 7 },
  { shortName: "Aug", value: 8 },
  { shortName: "Sep", value: 9 },
  { shortName: "Oct", value: 10 },
  { shortName: "Nov", value: 11 },
  { shortName: "Dec", value: 12 },
];
export const monthShortNames = monthMap.map((item) => item.shortName);

export function getMonday(date) {
  let _date = new Date(date),
    day = _date.getDay(),
    diff = _date.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(_date.setDate(diff));
}

export function getSunday(date) {
  let _date = new Date(date),
    day = _date.getDay(),
    diff = _date.getDate() + (day === 0 ? 0 : 7 - day);
  return new Date(_date.setDate(diff));
}

export function toUnixDate(date) {
  if (date) {
    return date.toISOString().split("T")[0];
  }
  return null;
}

export function getFormattedDueDateTime(due) {
  if (due !== null) {
    due = new Date(due);
    let result = due.getDate() + " " + monthShortNames[due.getMonth()],
      hours = due.getHours(),
      minutes = due.getMinutes(),
      year = due.getFullYear();

    if (new Date().getFullYear() !== year) {
      result += " " + due.getFullYear();
    }

    if (hours !== 23 && minutes !== 59) {
      if (hours < 10) hours = "0" + hours;
      if (minutes < 10) minutes = "0" + minutes;
      result += " " + hours + ":" + minutes;
    }

    return result;
  }
  return null;
}
