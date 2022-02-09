const test = (days, value, p, n) => {
  if (!value) value = 0.5;
  const res = (-value * n) / p;
  console.log(res);
  return res;
};
const incval = (days, value, f) => {
  value = value + 1 + ((days - value) * value) / days / f[0] ** 2;
  return value > days + 1 ? days : value;
};

let value = 0,
  days = 1,
  p = 10,
  n = 0;

value = incval(days, value, [1]) + test(days, value, p, n);
days += 1;
console.log("percentage,", (value * 100) / days);
console.log("");

value = incval(days, value, [1]) + test(days, value, p, n);
days += 1;
console.log("percentage,", (value * 100) / days);
console.log("");

value = incval(days, value, [1]) + test(days, value, p, n);
days += 1;
console.log("percentage,", (value * 100) / days);
console.log("");

value = incval(days, value, [1]) + test(days, value, p, n);
days += 1;
console.log("percentage,", (value * 100) / days);
console.log("");

console.log("current daus is ", days, value, (value * 100) / days);
