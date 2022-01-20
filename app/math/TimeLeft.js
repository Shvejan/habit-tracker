export const startTimer = (setTimer) => {
  const date = new Date("jan 23 2022 00:00:00").getTime();
  interval = setInterval(() => {
    const now = new Date().getTime();
    const timeleft = date - now;
    var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
    setTimer([days, hours, minutes, seconds]);
  }, 1000);
};
