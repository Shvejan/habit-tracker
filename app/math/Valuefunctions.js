const percentage = (value, days) => {
  return (value * 100) / days;
};

export const incValPeriodic = (days, value, f) => {
  value = value + 1 + ((days - value) * value) / days / f[0] ** 2;
  return days ? value : days;
};

export const decValMain = (days, value, f) => {
  let c = (4 - value / days) * f[0] ** (-2 - days * 0.05);
  if (c < 0.15) {
    c = 0.1 + Math.random() / 10;
  }
  value = (1 - c) * value;
  percentage(value, days);
  f[0] += 1;

  return [value, f];
};

export const thought = (days, value, f) => {
  value = value - (f[1] ** 2 * Math.sqrt(days)) / 100;
  percentage(value, days);
  f[1] += 1;

  return [value, f];
};

export const media = (days, value, f) => {
  value = value - ((f[2] + f[1] * 0.8) ** 2 * Math.sqrt(days)) / 80;
  percentage(value, days);
  f[2] += 1;

  return [value, f];
};

export const po = (days, value, f) => {
  value =
    value - ((f[3] + (f[1] + f[2] + f[4]) * 0.2) ** 2 * Math.sqrt(days)) / 20;
  percentage(value, days);
  f[3] += 1;

  return [value, f];
};

export const decision = (days, value, f) => {
  value = value - (f[4] ** 2 * Math.sqrt(days)) / 10;
  percentage(value, days);
  f[4] += 1;

  return [value, f];
};
