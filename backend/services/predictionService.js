function predictMealCount({ enrolledCount, leavesToday, dayOfWeek, isFestival }) {
  let base = enrolledCount - leavesToday;
  if (dayOfWeek === 0 || dayOfWeek === 6) base += Math.floor(base * 0.1);
  if (dayOfWeek === 5) base += 15;
  if (isFestival) base = Math.floor(base * 1.25);
  return Math.max(base, 0);
}
module.exports = { predictMealCount };