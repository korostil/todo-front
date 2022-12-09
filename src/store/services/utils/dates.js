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

export function getUnixDate(date) {
  return date.toISOString().split("T")[0];
}
