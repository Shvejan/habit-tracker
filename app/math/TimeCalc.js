export const startTimer = (streak) => {
  if (streak == null) return [0, 0, 0, 0];
  const now = new Date().getTime();
  const timeleft = now - streak;
  var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
  var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
  return [days, hours, minutes, seconds];
};
