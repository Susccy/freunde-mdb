export default (date: string | number) => {
  const dateObj = new Date(date)
  return isNaN(dateObj.getTime())
    ? null
    : dateObj.toLocaleDateString("de", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
}
