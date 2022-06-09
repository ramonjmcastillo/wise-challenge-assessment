export const formatBigInt = (value) => {
  return Math.round(Number(BigInt(value) / BigInt(Math.pow(10, 18))));
};
