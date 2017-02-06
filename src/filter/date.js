export const date = value => {
  /* eslint one-var: ["error", "always"] */
  let data = new Date(value),
    year = data.getFullYear(),
    month = data.getMonth() + 1,
    day = data.getDay(),
    hour = data.getHours(),
    minute = data.getMinutes()
  month = month > 10 ? month : '0' + month
  day = day > 10 ? day : '0' + day
  hour = hour > 10 ? hour : '0' + hour
  minute = minute > 10 ? minute : '0' + minute
  return `${year}-${month}-${day}  ${hour}:${minute}`
}
